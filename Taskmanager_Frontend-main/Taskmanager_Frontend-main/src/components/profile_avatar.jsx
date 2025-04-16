import { useRef } from 'react'
import profileImg from '../assets/images/profile2.jpeg'
import { useDispatch, useSelector } from 'react-redux';
import { connectedUser, getState, setProfileImage } from '../redux/slices/authSlice';


function Profile_avatar() {

    const user = useSelector(connectedUser)
    const {profileImage} = useSelector(getState)
    const dispatch = useDispatch()

    const dblClick = () => {
        imgInput.current.click()
     }
    
   const imgInput = useRef()

   const handleSubmit = (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('userId', user._id)
        dispatch(setProfileImage(data))
    }

  return (
    <div>
        <img 
        onDoubleClick={dblClick}
        className="w-32 h-32 border-2 border-blue-700 rounded-full 
        hover:border-4 hover:border-blue-400 hover:cursor-pointer" 
        src={ profileImage ? profileImage : profileImg}  alt="Extra large avatar" />
         <form onSubmit={handleSubmit} method="post" className='invisible' encType="multipart/form-data">
            <input ref={imgInput} type="file" onChange={handleSubmit} name="avatar" />
          </form>
    </div>
  )
}

export default Profile_avatar