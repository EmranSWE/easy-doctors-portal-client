import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg';
import map from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg'
const Info = () => {
    const heading1='Opening Hours';
    const heading2='Visit our location';
    const heading3='Contact us now';
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          <InfoCard bgclassName="bg-gradient-to-r from-secondary to-primary" img={clock} heading={heading1}></InfoCard>  
          <InfoCard bgclassName="bg-neutral" img={map} heading={heading2}></InfoCard>  
          <InfoCard bgclassName="bg-gradient-to-r from-secondary to-primary" img={phone} heading={heading3}></InfoCard>  
        </div>
    );
};

export default Info;