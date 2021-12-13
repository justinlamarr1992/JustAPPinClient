import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createOrUpdateUser } from "../../functions/auth";

import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and Password is Required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //   remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get ID Token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        console.log("user", user, "idTokenResult", idTokenResult);
        createOrUpdateUser(idTokenResult.token)
          .then((res) =>
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
          )
          .catch((err) => console.log(err));
        // Reux store
        // redirect
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    console.log(window.location.href);
    console.log(window.localStorage.getItem("emailForRegistration"));
  }, [navigate]);
  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-primary btn-raised">
        Complete Registration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">{completeRegisterForm()}</div>
      </div>
    </div>
  );
};
export default RegisterComplete;
