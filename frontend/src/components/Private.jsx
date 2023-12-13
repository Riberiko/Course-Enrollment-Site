/*
  Name: Rob Tai, Michael Lezon, Riberiko Niyomwungere, David Ortega
  Date: 12.12.23
  This is react js file for account authentication
*/



import { useEffect, useState } from "react";
import { isAuthF, statusCheck } from '../helper';
import { useLocation, useNavigate } from "react-router-dom";
import { useInfoPopup } from '../messageContext';

const AuthChecker = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setAuth] = useState(false);
    const [time, setTime] = useState(10000);
    const [timerId, setTimerId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const  {showPopup} = useInfoPopup()

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await isAuthF();
                setAuth(true);

                fetch('http://localhost:8000/getNotifications', {'credentials':'include'})
                .then(res => statusCheck(res))
                .then(data => {
                    showPopup(data.response)
                })
                .catch(() => {})

            } catch (err) {
                setAuth(false);
                setTime(5)
                setTimerId( preId => {
                    if(preId) return preId
                    return setInterval(() => {
                        setTime(prev => prev-1);
                    }, 1000)
                }
                );
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();

        return () => clearInterval(timerId);
    }, [location.pathname]);

    useEffect(() => {
        if(time <= 0) navigate('/login')
    }, [time]);

    useEffect(()=>{
        return () => clearInterval(timerId);
    }, [])


    if (loading) return <>Checking Authentication...</>;

    if (isAuth) return <>{children}</>;
    else {
        return (
            <>
                <p>Unable to validate session, redirected to login page in {time}(s)</p>
            </>
        );
    }
};

export default AuthChecker;
