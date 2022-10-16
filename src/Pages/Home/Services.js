import React from 'react';
import ServiceInfo from './ServiceInfo';
import fluoride from '../../assets/images/fluoride.png';
import cavity from '../../assets/images/cavity.png';
import white from '../../assets/images/whitening.png';
import babyTeeth from '../../assets/images/treatment.png'
const Services = () => {
    return (
        <div>
            <h1 className="text-primary text-center text-2xl mt-3">OUR SERVICE</h1>
            <h2 className="text-center text-2xl">Services We Provide</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 p-4'>
                <ServiceInfo img={fluoride} title="Fluoride Treatement"></ServiceInfo>
                <ServiceInfo img={cavity} title="Cavity Filling"></ServiceInfo>
                <ServiceInfo img={white} title="Teeth whitening"></ServiceInfo>
            </div>

            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse ">
                    
                    <div className='ml-5'>
                        <h1 className="text-6xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                        <p className="py-6">Easy Doctor Portals strives to maintain a high standard of patient services and quality care. We use the latest technologies and state-of-the-art equipment to treat patients of all ages, and our highly-trained and skilled team works together to deliver long-lasting results.

                        </p>
                        <button className="btn btn-primary text-white font-bold bg-gradient-to-r from-secondary to-primary">Get Started</button>
                    </div>
                    <img  src={babyTeeth} className="max-w-sm rounded-lg shadow-2xl " />
                </div>
            </div>

        </div>
    );
};

export default Services;