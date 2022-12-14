import React from 'react';

const Service = ({ service,setTreatment }) => {
    const {name, slots,price}=service;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold text-secondary">{name}</h2>
                    <h2 className="text-center text-xl font-bold ">${price}</h2>
                    <p className='text-center'>
                        {
                       slots.length > 0 
                        ? <span>{slots[0]}</span>
                        : 
                        <span className='text-red-500'>No Try another day</span>
                        }
                    </p>
                    <p className='text-center'>{slots?.length} {slots?.length > 1 ? "spaces" : "space"} available </p>
                    <div className="card-actions justify-center">
                        <label 
                        htmlFor="booking-modal"  
                        disabled={slots?.length===0} onClick={() => setTreatment(service)}  className="btn btn-secondary text-white uppercase">BOOK APPOINTMENT</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;