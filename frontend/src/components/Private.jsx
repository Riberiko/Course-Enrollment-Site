import { useEffect, useState } from "react";
import { isAuthF } from '../helper';
import { useLocation, useNavigate } from "react-router-dom";

const AuthChecker = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setAuth] = useState(false);
    const [time, setTime] = useState(null);
    const [timerId, setTimerId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await isAuthF();
                setAuth(true);
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
        if(time == 0) navigate('/login')
    }, [time]);

    useEffect(()=>{
        return () => clearInterval(timerId);
    }, [])


    if (loading) return <>Checking Authentication...</>;

    if (isAuth) return <>{children}</>;
    else {
        return (
            <>
                <h1>Unable to validate session, redirected to login page in {time}(s)</h1>
            </>
        );
    }
};

export default AuthChecker;
