import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { logout } from "../../api/User";

function Header({ isLoggedIn, setIsLoggedIn }) {
  const handleClickLougout = (e) => {
    logout()
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((e) => {
        setIsLoggedIn(false);
      });
  };

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
            <Typography variant="h6" color="black" noWrap sx={{ flexGrow: 1 }}>
              MatchNow
            </Typography>
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                  Register
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                  Login
                </Button>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/messages/send" style={{ textDecoration: "none" }}>
                <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                  보낸 메시지
                </Button>
              </Link>
              <Link to="/messages/recv" style={{ textDecoration: "none" }}>
                <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                  받은 메시지
                </Button>
              </Link>
              <Button
                onClick={handleClickLougout}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
