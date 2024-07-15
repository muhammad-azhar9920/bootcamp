import React, { useEffect, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import { AppContext } from '../context/MyContext'
import '../App.css';

export default function CompletedTask() {
  const { checkAuth, tasks, deleteTask, mode } = useContext(AppContext);
  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <div className='d-flex'>
      <div className={`me-2 bg-${mode == 'light' ? 'primary' : 'black'} border border-5`} style={{ width: '20%', height: '100vh' }}>
        <Sidebar />
      </div>
      <div className='mx-2' style={{ width: '80%' }}>
        <h1 className='text-center text-white mt-3'> COMPLETED TASKS </h1>
        <div className='row'>
          {
            tasks.map((task) => (
              task.id == null ?
                <h1 key={task.id} className='text-center text-white mt-3'>There is no Task!</h1>
                :
                task.iscompleted !== 0 ?
                  <div className="col-md-4" key={task.id}>
                    <div className="card mt-4 mx-2 shadow" style={{ width: "18rem" }}>
                      <div className={`card-body bg-${mode == 'light' ? 'light' : 'dark'} text-${mode == 'light' ? 'black' : 'white'}`}>
                        <h5 className="card-title">{task.title.toUpperCase()}</h5>
                        <p className="card-text">{task.description}</p>
                        <div className='d-flex justify-content-end gap-2'>
                          <i className="bi bi-check-circle-fill text-success size_2rem"></i>
                          <i onClick={() => { deleteTask(task.id) }}
                            className="bi bi-trash-fill size_2rem cursor-pointer text-danger"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  ""
            ))
          }
        </div>
      </div>
    </div>
  )
}
