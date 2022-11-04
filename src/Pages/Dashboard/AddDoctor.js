import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    const { register,reset, formState: { errors }, handleSubmit } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))


    /* 
    YUP: to validate file: Yup file hook form
    */
    const imageStorageKey= '04a15e088ece55785654a58ff0dfb648';
    const onSubmit = async data => {
        const image = data.image[0];
        const formData= new FormData();
        formData.append('image',image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method:'POST',
            body: formData 
        })
        .then(res => res.json())
        .then(result =>{
            if(result.success){
                const img = result.data.url;
                const doctor = {
                    name:data.name,
                    email:data.email,
                    specialty:data.specialty,
                    img:img
                }
                //send to your database
                fetch('http://localhost:5000/doctor',{
                    method:"POST",
                    headers:{
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(inserted =>{
                    if(inserted.insertedId){
                        toast.success('Doctor addeded successfully');
                        reset();
                    }
                    else{
                        toast.error("Failed to add the doctor")
                    }
                })
            }
        })
    };

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-3xl'>Add a new Doctor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input  {...register("name", {
                    required: {
                        value: true,
                        message: "Name is required"
                    }
                })} type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
                <label className="label">
                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}

                </label>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input  {...register("email", {
                    required: {
                        value: true,
                        message: "Email is required"
                    },
                    pattern: {
                        value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                        message: 'Provide a valid email' // 
                    }
                })} type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
                <label className="label">
                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                </label>

                <label className="label">
                    <span className="label-text">Specialty</span>
                </label>
                <select {...register('specialty')} className="select input-bordered w-full max-w-xs">
                    {
                        services.map(service =><option
                        key={service._id} value={service.name}>{service.name}</option> )
                    }
                </select>
                
                <label className="label">
                    {errors.specialty?.type === 'required' && <span className="label-text-alt text-red-500">{errors.specialty.message}</span>}
                    {errors.specialty?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.specialty.message}</span>}
                </label>

                <label className="label">
                    <span className="label-text">Photo</span>
                </label>
                <input  {...register("image", {
                    required: {
                        value: true,
                        message: "Image is required"
                    }
                })} type="file" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
                <label className="label">
                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}

                </label>
                <input className='btn w-full max-w-xs ' type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddDoctor;