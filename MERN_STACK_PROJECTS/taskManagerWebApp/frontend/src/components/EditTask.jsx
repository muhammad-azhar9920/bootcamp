import React, {useState,useEffect,useContext} from 'react'
import axios from 'axios';
import { AppContext } from '../context/MyContext';

export default function EditTask({taskid,url}) {
    const {showAlert} = useContext(AppContext);

    const [values,setValues] = useState({
        id: '',
        title: '',
        description: '',
        user_id: ''
    });

    const handleChange = (e) => {
        setValues((prevVal)=>{
            return {
                ...prevVal,
                [e.target.name] : e.target.value,
            }
        });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let res = await axios.put(`${url}/api/task/edittask`,values,{ withCredentials: true });
        if(res.data.success){
            showAlert(res.data.msg,'light')
            location.reload(true);
        }else{
            showAlert(res.data.Error,'danger')
        }
    }
    const getSingleTask = async()=>{
        let res = await axios.get(`${url}/api/task/singletask/${taskid}`,{ withCredentials: true });
        const {id,title,description,user_id} = res.data.result[0]
        setValues({
            id,
            title,
            description,
            user_id
        })
    }


    useEffect(()=>{
        if(taskid){
            getSingleTask();
        }
    },[taskid]);

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control"
                        name='title'
                        value={values.title}
                        onChange={handleChange}
                        required={true}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                     <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"
                      name='description'
                      value={values.description}
                      onChange={handleChange}
                      required={true}
                    />
                </div>
                <button type="submit" className="btn btn-primary">UPDATE</button>
            </form>
        </div>
    )
}
