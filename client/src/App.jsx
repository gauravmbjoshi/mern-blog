import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          exact
          path='/'
          element={<Home />}
        />
        <Route
          exact
          path='/about'
          element={<About />}
        />
        <Route
          exact
          path='/projects'
          element={<Projects />}
        />
        <Route
          exact
          path='/dashboard'
          element={<Dashboard />}
        />
        <Route
          exact
          path='/sign-up'
          element={<SignUp />}
        />
        <Route
          exact
          path='/sign-in'
          element={<SignIn />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
