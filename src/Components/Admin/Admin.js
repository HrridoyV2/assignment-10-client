import React, { useEffect, useState } from 'react';
import './Admin.css'
import brandLogo from '../../logos/Group 1329.png';
import peopleLogo from '../../logos/users-alt 1.png';
import { Link } from 'react-router-dom';
import deleteLogo from '../../logos/trash-2 9.png'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const Admin = () => {
    const [eventTask, setEventTask] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/volunteerList')
        .then(res => res.json())
        .then(data => setEventTask(data))
    },[])
    console.log(eventTask);
    const handleDelete = (event, id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
        // event.target.parentNode.parentNode.parentNode.style.display = 'none'
}
    return (
        <div className='container'>
            <nav className='d-flex'>
                <div className='brand-logo'>
                <img src={brandLogo} className='img-fluid'/>
                <p className='mt-5 text-primary'><img src={peopleLogo} className='people'/> Volunteer regular list</p>
                <Link to='/addEvent'><p>+ Add event</p></Link>
                </div>                
            </nav>

            <div >
            <h4 className='ml-5'>Volunteer register list</h4>
            {
                eventTask.map(et => <div className='row'>
                    <div className="col-2">
                        <p>{et.name}</p>
                    </div>
                    <div className="col-3">
                        <p>{et.email}</p>
                    </div>
                    <div className="col-2">
                        <p>22-10-2000</p>
                    </div>
                    <div className="col-3">
                        <p>{et.taskName}</p>
                    </div>
                    <div className="col-2">
                        <button onClick={(event) => handleDelete(event,et._id)} className="btn btn-danger btn-sm"><DeleteForeverIcon></DeleteForeverIcon></button>
                    </div>
                </div>)
            }
            
            </div>
        </div>
    );
};

export default Admin;