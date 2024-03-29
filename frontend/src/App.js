import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateProject from "./pages/CreateProject";
import QueryBox from "./pages/Query";
import QueryTest from "./pages/QueryTest";
import SignIn from "./pages/Signin";
import DashBoard from "./pages/Dashboard";
import Project from "./pages/Project";
import "animate.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="login" element={<Login />} />
          <Route path="createproject" element={<CreateProject />} />
          <Route path="query" element={<QueryBox />} />
          <Route path="testquery" element={<QueryTest />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="project" element={<Project />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
