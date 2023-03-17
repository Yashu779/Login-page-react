import "./App.css";
import MainHeader from "./components/MainHeader/MainHeader";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storedInfo = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (storedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
  };
  const logoutHandler = (email, password) => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "0");
  };
  return (
    <>
      <MainHeader
        isAuthenticated={isLoggedIn}
        onLogout={logoutHandler}
      ></MainHeader>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler}></Login>}
        {isLoggedIn && <Home onLogin={logoutHandler}></Home>}
      </main>
    </>
  );
}

export default App;
