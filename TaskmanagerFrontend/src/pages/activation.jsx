import {useEffect} from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import accountImg from '../assets/images/Account.png'
import { activate, getState } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

function Activation() {

    let [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const token = searchParams.get('token');
    console.log('id: ', id)
    console.log('token: ', token)
    // const navigate = useNavigate()
    
    const dispatch = useDispatch()

    const {IsOk, status, message} = useSelector(getState)

    // const goToLogin = () => navigate("/security/login")

    useEffect(() => {
        if (id && token) {
            dispatch(activate({userId: id, token}))
        }
    }, []);

  return (
    <div className="md:mx-3 md:p-4">
    <div className="flex flex-col justify-center mb-12 items-center text-center">
      <img src={accountImg} alt="Logo" width="100" height="100" className="align-text-top"/>
    </div>

    {
        (status==="loading") ? (<div>
            <div className="flex flex-row justify-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-orange-600 border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"> </div>
            </div>
            <div className=" font-semibold w-full p-4 text-sm rounded  ">
            <h1 className="text-3xl text-purple-950"> Activation en cours ... </h1>
            </div>
        </div>) : 
        (<div>
            {
                IsOk ? (
                    <div className="mb-4 rounded-lg p-3 text-base text-success-700 text-center bg-green-200" role="alert">
                    {message}
                    </div>
                ): (
                    <div className="mb-4 rounded-lg p-3 text-base text-success-700 text-center bg-red-300 text-black" role="alert">
                    {message}
                    </div>
                )
            }
           
        </div>)
    }

    <div className="flex items-center justify-center mt-12">
        <Link to="/security/login" className="font-semibold mt-3 text-indigo-600 hover:text-indigo-500">Retour au login</Link>
        {/* <a href="#!" onClick={goToLogin} className="font-semibold text-indigo-600 hover:text-indigo-500">Retour au login</a> */}
    </div>
   
  </div>
  )
}

export default Activation