import React, { useState, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/MyContext';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const { mode, showAlert } = useContext(AppContext);

    const handleChange = (e) => {
        setValues((prevVal) => {
            return {
                ...prevVal,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await axios.post('http://localhost:8000/api/auth/login', values, { withCredentials: true });
        if (res.data.success) {
            navigate('/');
        } else {
            setErr(res.data.Error);
            showAlert(res.data.Error, 'danger');
        }
    }

    // to get password refrence
    const passRef = useRef();
    const handleCheckboxChange = () => {
        if (passRef.current.type === 'password') {
            passRef.current.type = 'text';
        } else {
            passRef.current.type = 'password';
        }
    }

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-3"></div>
                <div className={`col-md-6 shadow-lg rounded p-4 bg-${mode}`}>
                    <h2 className='mb-4 text-center'>LOGIN USER</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp"
                                placeholder='example@gmail.com'
                                name='email'
                                onChange={handleChange}
                                required={true}
                            />
                            <div id="emailHelp" className="form-text text-danger fw-bolder">
                                {err == "" ? "" : err}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                ref={passRef}
                                name='password'
                                placeholder='password'
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" onChange={handleCheckboxChange} className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary">LOGIN</button>
                        <div className='mt-2'>
                            <span>Don't have Account? </span> <Link to="/signup">Signup here!</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
