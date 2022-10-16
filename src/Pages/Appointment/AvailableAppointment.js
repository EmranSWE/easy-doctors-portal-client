import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointment = ({ date }) => {
    const [services, setServices] = useState([]);
    const [treatment,setTreatment]=useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/service')
            .then(res => res.json())
            .then(data => setServices(data))
    }, []);
    return (
        <div className='my-10'>
            <h4 className='text-center text-2xl text-secondary my-12'>Available Services on {format(date, 'PP')}</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
           {
            services.map(service => <Service key={service._id} service={service} setTreatment={setTreatment}></Service>)
           } 
        </div>
        {
            treatment &&
            <BookingModal  treatment={treatment} date={date} setTreatment={setTreatment}></BookingModal>
           }
        </div>
    );
};

export default AvailableAppointment;