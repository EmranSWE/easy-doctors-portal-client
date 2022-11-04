import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
const BookingModal = ({ date, treatment, setTreatment,refetch }) => {
    const { _id, name, slots,price } = treatment;
    const [user, loading, error] = useAuthState(auth);
    const formatedDate=format(date,'PP')
    const handleBooking = event => {
        event.preventDefault();
        const phone = event.target.phone.value;
        const slot = event.target.slot.value;
        
        const booking = {
             treatmentId: _id,
             treatment: name, 
             date: formatedDate,
             slot,
             price,
             patient:user.email,
             phone:phone,
            name:user.displayName};

        //Post to the server
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.success){
                    toast(`Appoinment is set, ${formatedDate} as ${slot}`)
                }
                else{
                    toast.error(`Already have an Appointment  ${data.booking?.date} at ${data.booking?.slot}`)
                }
                refetch()
        setTreatment(null);
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