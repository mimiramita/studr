import React, { useState } from "react";
import video1 from "../blue-ink.mp4";
import axios from "axios";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      password2: confirmPassword,
      email: email,
      first_name: firstname,
      last_name: lastname,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8000/core/register/",
        JSON.stringify(newUser),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      alert(newUser);
    } catch (e) {
      alert(e);
    }
    window.location.href = "/login";
  };
  return (
    <div style={{ minWidth: "100%", height: "100vh", overflow: "hidden" }}>
      <video
        autoPlay
        loop
        style={{
          minWidth: "100%",
          height: "120vh",
          objectFit: "cover",
          overflow: "hidden",
          marginBottom: "0px",
        }}
        id="mountain"
        src={video1}
      ></video>
      <div
        className="row"
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          backgroundColor: "#000000",
          padding: "0px",
          margin: "0px",
          height: "100vh",
          width: "35vw",
        }}
      >
        <div
          style={{ textAlign: "center", fontWeight: "200", color: "#FFFFFF" }}
          className="vertical-center manrope"
        >
          <p id="welcome" className="roboto-mono" style={{ color: "#FFFFFF" }}>
            Sign In
          </p>
          <p style={{ fontWeight: "100", color: "#706C61", fontSize: "15px" }}>
            Already have an account? <a href="/register">Log in</a>
          </p>
          <form
            style={{ padding: "20px 30px", margin: "auto" }}
            onSubmit={submit}
          >
            <div class="row mb-3">
              <label
                for="username"
                class="col-sm-4 col-form-label"
                style={{ textAlign: "left" }}
              >
                Username
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div class="row mb-3">
              <label
                for="firstname"
                class="col-sm-4 col-form-label"
                style={{ textAlign: "left" }}
              >
                First Name
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="firstname"
                  placeholder="First Name"
                  name="firstname"
                  value={firstname}
                  required
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
            </div>
            <div class="row mb-3">
              <label
                for="lastname"
                class="col-sm-4 col-form-label"
                style={{ textAlign: "left" }}
              >
                Last Name
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="lastname"
                  placeholder="Last Name"
                  name="lastname"
                  value={lastname}
                  required
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div class="row mb-3">
              <label
                for="firstname"
                class="col-sm-4 col-form-label"
                style={{ textAlign: "left" }}
              >
                Email
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div class="row mb-3">
              <label
                for="inputPassword3"
                class="col-sm-4 col-form-label"
                style={{ textAlign: "left" }}
              >
                Password
              </label>
              <div class="col-sm-8">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword3"
                  placeholder="Password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div class="row mb-3">
              <label
                for="inputPassword3"
                class="col-sm-4 col-form-label"
                style={{
                  textAlign: "left",
                  marginRight: "0",
                  paddingRight: "0",
                }}
              >
                Confirm Password
              </label>
              <div class="col-sm-8">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword3"
                  placeholder="Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <br></br>
            <button
              type="submit"
              class="btn btn-primary"
              style={{ backgroundColor: "#586F7C", border: "none" }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <a
        href="/"
        role="button"
        style={{
          position: "absolute",
          top: "50px",
          right: "70px",
          color: "#FFFFFF",
          fontSize: "25px",
        }}
        className="logo"
      >
        Studr
      </a>
    </div>
  );
}

export default SignIn;
