import { useState,useEffect } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CompletedTask from './pages/CompletedTask';
import Alert from './components/Alert';
import {AppContext} from './context/MyContext'
import axios from 'axios';

function App() {
  const [mode,setMode] = useState('light');
  const [modeText,setModeText] = useState('DarkMode');
  const [userID, setUserID] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [alert,setAlert] = useState(null);

  const navigate = useNavigate();
  // backend url
  const url = "http://localhost:8000";

  // Alert message function
  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  // dark & light mode function
  const toggle=()=>{
    if(mode == 'light'){
      setMode('dark');
      setModeText('LightMode')
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      showAlert('Dark mode has been enabled!','light')
    }else{
      setMode('light');
      setModeText('DarkMode');
      document.body.style.backgroundColor = '#0d6efd';
      document.body.style.color = 'black';
      showAlert('Light mode has been enabled!','dark')
    }
  }

  // Authentication function for privacy
  const checkAuth = async () => {
    let res = await axios.get(`${url}/api/auth/checkauth`, { withCredentials: true })
    if (res.data.success) {
      // console.log(res.data);
      // userId = res.data.id
      setUserID(res.data.id);
      // console.log('userid ',userID);
    } else {
      navigate('/login');
    }
  }

  // Get All Tasks by user id
  const getAllTasks = async (userId) => {
    let res = await axios.get(`${url}/api/task/alltasks/${userId}`, { withCredentials: true })
    // console.log(res)
    if (res.data.success) {
      // console.log(res.data.result);
      setTasks(res.data.result);
      setName(res.data.result[0].name);
      setProfilepic(res.data.result[0].picture);
      // console.log(res.data.result);
    } else {
      console.log(res.data.Error);
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    let res = await axios.delete(`${url}/api/task/deletetask/${id}`)
    if (res.data.success) {
      showAlert(res.data.msg, 'danger')
      location.reload(true)
    } else {
      alert(res.data.Error);
    }
  }

  // Logout User
  const logout = async () => {
    let res = await axios.get(`${url}/api/auth/logout`, { withCredentials: true });
    // console.log(res);
    if (res.data.success) {
      location.reload(true);
    }
  }

  useEffect(()=>{
    document.body.style.backgroundColor = '#0d6efd';
    checkAuth();
    if(userID){
        getAllTasks(userID);
    }
},[userID])

  return (
    <>
    <AppContext.Provider value={{checkAuth,userID,logout,tasks,name,deleteTask,mode,alert,showAlert,profilepic}}>
      <Navbar mode={mode} toggle={toggle} modeText={modeText}/>
      <Alert/>
      <Routes>
        <Route exact path='/' element={<Home url={url} />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/profile' element={<Profile url={url} />} />
        <Route exact path='/completedtask' element={<CompletedTask />} />
      </Routes>
    </AppContext.Provider>
    </>

  )
}

export default App
