import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
const Register = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [sendEmailVerification, sending, verifyError] = useSendEmailVerification(
        auth
    );
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [token] = useToken(user || gUser);


    if (loading || gLoading) {
        return <Loading></Loading>
    }
    let signInErrorMessage;
    if (error || gError) {
        signInErrorMessage = <p className='text-red-500'>{error?.message || gError?.message}</p>
    }

    if (token) {
        navigate('/appointment')
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await sendEmailVerification();
        await updateProfile({ displayName: data.name });
        console.log('update done');
        // navigate('/appointment')
    };
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input  {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            }
                        })} type="name" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}

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
                            <span className="label-text">Password</span>
                        </label>
                        <input  {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            minLength: {
                                value: 6,
                                message: 'Must be value 6' // 
                            }
                        })} type="password" placeholder="Your Password" className="input input-bordered w-full max-w-xs" />
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>
                        {signInErrorMessage}
                        <input className='btn w-full max-w-xs ' type="submit" value="Register" />
                    </form>
                    <p>Already have an account? <Link className='text-primary' to="/login">Please Login</Link></p>
                    <div className="divider">or</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;