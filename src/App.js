import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Projects from "./components/Projects/Projects";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail";
import Blogs from "./components/Blogs/Blogs";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-detail/:id" element={<ProjectDetail />} />
          <Route path="/blogs" element={<Blogs />} />
        </Route>
        <Route
          path="*"
          element={
            <main className="h-screen flex justify-center items-center">
              <p className="">404</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
