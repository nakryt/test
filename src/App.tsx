import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./App.scss";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import MenuMobile from "./components/MenuMobile/MenuMobile";

import { getToken } from "./redux/usersThunks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenuHandler = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const classes = [
    "app",
    showMobileMenu ? "overflow-hidden" : "overflow-inherit",
  ];
  return (
    <div className={classes.join(" ")}>
      <CSSTransition
        classNames="menu"
        in={showMobileMenu}
        unmountOnExit
        timeout={300}
      >
        <MenuMobile toggleMenu={toggleMobileMenuHandler} />
      </CSSTransition>
      <Header toggleMobileMenu={toggleMobileMenuHandler} />
      <Route path="/" component={Main} />
      <Footer />
    </div>
  );
}

export default App;
