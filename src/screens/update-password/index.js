import { useEffect,useState } from "react";
import { useNavigate,useLocation  } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import logo from '../../assets/svgs/logo-login.svg'
import { resetPasswordRequest, resetPasswordSuccess } from "../../redux/reducers/forgotPasswordSlice";

const schema = yup.object().shape({
    newPassword: yup.string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    });

const  UpdatePassword= () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loading, response,error } = useSelector((state) => state.resetPassword);
    const [showNewPassword,setShowNewPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const { register, reset,handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const resetCode = queryParams.get('code');
    useEffect(() => {
       
        if (response?.success) {
            toast(response?.message)
            dispatch(resetPasswordSuccess(null))
           
            navigate("/Login");
        }
        if(error?.success==false){
            toast(error?.message)
            reset();

        }
    }, [response, error, navigate,dispatch])

    const onSubmit = (data) => {
        dispatch(resetPasswordRequest({resetCode,data}));
    };
    return (
        <div className="d-flex align-items-center main-wrapper">
            <div className="bg order-1 order-md-2">
                <img src={require("../../assets/img/login-image.png")} alt="" className="img img-1" />
                <div className="text">
                    <h1>Welcome back!</h1>
                    <p>Please fill up the required details to get in.</p>
                </div>
            </div>
            <div className="contents order-2 order-md-1" >
                <div className="container">
                    <div className="row align-items-center left-content">
                        <div className="col-md-9">
                            <div className="logo">
                                <img src={logo} alt="" />
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                          
                                <div className="input-field">
                                    <label htmlFor="newPassword">New Password</label>
                                    <div className='position-relative'>
                                    <input
                                       // type="password"
                                       type={showNewPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Enter your new password"
                                        id="newPassword"
                                        {...register("newPassword")}
                                    />
                                     <i className={`fa ${showNewPassword  ? 'fa-eye-slash' : 'fa-eye'}` }   style={{ cursor: 'pointer', position: 'absolute', right: '16px', top: '20px' }}
                                    onMouseDown={() => setShowNewPassword(true)}
                                    onMouseUp={() => setShowNewPassword(false)}  
                                    onMouseOut={() => setShowNewPassword(false)}  />
                                    </div>
                                    {errors.newPassword && <p className='text-danger'>{errors.newPassword.message}</p>}
                                </div>
                                <div className="input-field mt-3">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className='position-relative'>
                                    <input
                                        //type="password"
                                        type={showConfirmPassword ? "text" : "password"} 
                                        className="form-control"
                                        placeholder="Enter your confirm Password"
                                        id="confirmPassword"
                                        {...register('confirmPassword')}
                                    />
                                     <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}` }   style={{ cursor: 'pointer', position: 'absolute', right: '16px', top: '20px' }}
                                            onMouseDown={() => setShowConfirmPassword(true)}
                                            onMouseUp={() => setShowConfirmPassword(false)}  
                                            onMouseOut={() => setShowConfirmPassword(false)}  />
                  </div>
                                   
                                    {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
                                </div>
                                
                                <button type="submit" disabled={loading} className="btn btn-block btn-primary w-100">
                                    {loading ? 'Loading.....' : 'Update Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdatePassword;