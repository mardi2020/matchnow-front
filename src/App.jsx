import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getMyInfo } from "./api/User";
import Header from "./Components/Common/Header";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    getMyInfo()
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data);
      })
      .catch((e) => {
        setIsLoggedIn(false);
        setUser(undefined);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/"></Route>
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          ></Route>
          <Route
            path="/register"
            element={<Register isLoggedIn={isLoggedIn} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
