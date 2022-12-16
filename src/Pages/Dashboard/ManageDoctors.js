import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteConfirmModal from './DeleteConfirmModal';
import DoctorRow from './DoctorRow';

const ManageDoctors = () => {
    const [deletingDoctor,setDeletingDoctor]=useState(null)
    const { data: doctors, isLoading ,refetch} = useQuery('doctors', () => fetch('https://easy-doctors-portal-8vkjy.ondigitalocean.app/doctor', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-2xl">Manage Doctors:{doctors.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        doctors.map((doctor,index)=><DoctorRow key={doctor._id} refetch={refetch} 
                        setDeletingDoctor={setDeletingDoctor}
                        doctor={doctor}
                         index={index}></DoctorRow>)
                       }
                        
                    </tbody>
                </table>
            </div>
                       {
                        deletingDoctor && <DeleteConfirmModal 
                        deletingDoctor={deletingDoctor}
                        refetch={refetch}
                        setDeletingDoctor={setDeletingDoctor}
                        ></DeleteConfirmModal>
                       }
        </div>
    );
};

export default ManageDoctors;