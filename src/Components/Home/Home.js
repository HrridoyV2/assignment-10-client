import React, { useEffect, useState } from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import brandLogo from '../../logos/Group 1329.png'

const Tasks = () => {
    const [allTasks, setAllTasks] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allEvents')
        .then(res => res.json())
        .then(data => setAllTasks(data))
    },[])
    return (
        <div className='container'>
            <nav className='nav navbar d-flex d-inline-flex'>
                <div className='brand-logo'><img src={brandLogo} className='img-fluid'/></div>
                
                <div className='d-flex'>
                <Link to='/' className='nav-link text-dark'>Home</Link>
                <Link className='nav-link text-dark'>Donation</Link>
                <Link className='nav-link text-dark'>Events</Link>
                <Link className='nav-link text-dark'>Blog</Link>
                <Link className='btn btn-primary'>Regular</Link>
                <Link to='/admin' className='btn btn-secondary'>Admin</Link>
                </div>
                
            </nav>

            <div className="row">
                {
                    allTasks.map(tk => <div className='col-md-3 col-sm-6'>
                     <div className='m-3 w-100'>
                     <img src={tk.taskImg} className='img-fluid' alt='imag'/>
                     <Link to={"/"+tk.taskId+"/register"}>
                     <h5 className='w-100 py-3 px-2 btn btn-warning'>{tk.taskName}</h5>
                     </Link>
                     
                     </div>
                </div>)
                }
            </div>
        </div>
    );
};

export default Tasks;