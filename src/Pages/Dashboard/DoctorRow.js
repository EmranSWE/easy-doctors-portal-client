import React from 'react';

const DoctorRow = ({ doctor, index, setDeletingDoctor }) => {
    const { name, specialty, img } = doctor;
   
    return (
        <tr>
            <th>{index + 1}</th>
            <th>
                <div className="avatar">
                    <div className="w-8 rounded">
                        <img src={img} alt={name} />
                    </div>
                </div>
            </th>
            <td>{name}</td>
            <td>{specialty}</td>
            <td>
            <label onClick={()=> setDeletingDoctor(doctor)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-error">Delete</label>

               </td>
        </tr>
    );
};

export default DoctorRow;