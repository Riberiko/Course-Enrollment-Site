import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ statusCode, message }) => {
  const [timerId, setTimerId] = useState(null);
  const [time, setTime] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!timerId) {
      setTimerId(
        setInterval(() => {
          setTime((prev) => {
            if (prev === 0) {
              clearInterval(timerId);
              navigate('/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000)
      );
    }
  
    return () => clearInterval(timerId);
  }, [time, timerId, navigate]);
  

  return (
    <>
      <h1>Status: {statusCode}</h1>
      <p>[Error]: {message}</p>
      {(statusCode === 404 || statusCode === 400) && (
        <>
          Redirecting in {time} (s)
        </>
      )}
    </>
  );
};

export default ErrorPage;
