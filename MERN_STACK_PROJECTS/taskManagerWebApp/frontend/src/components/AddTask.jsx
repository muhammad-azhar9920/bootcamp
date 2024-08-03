import React, { useState, useContext } from 'react'
import { AppContext } from '../context/MyContext';
import axios from 'axios';

export default function AddTask({ userID, url }) {
    const { showAlert } = useContext(AppContext);

    const [values, setValues] = useState({
        title: '',
        description: '',
        user_id: ''
    });

    const handleChange = (e) => {
        setValues((prevVal) => {
            return {
                ...prevVal,
                [e.target.name]: e.target.value,
                user_id: userID,
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await axios.post(`${url}/api/task/addtask`, values, { withCredentials: true });
        if (res.data.success) {
            showAlert(res.data.msg, 'light');
            location.reload(true);

        } else {
            showAlert(res.data.Error, 'danger')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control"
                        placeholder='Enter Title'
                        name='title'
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"
                        placeholder='Enter Description'
                        name='description'
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    )
}
