import React, {useEffect} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from "../Lib/contextLib";

const Login = (props) => {
    const { userHasAuthenticated } = useAppContext();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    // const [userId, setUserId] = React.useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        
        if (localStorage.getItem('user')) {
            // navigate('/', {user_id : });
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const res = await axios.get('http://localhost:3000/users');
        //console.log(res.data);
        const {admin, user} = res.data;

        if (admin.email == email && admin.password == password)
        {
            localStorage.setItem('user', JSON.stringify(admin));
            userHasAuthenticated(true);
            navigate('/dashboard');
            //alert("admin")
        }
        else if (user.email == email && user.password == password)
        {
            localStorage.setItem('user', JSON.stringify(user));
            userHasAuthenticated(true);
            navigate('/dashboard');
            //alert("user")
        }
        else{
            // alert("Invalid Credentials")
            setErrorMessage("Invalid Credentials")
        }
    }
  
    
    return (
            <div className="authincation section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                                        <a href="/" className="mini-logo text-center my-4">
                                            <img src="./images/logo.png" alt="" className="logo-primary" width="75" />
                                            <strong>Shiny Lobster</strong>
                                        </a>
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center my-4">
                                <h4 className="card-title mt-5">Login</h4>
                            </div>
                            <div className="auth-form card">
                                <div className="card-body">
                                    {errorMessage &&
                                            <div className="alert alert-danger">{errorMessage}</div>
                                    }
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Password</label>
                                                <input name="password" type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                                            </div>
                                            <div class="col-12 text-end"><Link to='/forgot'>Forgot Password?</Link></div>
                                        </div>
                                        <div className="mt-3 d-grid gap-2">
                                            <button type="submit" className="btn btn-primary mr-2">Sign In</button>
                                        </div>
                                    </form>
                                    <p className="mt-3 mb-0">Don't have an account?  <Link to='/signup' className="text-primary">Sign up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
}

export default Login;