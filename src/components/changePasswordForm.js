import React, { useEffect,useState} from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch ,useSelector} from 'react-redux';
import { updatePasswordRequest, updatePasswordSuccess } from '../redux/reducers/passwordSlice';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const schema = yup.object().shape({
    newPassword: yup.string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    });
    
    const {loading,response}=useSelector((state)=>state.password);
     const [showNewPassword,setShowNewPassword]=useState(false);
     const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
      resolver: yupResolver(schema),
    });

    useEffect(() => {
      if(response?.success){
          toast(response?.message);
          dispatch(updatePasswordSuccess(null));
          navigate("/");
      }
      else {
          toast(response?.message);
          dispatch(updatePasswordSuccess(null));}

    }, [response,navigate, dispatch]);

    const onSubmit = (data) => {
      dispatch(updatePasswordRequest(data));
    };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 96px)' }} className='add-form-main'>
    <div className='card-wrap'>
    <h1 className="h3 mb-5" style={{textAlign:'center'}}>Update Password</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <div className="mb-4">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <div className='position-relative'>
                <input
                // type="password"
                  type={showNewPassword ? "text" : "password"} 
                  className="form-control"
                  id="newPassword"
                  {...register('newPassword')}
                />
                 
                    <i className={`fa ${showNewPassword  ? 'fa-eye-slash' : 'fa-eye'}` }   style={{ cursor: 'pointer', position: 'absolute', right: '16px', top: '20px' }}
                    onMouseDown={() => setShowNewPassword(true)}
                    onMouseUp={() => setShowNewPassword(false)}  
                    onMouseOut={() => setShowNewPassword(false)}  />
                  </div>
                 
            {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className='position-relative'>
            <input
              //type="password"
              type={showConfirmPassword ? "text" : "password"} 
              className="form-control"
              id="confirmPassword"
              {...register('confirmPassword')}
            />
           
            <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}` }   style={{ cursor: 'pointer', position: 'absolute', right: '16px', top: '20px' }}
                    onMouseDown={() => setShowConfirmPassword(true)}
                    onMouseUp={() => setShowConfirmPassword(false)}  
                    onMouseOut={() => setShowConfirmPassword(false)}  />
                  </div>
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
          </div>
        </>
        <div className='update-button'>
          <button  type="submit" className="add-btn-custom mt-3">{loading ? 'loading...' : 'Update'} </button>
        </div>
    </form>
    </div>
    </div>
  );
};

export default ChangePasswordForm;
