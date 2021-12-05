import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent to ${email} click link to complete`);
    // save user email to local storage
    window.localStorage.setItem("emailForRegistration", email);
    //clear state
    setEmail("");
  };
  const registerForm = () => {};
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-raised btn-primary">
              Register
            </button>
          </form>
          <p>should be here</p>
        </div>
      </div>
    </div>
  );
};
export default Register;
