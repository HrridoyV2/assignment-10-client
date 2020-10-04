import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
const AddEvent = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();

    const onSubmit = data => {
        fetch('https://damp-springs-43419.herokuapp.com/addEvent', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert('Your order placed successfully');
                history.push('/');
            }
        })
  
      };

    return (
        <div>
            
                <form className='ship-form form p-3' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-center'>Register as a volunteer</h3><br/>
                <br/>
                <input type="text" name="taskName" ref={register({ required: true })} placeholder="Title" className="form-control"/>
                {errors.library && <span className='error'>Library is required</span>}
                <input type="text" name="Description" ref={register({required: true})} placeholder='Description' className="form-control"/>
                {errors.description && <span>Description is required</span>}
                
                <br/>
                  <input type="submit" value="Registration" className='btn btn-warning btn-block'/>
                
            </form>
        </div>
    );
};

export default AddEvent;