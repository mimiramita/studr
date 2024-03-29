import React, { useState } from "react";
import axios from "axios";
import video1 from "../blue-ink.mp4";


function QueryTest() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const question_info = { project_name: title, question: question };
    const token = sessionStorage.getItem("access_token");
    if (token == null) {
      window.location.href = "/login";
    }
    try {
      axios.defaults.withCredentials = true; // even for get requests if
      // demand session authentication
      const { data } = await axios.get(
        "http://localhost:8000/project/answerquestion/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            project_name: title,
            question: question
          }
        }
      );
      alert(data.response);
    } catch (e) {
      alert(e);
    }
    window.location.href = "/testquery";
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
                  value={question}
                  required
                  onChange={(e) => setQuestion(e.target.value)}
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

export default QueryTest;
