import {useState} from "react";

export const LoginView = ({onLoggedIn}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    //this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    //make sure this is the correct url
    fetch("https://star-wars-myflix-1632.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
  };

  return(
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};