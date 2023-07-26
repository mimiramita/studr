import React, { useState } from "react";
import video1 from "../blue-ink.mp4";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e) => {
    e.preventDefault();

    const user = { username: username, password: password };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/core/login/",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      sessionStorage.clear();
      sessionStorage.setItem("access_token", data.access);
      sessionStorage.setItem("refresh_token", data.refresh);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["access"]}`;
    } catch (e) {
      alert(e);
    }
    window.location.href = "/dashboard";
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
          backgroundColor: "#FFFFFF",
          padding: "0px",
          margin: "0px",
          height: "100vh",
          width: "40vw",
        }}
      >
        <div
          style={{ textAlign: "center", fontWeight: "200" }}
          className="vertical-center manrope"
        >
          <p id="welcome" className="roboto-mono">
            Hello, Welcome Back!
          </p>
          <p style={{ fontWeight: "100", color: "#5C5C5C", fontSize: "15px" }}>
            Don't have an account? <a href="/signin">sign up</a>
          </p>
          <form
            style={{ padding: "20px 30px", margin: "auto" }}
            onSubmit={submit}
          >
            <div class="row mb-3">
              <label for="inputEmail3" class="col-sm-2 col-form-label">
                Username
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail3"
                  placeholder="Username"
                  name="username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputPassword3" class="col-sm-2 col-form-label">
                Password
              </label>
              <div class="col-sm-10">
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
        style={{ position: "absolute", top: "50px", right: "70px" }}
        className="logo"
      >
        Studr
      </a>
    </div>
  );
}

export default Login;
