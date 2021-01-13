import React, { useEffect, useState } from "react";
import fire from "../../fire";
import { setUserEmail, setUserId } from "../../redux/userTodo";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

const Login = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.data.userId);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const handleLogin = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => console.log(response))
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            setEmailError("");
            setPasswordError("");
        }
      });
  };
  const handleSignup = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            setEmailError("");
            setPasswordError("");
        }
      });
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    if (user) {
      dispatch(setUserId(user.uid));
      dispatch(setUserEmail(user.email));
    }
  }, [user, setUserId, dispatch]);
  useEffect(() => {
    authListener();
  }, [authListener]);

  return user ? (
    <Redirect to="task" />
  ) : (
    <section className="login">
      <div className="loginContainer">
        <label>Username</label>
        <input
          type="text"
          placeholder="Login"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                Don't have an account?{" "}
                <span onClick={() => setHasAccount(false)}>Sing up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup}>Sign up</button>
              <p>
                Have an account?{" "}
                <span onClick={() => setHasAccount(true)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
