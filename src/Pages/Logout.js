import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../Lib/contextLib";
const Logout = (props) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem('user');
        navigate('/');
    }, [navigate]);
    
    return (
            <div className="authincation section-padding">
            </div>
            );
}

export default Logout;