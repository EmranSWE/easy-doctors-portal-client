import React from 'react';

const ContactUs = () => {
    return (
       <section className='bg-blue'>
        <div className='w-96 mx-auto my-5'>
        <h1 className='text-primary text-center text-2xl w-1/2'>Contact Us</h1>
        <h2 className='text-3xl my-5 text-white'>Stay Connected With Us</h2>
        <div >
        <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
        <input type="text" placeholder="Type here" className="my-2 input w-full max-w-xs" />
        <textarea className="textarea w-80" placeholder="Bio"></textarea>
        </div>
        </div>
        
       </section>
    );
};

export default ContactUs;