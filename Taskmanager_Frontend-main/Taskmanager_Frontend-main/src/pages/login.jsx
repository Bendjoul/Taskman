import {useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
import login from '../assets/images/login.png'
import LoginForm from '../components/loginForm'
import { useDispatch, useSelector } from 'react-redux'
import { getState, setStatusToIdle } from '../redux/slices/authSlice'
import Spinner from '../components/spinner'


function Login() {

  // let navigate = useNavigate()

  // const handleClick = () => navigate('/security/register');

  const {status, message} = useSelector(getState)

  const dispatch = useDispatch()

  useEffect(() => {
    if (['success', 'failed'].includes(status)) {
      setTimeout(() => {
        dispatch(setStatusToIdle())
      }, 4000);
    }
    
  }, [status]);


  return (
    <div className="md:mx-3 md:p-4 ">
        <div className="flex flex-col justify-center items-center text-center">
          <img src={login} alt="Logo" width="100" height="100" className="align-text-top" />
          <h4  className=" mt-1 pb-1 text-xl font-semibold {connectionError ? 'mb-4': 'mb-12'} ">
            Authentification
          </h4>
         {
          (status === 'failed' && message) && (
          <div className="bg-red-400 text-dark-800 p-2 text-sm rounded-full border border-red-500 ">
            { message }
          </div>)
         }
        </div>
         {
          (status === 'loading') && ( <Spinner /> )
         }
        <LoginForm />
    </div>
  )
}


export default Login