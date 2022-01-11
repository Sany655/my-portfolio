import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Contact from "./components/Contact/Contact";
import Expenses from "./components/Expenses/Expenses";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Invoices from "./components/Invoices/Invoices";
import Profile from "./components/Profile/Profile";
import Projects from "./components/Projects/Projects";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
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
