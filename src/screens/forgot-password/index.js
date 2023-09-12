import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import logo from '../../assets/svgs/logo-login.svg'
import { forgotPasswordRequest, forgotPasswordSuccess } from "../../redux/reducers/forgotPasswordSlice";

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
   
});

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const {loading,response,error}=useSelector((state)=>state.forgetPassword)
    const { register, reset,handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (response?.success) {
            toast(response?.message)
            dispatch(forgotPasswordSuccess(null))
            reset();
        }
        if(error?.success==false){
            toast(error?.message)
        }
    }, [response,error,dispatch])

    const onSubmit = (data) => {
        dispatch(forgotPasswordRequest(data));
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
                                <div className="input-field email">
                                    <label htmlFor="Email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email address"
                                        id="email"
                                        {...register("email")}
                                    />
                                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                </div>
                            
                                <button type="submit" disabled={loading} className="btn btn-block btn-primary w-100">
                                    {loading ? 'Logging in...' : 'Forgot Password'}
                                </button> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword;