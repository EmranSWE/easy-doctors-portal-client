import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51M05zgFXEoII0xDNZIsXUD4aExT2gPuSHsMbldhAJxxzsC3vPKQx45W9cRSNqZmMEQLohaUWEhfUzYC8GoOLkcG700tqHnQxAd');
const Payment = () => {
    const { id } = useParams();
    const url = `https://easy-doctors-portals.onrender.com/booking/${id}`
    const { data: appointment, isLoading } = useQuery(['service', id], () => fetch(url, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>

            <div className="card w-50 bg-base-100 shadow-xl max-w-md ">
                <div className="card-body">
                    <h2 className="card-title font-bold">Hello {appointment.name}</h2>
                    <p>We will see you on <span className='text-orange-700'>{appointment.date}</span> at {appointment.slot}</p>
                    <div className="card-actions justify-end">
                        <p className='text-primary'>Please Pay for: {appointment.price}</p>
                    </div>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment}></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>

    );
};

export default Payment;