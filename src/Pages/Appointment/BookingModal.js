import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const BookingModal = ({ date, treatment, setTreatment }) => {
    const { _id, name, slots } = treatment;
    const [user, loading, error] = useAuthState(auth);
    console.log(user)
    const handleBooking = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const slot = event.target.slot.value;
        const phone = event.target.phone.value;
        const email = event.target.email.value;
        const book={ _id,name, slot,phone,email};
        setTreatment(null);

        //Post to the server
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Success:', data);
            })
         
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-4 justify-items-center mt-2'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot,index) => <option key={index} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" name='name' disabled value={user?.displayName || ''} placeholder="Full Name" className="input input-bordered w-full max-w-xs" />
                        <input type="email" disabled value={user?.email || ' '}  name='email' placeholder="Email" className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />                       
                        <input type="submit" value='Submit' placeholder="Submit" className="input input-bordered w-full max-w-xs btn btn-secondary" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;