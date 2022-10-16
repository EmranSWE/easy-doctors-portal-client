import React from 'react';

const Service = ({ service,setTreatment }) => {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold text-secondary">{service.name}</h2>
                    <p className='text-center'>
                        {
                        service.slots.length > 0 
                        ? <span>{service.slots[0]}</span>
                        : 
                        <span className='text-red-500'>No Try another day</span>
                        }
                    </p>
                    <p className='text-center'>{service.slots.length} {service.slots.length > 1 ? "spaces" : "space"} available </p>
                    <div className="card-actions justify-center">
                        <label 
                        htmlFor="booking-modal"  
                        disabled={service.slots.length===0} onClick={() => setTreatment(service)}  className="btn btn-secondary text-white uppercase">BOOK APPOINTMENT</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;