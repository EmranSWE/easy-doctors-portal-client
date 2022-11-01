import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth'
const MyAppointment = () => {
    const [appointments, setAppointments]=useState([]);
    const [user] =useAuthState(auth);
    const navigate=useNavigate()
    useEffect(()=>{
        if(user){
            fetch(`http://localhost:5000/booking?patient=${user.email}`,{
              method:'GET',
              headers:{
                'authorization':`bearer ${localStorage.getItem('accessToken')}`
              }
            })
        .then(res => {
          console.log('res',res)
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
            <div class="overflow-x-auto">
  <table class="table w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Time</th>
        <th>Treatment</th>
      </tr>
    </thead>
    <tbody>
        {
            appointments?.map((a,index) =>  <tr>
                <td>{index+1}</td>
                <td>{a.name}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
              </tr>)
        }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyAppointment;