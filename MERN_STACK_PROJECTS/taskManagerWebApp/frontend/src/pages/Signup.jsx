import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/MyContext';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [err, setErr] = useState('');
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { mode, showAlert } = useContext(AppContext);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('file', file);

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
        let res = await axios.post('http://localhost:8000/api/auth/register', formData);
        if (res.data.success) {
            navigate('/login');
        } else {
            setErr(res.data.Error);
            showAlert(res.data.Error, 'danger');
        }
    }
    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-3"></div>
                <div className={`col-md-6 shadow-lg rounded p-4 bg-${mode} mb-5`}>
                    <h2 className='mb-4 text-center'>SIGNUP USER</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="name" className="form-control" aria-describedby="emailHelp"
                                name='name'
                                placeholder='Alex'
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp"
                                name='email'
                                placeholder='example@gmail.com'
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
                                name='password'
                                placeholder='password'
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div>
                            <label htmlFor="picture" className='form-label'>Picture</label>
                            <input type="file" className='form-control mb-2'
                                required={true}
                                onChange={(e) => { setFile(e.target.files[0]) }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">SIGNUP</button>
                        <div className='mt-2'>
                            <span>Already have Account? </span> <Link to="/login">Login here!</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
