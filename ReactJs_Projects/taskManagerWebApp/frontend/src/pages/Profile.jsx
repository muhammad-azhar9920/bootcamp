import React, { useState, useEffect, useContext, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { AppContext } from '../context/MyContext'
import axios from 'axios';

export default function Profile({ url }) {
  const { userID, checkAuth, mode, showAlert } = useContext(AppContext);
  const [user, setUser] = useState([]);
  const [file, setFile] = useState(null);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  // Get user data 
  const getUserDetails = async (userId) => {
    let res = await axios.get(`${url}/api/user/getsingleuser/${userId}`, { withCredentials: true })
    setUser(res.data[0]);
  }

  const formData = new FormData();
  formData.append('file', file);

  // Change User Profile Picture
  const changeProfilePic = async (e) => {
    e.preventDefault();
    let res = await axios.put(`${url}/api/user/updateprofilepic/${userID}`, formData)
    if (res.data.success) {
      showAlert(res.data.msg, 'primary');
      location.reload(true);
    } else {
      showAlert(res.data.Error, 'danger');
    }
  }

  // Change User Password
  const changePassword = async (e) => {
    e.preventDefault();
    let res = await axios.put(`${url}/api/user/changepassword/${userID}`, { oldPass, newPass })
    if (res.data.success) {
      showAlert(res.data.msg, 'light');
      location.reload(true);
    } else {
      showAlert(res.data.Error, 'danger');
    }
  }

  useEffect(() => {
    checkAuth();
    if (userID) {
      getUserDetails(userID);
    }
  }, [userID])

  // Get input Password tag refrence
  const oldPassRef = useRef();
  const newPassRef = useRef();
  const handleCheckboxChange = () => {
    if (oldPassRef.current.type === 'password' || newPassRef.current.type === 'password') {
      oldPassRef.current.type = 'text';
      newPassRef.current.type = 'text';
    } else {
      oldPassRef.current.type = 'password';
      newPassRef.current.type = 'password';
    }
  }


  return (
    <div className='d-flex'>
      <div className={`me-2 bg-${mode == 'light' ? 'primary' : 'black'} border border-5`} style={{ width: '20%' }}>
        <Sidebar />
      </div>
      <div className='mx-2' style={{ width: '80%' }}>
        <div className="row">
          <div className="col-6 mt-5">
            <div className='display-5 text-white mt-3'>
              Name: <span>{user == "" ? "" : user.name.toUpperCase()}</span>
            </div>
            <div className='display-6 text-white mt-3'>
              Email: <span>{user == "" ? "" : user.email}</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-center mt-3'>
              <img src={`${url}/images/${user == "" ? "" : user.picture}`} className='img-fluid rounded' width={300} alt="user_image" />
            </div>
            <form onSubmit={changeProfilePic} className='mt-2 d-flex justify-content-center'>
              <input type="file" className='form-control w-50'
                onChange={(e) => { setFile(e.target.files[0]) }}
                required={true} />
              <button type='submit' className='btn btn-light'>UPDATE</button>
            </form>
          </div>
        </div>
        <hr />
        <div>
          <h2 className='text-center text-white'>CHANGE PASSWORD</h2>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <form onSubmit={changePassword}>
                <label className='form-label text-white'>OLD PASSWORD</label>
                <input type="password" className='form-control'
                  placeholder='Enter old password'
                  ref={oldPassRef}
                  onChange={(e) => { setOldPass(e.target.value) }}
                  required={true} />
                <label className='form-label text-white mt-2'>NEW PASSWORD</label>
                <input type="password" className='form-control'
                  placeholder='Enter new password'
                  ref={newPassRef}
                  onChange={(e) => { setNewPass(e.target.value) }}
                  required={true} />

                <div className="mb-3 form-check">
                  <input type="checkbox" onChange={handleCheckboxChange} className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label text-white" htmlFor="exampleCheck1">Show Password</label>
                </div>
                <div className='d-flex justify-content-center'>
                  <button type='submit' className='btn btn-light my-2'>CHANGE</button>
                </div>
              </form>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  )
}
