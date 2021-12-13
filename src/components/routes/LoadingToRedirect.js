import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //   redirect when count is 0
    count === 0 && navigate("/");
    // clean up
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds </p>
    </div>
  );
};
export default LoadingToRedirect;
