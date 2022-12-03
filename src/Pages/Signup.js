import React, {useEffect} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from "../Lib/contextLib";
const Signup = (props) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const { userHasAuthenticated } = useAppContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // axios.defaults.withCredentials = true;
        
        // CSRF COOKIE
        axios.get("https://backend.virtualsfadmin.com/sanctum/csrf-cookie").then((response) => {
            axios.post("https://backend.virtualsfadmin.com/api/register", {
                name: name,
                email: email,
                password: password
            }).then(response => {

                console.log("response", response);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', JSON.stringify(response.data.user['token']));
                    const headers = {
                        "Authorization": `Bearer ${ response.data.user['token'] }`
                    };
                    
                axios.get("https://backend.virtualsfadmin.com/api/user", {headers: headers}).then((response) => {
                   /* setUserId(response.data.id)
                    setUserName(response.data.name)
                    setErrorMessage("")
                    setAuthStatus(LOGGED_IN)*/
                    // store the user in localStorage
                    // HasAuthenticated(true);  
                    navigate('/dashboard');
                }, (error) => {
                    setErrorMessage("Could not complete the login")
                }
            )},
            (error) => {
                if (error.response) {
                    setErrorMessage(error.response.data.message)
                } else {
                    setErrorMessage("Could not complete the login")
                }
            }
        )},
        (error) => {
            setErrorMessage("Could not complete the login")
        })
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
                                <h4 className="card-title mt-5">Sign Up</h4>
                            </div>
                            <div className="auth-form card">
                                <div className="card-body">
                                    {errorMessage &&
                                            <div className="alert alert-danger">{errorMessage}</div>
                                    }
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Name</label>
                                                <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Password</label>
                                                <input name="password" type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="mt-3 d-grid gap-2">
                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                        </div>
                                    </form>
                                    <p className="mt-3 mb-0">Already have an account?  <Link to='/' className="text-primary">Sign in</Link> to your account</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
}

export default Signup;