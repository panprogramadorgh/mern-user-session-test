/* Imports */

// react & nextjs
import { FC } from "react";
// components
import Login from "./components/Login";
import Register from "./components/Register";
import Navigation from "./components/Navigation";

// libs
import { Routes, Route, BrowserRouter } from "react-router-dom";

// utils

// types & interfaces

// css

interface Props {}

const App: FC<Props> = ({}) => {
  return (
    <BrowserRouter basename="/">
      <Navigation
        navigationData={[
          {
            title: "Home",
            path: "/",
          },
          {
            title: "Login",
            path: "/login",
          },
          {
            title: "Register",
            path: "/register",
          },
        ]}
      />
      <Routes>
        <Route
          path="/"
          Component={() => {
            return (
              <main>
                <h1>Home page</h1>
              </main>
            );
          }}
        />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
