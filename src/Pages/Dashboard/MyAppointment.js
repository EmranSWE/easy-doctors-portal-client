import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth'
const MyAppointment = () => {
    const [appointments, setAppointments]=useState([]);
    const [user] =useAuthState(auth);
    const navigate=useNavigate()
    useEffect(()=>{
        if(user){
            fetch(`https://easy-doctors-portal-8vkjy.ondigitalocean.app/booking?patient=${user.email}`,{
              method:'GET',
              headers:{
                'authorization':`Bearer ${localStorage.getItem('accessToken')}`
              }
            })
        .then(res => {
          if(res.status===401 || res.status===403 || res.status===500){
            const logout = () => {
              signOut(auth);
              localStorage.removeItem('accessToken');
            };
            navigate('/')
          }
          return res.json()
        })
        .then(data =>{ setAppointments(data)})
        }
    },[user]);
    return (
        <div>
            <h1>My Appointment:{appointments?.length}</h1>
            <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Date</th>
        <th>Time</th>
        <th>Treatment</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
        {
            appointments?.map((a,index) =>  <tr key={index}>
                <td>{index+1}</td>
                <td>{a.name}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
                <td>{
                (a.price && !a.paid) &&
                <Link to={`/dashboard/payment/${a._id}`}><button className='btn btn-success'>Pay</button></Link>}
                {
                (a.price && a.paid) && <div>
                  <span className='text-secondary'>Paid</span>

                  <p>Transaction id: <span className='text-orange-500'>{a.transactionId}</span> </p>
                </div>}
               </td>
              </tr>
              
              )
        }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyAppointment;