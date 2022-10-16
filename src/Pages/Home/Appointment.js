import React from 'react';
import doctor from '../../assets/images/doctor-small.png'
import MainButton from '../Shared/MainButton/MainButton';
const Appointment = () => {
    return (
        <div>
            <div className="hero max-h-screen ">
                <div className="hero-content flex-col lg:flex-row bg-accent bg-blue">
                    <img   src={doctor} className="max-w-sm rounded-lg shadow-2xl mt-[-100px] hidden lg:block" />
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Appointment</h1>
                        <h1 className="text-3xl font-bold text-white">Make an appointment Today</h1>
                        <p className="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <MainButton>Get Started</MainButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;