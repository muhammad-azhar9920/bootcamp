import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import Sidebar from '../components/Sidebar';
import { AppContext } from '../context/MyContext';

export default function Home({ url }) {
  const [taskid, setTaskid] = useState(null);

  const { checkAuth, userID, tasks, deleteTask, mode, showAlert } = useContext(AppContext);

  const handlePending = async (taskid) => {
    console.log(taskid);
    let res = await axios.put(`${url}/api/task/updatependingtask/${taskid}`);
    if (res.data.success) {
      showAlert(res.data.msg, 'light')
      location.reload(true);
    } else {
      showAlert(res.data.Error, 'danger')
    }
  }

  useEffect(() => {
    checkAuth();
  }, [userID, taskid]);


  return (
    <div className='d-flex'>
      <div
        className={`me-2 bg-${mode == 'light' ? 'primary' : 'black'} border border-5`} style={{ width: '20%', height: '100vh' }}>
        <Sidebar />
      </div>
      <div className='mx-2' style={{ width: '80%' }}>

        <div className='d-flex justify-content-center'>
          <button className='btn btn-light mt-3' type="button" data-bs-toggle="modal" data-bs-target="#addTaskModal">
            <span className='me-2' style={{ fontSize: "2rem" }}>ADD</span>
            <i className="bi text-black bi-plus-square" style={{ fontSize: "2rem" }}></i>
          </button>
        </div>

        <div className='row'>
          {
            tasks.map((task) => (
              task.id == null ?
                <h1 key={task.id} className='text-center text-white mt-3'>There is no Task!</h1>
                :
                task.iscompleted !== 1 ? <div className="col-md-4" key={task.id}>
                  <div className="card mt-4 mx-2 shadow" style={{ width: "18rem" }}>
                    <div className={`card-body bg-${mode == 'light' ? 'light' : 'dark'} text-${mode == 'light' ? 'black' : 'white'}`}>
                      <h5 className="card-title">{task.title.toUpperCase()}</h5>
                      <p className="card-text">{task.description}</p>
                      <div className='d-flex justify-content-end gap-2'>
                        <button
                          onClick={() => { handlePending(task.id) }}
                          className='btn btn-danger'>Pending...</button>

                        <button type='button' className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editTaskModal" onClick={() => { setTaskid(task.id) }}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button href="#" className="btn btn-primary" onClick={() => { deleteTask(task.id) }}>
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div> : ""
            ))
          }
        </div>

        {/* ///////////////////// MODALS //////////////////////// */}
        {/* <!-- ADD TASK Modal --> */}
        <div className="modal fade" id="addTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className={`modal-content bg-${mode == 'light' ? 'light' : 'dark'}`}>
              <div className="modal-header">
                <h5 className={`modal-title text-${mode == 'light' ? 'black' : 'white'}`} id="exampleModalLabel">ADD TASK</h5>
                <button type="button" className={`btn-close bg-${mode == 'light' ? 'light' : 'light'}`} data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* form */}
                <AddTask userID={userID} url={url} />
                {/* form */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ADD TASK Modal --> */}

        {/* <!-- EDIT TASK Modal --> */}
        <div className="modal fade" id="editTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className={`modal-content bg-${mode == 'light' ? 'light' : 'dark'}`}>
              <div className="modal-header">
                <h5 className={`modal-title text-${mode == 'light' ? 'black' : 'white'}`} id="exampleModalLabel">EDIT TASK</h5>
                <button type="button" className={`btn-close bg-${mode == 'light' ? 'light' : 'light'}`} data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* form */}
                <EditTask taskid={taskid} url={url} />
                {/* form */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- EDIT TASK Modal --> */}
        {/* ///////////////////// MODALS //////////////////////// */}
      </div>
    </div>
  )
}
