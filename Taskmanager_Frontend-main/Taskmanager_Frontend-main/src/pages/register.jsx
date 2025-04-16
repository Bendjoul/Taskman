import accountImg from '../assets/images/Account.png'
import RegisterForm from '../components/registerForm'

function Register() {
  return (
    <div className="md:mx-3 md:p-4 ">
        <div className="flex flex-col justify-center items-center text-center">
          <img src={accountImg} alt="Logo" width="100" height="100" className="align-text-top" />
          <h4  className=" mt-1 pb-1 text-xl font-semibold {connectionError ? 'mb-4': 'mb-12'} ">
            Creation de compte
          </h4>
        </div>
        <RegisterForm />
    </div>
  )
}

export default Register