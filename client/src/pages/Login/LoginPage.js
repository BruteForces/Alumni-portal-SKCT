import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";
import { RiErrorWarningFill } from "react-icons/ri";
import RegisterOptions from "components/RegistrationComponents/RegisterOptions";
import {
  useAuthContext,
  useAuthDispatchContext,
} from "context/auth/authContext";
import { login } from "context/auth/actions";
import Loader from "components/UI/Loader";
import { useAlertContext } from "context/alert/alertContext";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const LoginForm = () => {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatchContext();
  const location = useLocation();

  const [registerOptions, setRegisterOptions] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { success } = useAlertContext();

  const { user, error, isLoading } = useAuthContext();

  const onSubmit = async ({ userName, password }) => {
    await login(authDispatch, { email: userName, password });
  };

  useEffect(() => {
    if (user) navigate(location?.state?.from ?? "/");
  }, [user, navigate, location]);

  useEffect(() => {
    if (error) {
      success(error);
    }
  }, [error, success]);

  if (isLoading) return <Loader />;

  return (
    <div className={`${styles.loginBox} `}>
      <p className={`${styles.loginTitle}`}>Login Now</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={` ${styles.loginBodyContainer}`}>
          <p>Username</p>
          <div className={styles["input"]}>
            <input
              // type="text"
              title="please enter a valid email address"
              // pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              placeholder="Email ID"
              {...register("userName", { required: true })}
              className={styles["input-field"]}
            />
            {errors.userName && (
              <i>
                <RiErrorWarningFill style={{ color: "red" }} />
              </i>
            )}
          </div>
          {errors.userName && <span>Username is required</span>}
          <div className={styles["input"]}>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className={styles["input-field"]}
            />
            {errors.password && (
              <i>
                <RiErrorWarningFill style={{ color: "red" }} />
              </i>
            )}
          </div>

          {errors.password && <span>Password is required</span>}
          <div className={styles["terms-conditions"]}>
            <p>
              By login you agree to our <a>Terms & conditions</a>
            </p>
          </div>
        </div>
        <div className={` ${styles.loginButtonContainer}`}>
          <button>Login Now</button>
          <p>
              <a
              onClick={() => {
                success("Feature will be enabled soon,but your brain went slow so that's why you click Forgot Password :)");
              }} >Forgot Password 
              
                       
              </a>
              
          </p>
        </div>
      </form>
      <hr />
      <div
        className={styles["sign-up-container"]}
        onMouseLeave={() => {
          setRegisterOptions(false);
        }}
      >
        <p>
          Don't have an account yet ?{" "}
          <a
            onMouseEnter={() => {
              setRegisterOptions(true);
            }}
          >
            Create Account
            <RegisterOptions
              onMouseEnter={() => {
                setRegisterOptions(true);
              }}
              active={registerOptions}
            />
          </a>
        </p>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${styles.body}`}>
      {windowDimensions.width > 720 && (
        <div className={`${styles.welcomeContainer}`}>
          <div className={`${styles.welcomeBox}`}>
            <p>Welcome Back Alumnis We are excited!</p>
          </div>
          {windowDimensions.width > 1080 && (
            <div className={`${styles.humanImgContainer}`}></div>
          )}
        </div>
      )}
      <div className={`${styles.loginContainer}`}>
        <LoginForm />
      </div>
      {windowDimensions.width > 720 && (
        <div className={styles["down-part"]}></div>
      )}
    </div>
  );
};

export default LoginPage;
