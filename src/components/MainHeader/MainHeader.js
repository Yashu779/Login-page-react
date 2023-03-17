import classes from "./MainHeader.module.css";
import Navigation from "./Navigation";

const MainHeader = (props) => {
  return (
    <header className={classes["main-header"]}>
      <h1>My Website</h1>
      <Navigation
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      ></Navigation>
    </header>
  );
};

export default MainHeader;
