import { Button, Row, Col, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

import "./profile-view.scss";

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  updateUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  let favoriteMovies = movies.filter((movie) =>
    user.favoriteMovies.includes(movie._id)
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const hashedPassword = bcrypt.hashSync(password, 10);

    const data = {
      username: username,
      password: hashedPassword,
      email: email,
      birthday: birthday,
    };

    fetch(
      `https://star-wars-myflix-1632.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Updating user data failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully changed user data!");
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
    setUsername("");
    setPassword("");
    setEmail("");
    setBirthday("");
  };

  const deregisterUser = () => {
    fetch(
      `https://star-wars-myflix-1632.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Your account has been successfuly de-registered.");
          onLoggedOut();
        } else {
          alert("Error. Account has not been de-registered.");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body className="user-info-card">
              <Card.Title>Your User Info:</Card.Title>
              <Row>
                <Col>
                  <Card className="user-info-section-card">
                    <Card.Body className="user-info-section border-0">
                      <p>
                        <span className="title-bold">Username: </span>
                        {user.username}
                      </p>
                      <p>
                        <span className="title-bold">Email: </span>
                        {user.email}
                      </p>
                      {user.birthday ? (
                        <p>
                          <span className="title-bold">Date of Birth: </span>
                          {user.birthday.slice(0, 10)}
                        </p>
                      ) : (
                        <p>
                          <span className="title-bold">Date of Birth: </span>n/a
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Button
                className="user-info-button"
                variant="danger"
                onClick={() => {
                  if (confirm("Please confirm to de-register.")) {
                    deregisterUser();
                  }
                }}
              >
                De-register Your Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body className="update-form">
              <Card.Title>Update Your User Info</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-2">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 update-user-info-button"
                >
                  Update Info
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h4 className="mt-5">{user.username}'s Favorite Movies</h4>
        </Col>
        {favoriteMovies.map((movie) => (
          <Col className="mb-4" key={movie._id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};

/*  
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

import "./profile-view.scss";

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  updateUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  let favoriteMovies = movies.filter((movie) =>
    user.favoriteMovies.includes(movie._id)
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const hashedPassword = bcrypt.hashSync(password, 10);

    const data = {
      username: username,
      password: hashedPassword,
      email: email,
      birthday: birthday,
    };

    fetch(
      `https://star-wars-myflix-1632.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Updating user data failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully changed user data!");
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
    setUsername("");
    setPassword("");
    setEmail("");
    setBirthday("");
  };

  const deregisterUser = () => {
    fetch(
      `https://star-wars-myflix-1632.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Your account has been successfuly de-registered.");
          onLoggedOut();
        } else {
          alert("Error. Account has not been de-registered.");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Col md={6}>
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Your User Info:</Card.Title>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    {user.birthday ? (
                      <p>Date of Birth: {user.birthday.slice(0, 10)}</p>
                    ) : (
                      <p>Date of Birth: n/a</p>
                    )}
                  </Card.Body>
                </Card>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (confirm("Please confirm to de-register.")) {
                      deregisterUser();
                    }
                  }}
                >
                  De-register Your Account
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Title>Update Your User Info</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Info
            </Button>
          </Form>
        </Card>
      </Col>
      <Row>
        <Col md={12}>
          <h4>{user.username}'s Favorite Movies</h4>
        </Col>
        {favoriteMovies.map((movie) => (
          <Col className="mb-4" key={movie._id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};

*/
