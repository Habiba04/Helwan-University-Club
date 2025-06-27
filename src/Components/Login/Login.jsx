// src/components/LoginForm.jsx
import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import handleSubmit from './services/submit.service';
import { Link } from 'react-router-dom';
import lang from '../../assets/lang/language';
import { LanguageContext } from '../../context/LanguageProvider.context';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);
    const { language } = useContext(LanguageContext);
    const { login,user } = useAuth();
    const [data, setData] = useState({token:"",user:{Type:""}});


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
            setErrors((prev) => ({ ...prev, email: '' }));
        } else {
            setPassword(value);
            setErrors((prev) => ({ ...prev, password: '' }));
        }
    };
        useEffect(() => {
            // TODO: Navigate to the correct page
            if (user !== null) {
                switch (user.user.Type.toLowerCase()) {
                    case 'admin': 
                    {
                            console.log('admin');
                            navigate(`/members`);
                            break;
                    }
                    case 'member': {
                        console.log(user.user.Id);
                        navigate(`/profile/${user.user.Id}`);
                        break;
                    }
                    case 'stuffmembership': {
                        console.log('staffMembership');
                        navigate(`/members`);
                        break;
                    }
                    case 'superadmin': {
                        console.log('super admin');
                        navigate(`/logs`);
                        break;
                    }
                    case 'staffsecurity': console.log('staffSecurity'); break;
                    default:  console.log('member');
                }
            }

    },[user]);
    const handleSuccess = (event) => {
         handleSubmit(event, email, password, setErrors, setLoading, language,login);
        
        // TODO: Navigate to the correct page
        if (user !== null)
        {
            switch (user.user.Type.toLowerCase()) {
                case 'admin': return 'admin';
                case 'member': {
                    console.log(user.user.Id);
                    navigate(`/profile/${user.user.Id}`);
                    break;
                }
                case 'staffmembership': return 'staffMembership';
                case 'superadmin': return 'super admin';
                case 'staffsecurity': return 'staffSecurity';
                default: return 'member';
            }
        }
        

    }
    return (
        <div className="login-container" dir={lang[language].direction}>
            <form className="login-form" onSubmit={(event) => handleSuccess(event)}>
                <h2 className="text-center mb-4">{lang[language].login}</h2>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">{lang[language].email}</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">{lang[language].password}</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        placeholder="**********"
                        value={password}
                        onChange={handleChange}
                        onMouseEnter={(e) => (e.target.type = 'text')}
                        onMouseLeave={(e) => (e.target.type = 'password')}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className={`d-grid ${isLoading?  "justify-content-center" : ""}`}>
                    {isLoading && <div className="spinner-border  login-spinner"  role="status"></div>}
                    {!isLoading && (<button type="submit" className="btn btn-primary" testid="loginbtnsubmit">{lang[language].login}</button>)}
                </div>

                <div className="text-center mt-3">
                    <small>{lang[language].notMemberYet} <Link to="/register">{lang[language].register}</Link></small>
                </div>
            </form>
        </div>
    );
};

export default Login;
