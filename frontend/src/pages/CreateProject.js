import React, { useState } from "react";
import axios from "axios";
import logo from "../PlayLamp.png";
import user from "../user.png";
import {Routes, Route, useNavigate} from 'react-router-dom';


function CreateProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [folder, setFolder] = useState("");
  const navigateDashboard = () => {
    navigate('/dashboard');
  }
  const submit = async (e) => {
    e.preventDefault();
    const project = { title: title, folder: folder, link: link };
    alert(project);
    alert(sessionStorage);
    const token = sessionStorage.getItem("access_token");
    if (token == null) {
      window.location.href = "/login";
    }
    alert(token);
    try {
      axios.defaults.withCredentials = true; // even for get requests if
      // demand session authentication
      const { data } = await axios.post(
        "http://localhost:8000/project/createproject/",
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(data);
    } catch (e) {
      alert(e);
    }
    window.location.href = "/dashboard";
  };
  return (
    <div class="container-fluid">
      <div class="row" style={{ backgroundColor: "#FFFFFF" }}>
        <div
          class="col-2"
          style={{
            backgroundColor: "white",
            height: "100vh",
            padding: "0px",
            textAlign: "center",
          }}
        >
          <br></br>
          <img
            src={logo}
            width="170px"
            height="45px"
            style={{ margin: "auto", display: "block" }}
          ></img>
          <br></br>
          <button
            className="roboto-mono"
            style={{
              fontSize: "14px",
              backgroundColor: "white",
              width: "180px",
              height: "40px",
              borderRadius: "10px",
              color: "#6c757d",
              textAlign: "center",
              margin: "auto",
              border: "none",
            }}
            onClick={navigateDashboard}
          >
            Dashboard
          </button>
          <button
            className="roboto-mono"
            style={{
              fontSize: "14px",
              backgroundColor: "#815AC0",
              width: "180px",
              height: "40px",
              borderRadius: "10px",
              color: "#FFFFFF",
              textAlign: "center",
              margin: "auto",
              border: "none",
              marginTop: "3px"
            }}
          >
            New Project
          </button>
        </div>
        <div
          class="col-10"
          style={{
            padding: "0px",
            margin: "0",
            backgroundColor: "#fafcff",
            height: "100vh",
            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <div style={{ position: "absolute", right: "50px", top: "20px", width: "auto" }}>
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  width: "200px",
                  display: "inline",
                  float: "right",
                  backgroundColor: "#EBEEF5",
                }}
              ></input>
              <button
                style={{
                  border: "none",
                  backgroundColor: "white",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  padding: "5px 10px 10px 11px",
                  marginRight: "10px",
                  textAlign: "center",
                  display: "inline",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img src={user} width="20px" height="20px"></img>
              </button>
            </div>
          <div className="vertical-center" style={{width: "100%"}}>
          <div
            className="roboto-mono"
            style={{ fontWeight: "bold", fontSize: "30px" }}
          >
            Create Project 🗂️
          </div>
          <div className="roboto-mono">Please fill out your project info!</div>
          <br></br>
          <div
            style={{
              width: "50%",
              height: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              margin: "auto",
              padding: "30px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
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
                    placeholder="title"
                    name="title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                  Folder
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail3"
                    placeholder="folder"
                    name="folder"
                    value={folder}
                    required
                    onChange={(e) => setFolder(e.target.value)}
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                  Link
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail3"
                    placeholder="link"
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
                style={{
                  backgroundColor: "#ef7a85",
                  border: "none",
                  margin: "auto",
                  marginTop: "20px"
                }}
              >
                Create
              </button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
    // <div style={{ minWidth: "100%", height: "100vh", overflow: "hidden" }}>
    //   <video
    //     autoPlay
    //     loop
    //     style={{
    //       minWidth: "100%",
    //       height: "120vh",
    //       objectFit: "cover",
    //       overflow: "hidden",
    //       marginBottom: "0px",
    //     }}
    //     id="mountain"
    //     src={video1}
    //   ></video>
    //   <div
    //     className="row"
    //     style={{
    //       position: "absolute",
    //       top: "0px",
    //       right: "0px",
    //       backgroundColor: "#FFFFFF",
    //       padding: "0px",
    //       margin: "0px",
    //       height: "100vh",
    //       width: "40vw",
    //     }}
    //   >
    //     <div
    //       style={{ textAlign: "center", fontWeight: "200" }}
    //       className="vertical-center manrope"
    //     >
    //       <p id="welcome" className="roboto-mono">
    //         Hello, Welcome Back!
    //       </p>
    //       <p style={{ fontWeight: "100", color: "#5C5C5C", fontSize: "15px" }}>
    //         Don't have an account? <a href="/register">sign up</a>
    //       </p>
    //       <form
    //         style={{ padding: "20px 30px", margin: "auto" }}
    //         onSubmit={submit}
    //       >
    //         <div class="row mb-3">
    //           <label for="inputEmail3" class="col-sm-2 col-form-label">
    //             Title
    //           </label>
    //           <div class="col-sm-10">
    //             <input
    //               type="text"
    //               class="form-control"
    //               id="inputEmail3"
    //               placeholder="Title"
    //               name="title"
    //               value={title}
    //               required
    //               onChange={(e) => setTitle(e.target.value)}
    //             />
    //           </div>
    //         </div>
    //         <div class="row mb-3">
    //           <label for="inputPassword3" class="col-sm-2 col-form-label">
    //             Link
    //           </label>
    //           <div class="col-sm-10">
    //             <input
    //               type="text"
    //               class="form-control"
    //               id="inputPassword3"
    //               placeholder="Link"
    //               name="link"
    //               value={link}
    //               required
    //               onChange={(e) => setLink(e.target.value)}
    //             />
    //           </div>
    //         </div>
    //         <button
    //           type="submit"
    //           class="btn btn-primary"
    //           style={{ backgroundColor: "#586F7C", border: "none" }}
    //         >
    //           Sign in
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    //   <a
    //     href="/"
    //     role="button"
    //     style={{ position: "absolute", top: "50px", right: "70px" }}
    //     className="logo"
    //   >
    //     Studr
    //   </a>
    // </div>
  );
}

export default CreateProject;
