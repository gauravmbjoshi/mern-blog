import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import Tandc from "./pages/Tandc";
import PvcPolc from "./pages/PvcPolc";
import PrivateRoute from "./components/PrivateRoute";
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
        <Route element={<PrivateRoute />}>
          <Route
            exact
            path='/dashboard'
            element={<Dashboard />}
          />
        </Route>
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
        <Route
          exact
          path='/tandc'
          element={<Tandc />}
        />
        <Route
          exact
          path='/pvcpolc'
          element={<PvcPolc />}
        />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
