import React, {useEffect} from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from "../Lib/contextLib";

const ResetPassword = (props) => {
    const { userHasAuthenticated } = useAppContext();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password_confirmation, setConfirmPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [token, setToken] = React.useState(useParams().token);
    // const [userId, setUserId] = React.useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        
    }, [navigate]);
  
    const handleSubmit = (e) => {
        e.preventDefault();
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
                                <h4 className="card-title mt-5">Reset Password</h4>
                            </div>
                            <div className="auth-form card">
                                <div className="card-body">
                                    {errorMessage &&
                                            <div className="alert alert-danger">{errorMessage}</div>
                                    }
                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="token" value={ token } />
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required readOnly />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Password</label>
                                                <input name="password" type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Confirm Password</label>
                                                <input name="password_confirmation" type="password" className="form-control" value={password_confirmation} onChange={e => setConfirmPassword(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="mt-3 d-grid gap-2">
                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
}

export default ResetPassword;