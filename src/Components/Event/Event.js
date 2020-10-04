import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import brandLogo from '../../logos/Group 1329.png'
const Event = () => {
    const [eventTask,setEventTask] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() => {
        fetch('https://damp-springs-43419.herokuapp.com/event?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => {
            setEventTask(data);
        });
    },[])
    const [isDeleted, setIsDeleted] = useState(false)
    const handleDelete = (event, id) => {
        fetch(`https://damp-springs-43419.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            setIsDeleted(result);
            console.log(result);
            
            console.log(isDeleted);
        })
        event.target.parentNode.parentNode.style.display = 'none'
}
    
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
                </div>
                
            </nav>
            <div className='card mb-3 row d-flex wrap'>
            <div className="row col-6">
                
                {
                    eventTask.map(tk =>
                    <>
                     <div className='col-md-4'>
                         <img src={tk.taskImg} className='img-fluid'/>
                     </div>
                     <div className='col-md-8'>
                    <div className='card-body'>
                    <h5 className='card-title'>{tk.taskName}</h5>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                        <button onClick={(event) => handleDelete(event,tk._id)} className='btn btn-secondary'>Cancel</button>
                     </div>
                </>
                )
                }
            </div>
            </div>
        </div>
    );
}

export default Event;