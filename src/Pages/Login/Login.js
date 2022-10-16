import React, { useEffect, useRef } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdatePassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const emailChange = useRef('');
    
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(
        auth
      );
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const from = location.state?.from?.pathname || "/";

    if (user || gUser) {
        navigate('/appointment')
    }

   useEffect(()=>{
    if(loading || gLoading){
        return <Loading></Loading>
    }
   },[user , gUser,from,navigate])

    let signInErrorMessage;
    if(error || gError){
        signInErrorMessage= <p className='text-red-500'>{error?.message || gError?.message}</p>
    }
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
        navigate(from, { replace: true });
    };
  //Forget Password
  const resetPassword =async ()=>{
    const email=emailChange.current.value;
    console.log(email)
    await sendPasswordResetEmail(email);
    alert('Sent email');
  }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input  {...register("email", {
                            required:{
                                value:true,
                                message:"Email is required"
                            },
                            pattern: {
                                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                message: 'Provide a valid email' // 
                            }
                        })}   type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs"  />
                        <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            
                        </label>

                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input  {...register("password", {
                            required:{
                                value:true,
                                message:"Password is required"
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
                         <a class="link link-accent" onClick={resetPassword}>Forget password?</a>
                        <input className='btn w-full max-w-xs ' type="submit" value="login" />
                    </form>
                    <p>New to Doctors Portal: <Link className='text-primary' to="/register">Create a new Account:</Link></p>
                    <div className="divider">or</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue With Google</button>
                </div>
            </div>
        </div>

    );
};

export default Login;