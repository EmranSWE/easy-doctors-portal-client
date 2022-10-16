import React from 'react';

const InfoCard = ({img,heading,bgClass}) => {
    return (
        <div className={`card m-4 lg:card-side bg-base-100 shadow-xl  text-white ${bgClass}`}>
  <figure><img className='p-2' src={img} alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">{heading}</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
    </div>
  </div>
</div>
    );
};

export default InfoCard;