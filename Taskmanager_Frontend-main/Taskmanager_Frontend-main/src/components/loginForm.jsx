import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { isFormInvalid } from '../utils/isFormInvalide';
import { useDispatch, useSelector } from 'react-redux'
import { authenticate, getState } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';


function LoginForm() {
    const [showPwd, setShowPwd] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm()  
    const navigate = useNavigate()  
    const dispatch = useDispatch()

    const {status, isAuthenticated} = useSelector(getState)

    // const handleClick = () => navigate('/security/register');

    const onHandleSubmit  = (data) => {
      dispatch(authenticate(data))
    };

    useEffect(() => {
      if (status === 'success' && isAuthenticated) {
        navigate("/home")
      }
    }, [status, isAuthenticated]);

    useEffect(() => {
      if (isFormInvalid(errors)) {
        document.getElementById('loginSubmit').classList.add(["hover:cursor-not-allowed"])
      } else {
        document.getElementById('loginSubmit').classList.remove(["hover:cursor-not-allowed"])
      }
    })

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="flex flex-col justify-center items-center gap-6 w-full mt-5">
        <div className="relative w-full  h-10">
            <input
            className="form-control peer w-11/12 h-full 
            text-blue-gray-700 font-sans font-normal 
            outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 
            disabled:border-0 transition-all placeholder-shown:border 
            placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border 
            focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] 
            border-blue-gray-200 focus:border-gray-900"
            type="text"
            name="email"
            {...register("email", {
              required: "l'Email est obligatoire!",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "l'Email est invalide"
              } 
            })}
            placeholder=" " />
            {errors.email && errors.email.type === "required" && (
                <p className="text-xs  text-red-500">{errors.email.message}</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
            <label
            className="flex w-11/12 h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            Email
            </label>
        </div>
        <div className="relative w-full h-11 ">
                
                <input
                className="form-control w-11/12 h-full 
                px-3 py-3 font-sans text-sm font-normal transition-all 
                border rounded-md peer text-blue-gray-700 outline 
                outline-0 focus:outline-0 disabled:bg-blue-gray-50 
                disabled:border-0 placeholder-shown:border 
                placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 
                focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                type={showPwd ? "text" : "password"}
                name="password"
                {...register("password", {
                  required: "le mot de passe obligatoire.",
                  minLength: {
                    value: 6,
                    message: 'le mot de passe doit comporter au moins 6 caracteres!!'
                  }
                })}
                placeholder=" " />
                <button type='button' onClick={()=> setShowPwd(!showPwd)}>
                  <i className={`fa icon ml-2 ${!showPwd ? "fa-eye": "fa-eye-slash"} `} ></i>
                </button>

                {errors.password && errors.password.type === "required" && (
                <p className="text-xs text-red-500"> {errors.password.message} </p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-xs text-red-500"> {errors.password.message} </p>
                )}
                <label
                className="flex w-11/12 h-full select-none pointer-events-none 
                absolute left-0 font-normal !overflow-visible truncate 
                peer-placeholder-shown:text-blue-gray-500 leading-tight 
                peer-focus:leading-tight peer-disabled:text-transparent 
                peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 
                peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] 
                before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 
                peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t 
                peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none 
                before:transition-all peer-disabled:before:border-transparent after:content[' '] 
                after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] 
                after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t
                 peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none 
                 after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1]
                  text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200
                  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Password
                </label>
                
          </div>
        </div>


       
        <div className="form-control pt-5 flex flex-row justify-between">
            <button 
                type="submit"  
                id='loginSubmit'
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
            Connection
          </button>
          <Link to="/security/register" className="font-semibold mt-3 text-indigo-600 hover:text-indigo-500">{"je crée mon compte"}</Link>
          {/* <a href="#!" onClick={handleClick} className="font-semibold mt-3 text-indigo-600 hover:text-indigo-500">
              je crée mon compte
          </a> */}
         
        </div>
      </form>
    </div>
  )
}

export default LoginForm
