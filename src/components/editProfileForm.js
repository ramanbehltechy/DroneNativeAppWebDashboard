import React, {useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updatedUserProfileRequest, updatedUserProfileSuccess } from '../redux/reducers/userSlice';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfileForm = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u)
    const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().trim().required('Email is required').email('Invalid email address').matches(emailRegex,"Invalid email"),
  });
  const {user,loading}=useSelector((state)=>state.user)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  
  useEffect(()=>{
    const getUserProfileData= localStorage.getItem("item");
    if(getUserProfileData){
       const parsedProfileData=JSON.parse(getUserProfileData)
        setValue('name',parsedProfileData.userData.name)
        setValue('email',parsedProfileData.userData.email)
    }
  },[])

  useEffect(() => {
    if(user?.success){
        toast(user?.message);
        dispatch(updatedUserProfileSuccess(null));
        navigate("/");
     }
     else {
        toast(user?.message);
        dispatch(updatedUserProfileSuccess(null));}

}, [user,navigate, dispatch]);


  const onSubmit = (data) => {
    dispatch(updatedUserProfileRequest(data));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 96px)' }} className='add-form-main'>
    <div className='card-wrap'>
    <h1 className="h3 mb-5" style={{textAlign:'center'}}>My Profile</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          {...register('name')}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          {...register('email')}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>
      <div className='update-button'>
      <button  type="submit" className="add-btn-custom mt-3">{(loading ? 'loading...' : 'Update') }</button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default EditProfileForm;
