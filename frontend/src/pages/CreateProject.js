import React, { useState } from "react";
import axios from "axios";
import video1 from "../blue-ink.mp4";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const submit = async (e) => {
    e.preventDefault();

    const project = { title: title, link: link };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/project/createproject/",
        project,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      alert(data);
    } catch (e) {
      alert(e);
    }
    window.location.href = "/";
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
            Don't have an account? <a href="/register">sign up</a>
          </p>
          <form
            style={{ padding: "20px 30px", margin: "auto" }}
            onSubmit={submit}
          >
            <div class="row mb-3">
              <label for="inputEmail3" class="col-sm-2 col-form-label">
                Title
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail3"
                  placeholder="Title"
                  name="title"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputPassword3" class="col-sm-2 col-form-label">
                Link
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="inputPassword3"
                  placeholder="Link"
                  name="link"
                  value={link}
                  required
                  onChange={(e) => setLink(e.target.value)}
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

export default CreateProject;
