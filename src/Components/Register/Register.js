import './Register.css'
import React, { useContext, useEffect, useState, } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { useHistory, useParams } from 'react-router-dom';

import brandLogo from '../../logos/Group 1329.png'
const Register = () => {

  const {id} = useParams()
  const history = useHistory();
  const [allTasks, setAllTasks] = useState([])
  
    // 
      useEffect(() => {
        fetch('http://localhost:5000/allEvents')
        .then(res => res.json())
        .then(data => setAllTasks(data))
      },[])
    //
    const selectedTask = allTasks.find(tk =>tk.taskId === id)
    const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const handleDate = (date) => {
    //   setSelectedDate(date);
    // }
    // console.log(selectedEvent);
  const onSubmit = data => {
      
      const tastsInfo = {...loggedInUser, form:data, ...selectedTask};
      
      fetch('http://localhost:5000/addTasks', {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(tastsInfo)
      })
      .then(res => res.json())
      .then(data => {
          if(data){
              alert('Your order placed successfully');
              history.push('/event')
          }
      })

    };
    
    return (
        <div className='container w-50'>
          <img src={brandLogo} className='img-fluid'/>
            <br/><br/><br/>
            <form className='ship-form form p-3' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-center'>Register as a volunteer</h3><br/>
            <input name="UserName" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" className='form-control' />
      {errors.name && <span className="error">Name is required</span>}
                <br/>
                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Your Email" className='form-control'/>
        {errors.email && <span className="error">Email is required</span>}
                <br/>
                {/* <TextField
      ref={register({required: true})}
    id="date"
    label="Birthday"
    type="date"
    defaultValue="19/07/2020"
    name="date"
    value={selectedDate}
    onChange={handleDate}
    InputLabelProps={{
      shrink: true,
    }}
  /> */}
                <br/>
                <input type="text" name="Description" ref={register({required: true})} placeholder='Description' className="form-control"/>
                {errors.description && <span>Description is required</span>}
                <br/>
                <input type="text" name="library" ref={register({ required: true })} placeholder="Organize books at the library." className="form-control"/>
                {errors.library && <span className='error'>Library is required</span>}
                <br/>
                  <input type="submit" value="Registration" className='btn btn-warning btn-block'/>
                
            </form>
        </div>
    );
};

export default Register;