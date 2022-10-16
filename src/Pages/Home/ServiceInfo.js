import React from 'react';

const ServiceInfo = ({ img, title }) => {
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img className='w-50 mx-auto' src={img} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceInfo;