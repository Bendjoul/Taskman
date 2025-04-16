import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getState, register as createAccount, setStatusToIdle } from '../redux/slices/authSlice';
import Spinner from './spinner';
import { useNavigate, Link } from 'react-router-dom';




function RegisterForm() {

    const [showPwd, setShowPwd] = useState(false)

     const {register, handleSubmit, formState: {errors}, getValues} = useForm()

     const {status, message} = useSelector(getState)
    
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const backToLogin = () => navigate('/security/login');
    
    const onHandleSubmit = (data) => {
      dispatch(createAccount(data))
    };

    useEffect(() => {
      if (['success', 'failed'].includes(status)) {
        setTimeout(() => {
          dispatch(setStatusToIdle())
        }, 6000);
      }
      // navigate("/security/login")
      
    }, [status]);  

  return (
    <div className="w-full">
      {
        ((status === 'failed') && message) && (
        <div className="bg-red-400 text-dark-800 p-4 text-sm rounded-full border border-red-500">
          { message }
        </div>)
      }
       {
        ((status === 'success') && message) && (
        <div className="bg-green-900 text-dark-800 p-4 text-sm text-white rounded-full border border-green-700">
          { message }
        </div>)
      }
      {
        (status === 'loading') && ( <Spinner/> )
      }
      <form onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="flex flex-col justify-center items-center gap-6 w-full mt-5">
      <div className="relative w-full  h-10">
            <input
            type="text"
            name="email"
            {...register("email", {
              required: "Email obligatore",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email invalide"
              }
            })}
            className="form-control w-11/12 h-full 
            px-3 py-3 font-sans text-sm font-normal transition-all 
            border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
            placeholder=" " />
            {errors.email && errors.email.type === "required" && (
                <p className="text-xs  text-red-500">{errors.email.message}</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
                <p className="text-xs  text-red-500">{errors.email.message}</p>
            )}
            <label
            className="flex w-11/12 h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            Email
            </label>
        </div>
        <div className="relative w-full  h-10">
            <input
            type="text"
            name="name"
            {...register("name", {
              required: "Veuillez entrer votre nom",
              maxLength: {
                value: 15,
                message: "Le nom doit tenir sur 15 caracteres maximum." 
              }
            })}
            className="form-control w-11/12 h-full 
            px-3 py-3 font-sans text-sm font-normal transition-all 
            border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
            placeholder=" " />
              {errors.name && errors.name.type === "required" && (
                <p className="text-xs  text-red-500">{errors.name.message}</p>
            )}
            {errors.name && errors.name.type === "maxLength" && (
                <p className="text-xs  text-red-500">{errors.name.message}</p>
            )}
            <label
            className="flex w-11/12 h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            Name
            </label>
        </div>
        <div className="relative w-full  h-11">
            <input
            type={showPwd ? "text" : "password"}
            name="password"
            {...register("password", {
              required: "entrez votre mot de passe",
              minLength: {
                value: 6,
                message: "le mot de passe doit avoir 6 caractères au moins"
              },
              maxLength: {
                value: 15,
                message: "le mot de passe doit avoir 15 caractères au plus"
              }
            })}
            className="form-control w-11/12 h-full 
            px-3 py-3 font-sans text-sm font-normal transition-all 
            border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
            placeholder=" " />
             <button type='button' onClick={()=> setShowPwd(!showPwd)}>
                  <i className={`fa icon ml-2 ${!showPwd ? "fa-eye": "fa-eye-slash"} `} ></i>
              </button>
            {errors.password && errors.password.type === "required" && (
                <p className="text-xs  text-red-500">{errors.password.message}</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
                <p className="text-xs  text-red-500">{errors.password.message}</p>
            )}
             {errors.password && errors.password.type === "maxLength" && (
                <p className="text-xs  text-red-500">{errors.password.message}</p>
            )}
            <label
            className="flex w-11/12 h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            Password
            </label>
        </div>
        <div className="relative w-full  h-11">
            <input
            type={showPwd ? "text" : "password"}
            name="cpassword"
            {...register("cpassword", {
              required: "Confirmer le mot de passe!",
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Les mots de passe doivent correspondre!";
              }  
              })
            }
            className="form-control w-11/12 h-full 
            px-3 py-3 font-sans text-sm font-normal transition-all 
            border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
            placeholder=" " />
            <button type='button' onClick={()=> setShowPwd(!showPwd)}>
                  <i className={`fa icon ml-2 ${!showPwd ? "fa-eye": "fa-eye-slash"} `} ></i>
            </button>
            {errors.cpassword && errors.cpassword.type === "required" && (
                <p className="text-xs  text-red-500">{errors.cpassword.message}</p>
            )}
            {errors.cpassword && errors.cpassword.type === "validate" && (
                <p className="text-xs  text-red-500">{errors.cpassword.message}</p>
            )}
            <label
            className="flex w-11/12 h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            confirmation password
            </label>
        </div>
        </div>


       
        <div className="form-control pt-6 flex flex-row justify-between">
            <button 
                type="submit"  
                className="bg-gray-800, mb-3 border border-green-700
                inline-block w-100 rounded px-6 pb-2 pt-2.5 
                text-xs font-medium  leading-normal 
                shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] 
                transition duration-150 ease-in-out 
                hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] 
                focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] 
                focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                data-te-ripple-init data-te-ripple-color="light"
            >
          
            Register
        </button>
        <Link to="/security/login" className="font-semibold mt-3 text-indigo-600 hover:text-indigo-500">Retour au login</Link>
        {/* <a href="#!" onClick={backToLogin} className="font-semibold mt-2 text-indigo-600 hover:text-indigo-500">
              Retour au login
        </a> */}
        </div>
      </form>
    </div>
  )
}

export default RegisterForm