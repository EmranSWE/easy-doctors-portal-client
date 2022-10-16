import React from 'react';
import chair from'../../assets/images/chair.png';
import MainButton from '../Shared/MainButton/MainButton';
import './Banner.css'
const Banner = () => {
    return (
        <div className="hero min-h-screen bg-chair">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={chair} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-6xl font-bold">Your New Smile Starts <br /> Here</h1>
      <p className="py-6">Easy Doctor Portals strives to maintain a high standard of patient services and quality care. We use the latest technologies and state-of-the-art equipment to treat patients of all ages, and our highly-trained and skilled team works together to deliver long-lasting results.

</p>
     <MainButton>Get Started</MainButton>
    </div>
  </div>
</div>
    );
};

export default Banner;