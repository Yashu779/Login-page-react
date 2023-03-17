import { useEffect, useReducer, useState } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    console.log(state.value);
    return { value: state.val, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [email, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [password, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log("Input Changed");
      setFormIsValid(email.isValid && password.isValid);
    }, 500);
    return () => {
      console.log("Return Called");
      clearTimeout(timer);
    };
  }, [email.isValid, password.isValid]);
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") && password.value.trim().length > 5
    // );
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // console.log(event.target.value.trim().length);
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && email.value.includes("@")
    // );
    //
  };
  const validateEmailHandler = () => {
    // setEmailIsValid(email.value.includes("@"));
    dispatchEmail({ type: "INPUT_BLUR" });
  };
  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 5);
    dispatchPassword({ type: "INPUT_BLUR" });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("isLoggedIn", "1");
    props.onLogin(email.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            email.isValid === false ? classes.invalid : classes.valid
          }`}
        >
          <label htmlFor="email">E-mail </label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          ></input>
        </div>
        <div
          className={`${classes.control} ${
            password.isValid === false ? classes.invalid : classes.valid
          }`}
        >
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          ></input>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
