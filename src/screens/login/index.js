import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from "../../redux/reducers/authSlice";
import { toast } from "react-toastify";

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loading, isLoggedIn, res } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
        if (!res?.success) {
            toast(res?.message)
        }
    }, [res, isLoggedIn, navigate]);

    const onSubmit = (data) => {
        dispatch(loginRequest(data));
    };
    // if (false) {
    //     return (
    //         <div className="d-flex align-items-center min-vh-100">
    //             <form className="add-form-main w-50 m-auto" onSubmit={handleSubmit(onSubmit)}>
    //                 <div className="mb-4">
    //                     <label htmlFor="email" className="form-label">
    //                         Email
    //                     </label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         id="email"
    //                         placeholder="Enter Email"
    //                         {...register("email")}
    //                     />
    //                     {errors.email && <p className='text-danger'>{errors.email.message}</p>}
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="password" className="form-label">
    //                         Password
    //                     </label>
    //                     <input
    //                         type="password"
    //                         className="form-control"
    //                         id="password"
    //                         placeholder="Enter Password"
    //                         {...register("password")}
    //                     />
    //                     {errors.password && <p className='text-danger'>{errors.password.message}</p>}
    //                 </div>
    //                 <div className="row mt-5">
    //                     <div className="col-6">
    //                         <button type="submit" disabled={loading} className="btn btn-secondary sec-btn-custom">
    //                             {loading ? 'Logging in...' : 'Login'}
    //                         </button>
    //                     </div>
    //                 </div>
    //             </form>
    //         </div>
    //     )
    // }
    return (
        <div className="d-flex align-items-center main-wrapper">
            <div className="bg order-1 order-md-2">
                <img src={require("../../assets/img/image-1.png")} alt="" className="img img-1" />
                <img src={require("../../assets/img/image 2.png")} alt="" className="img img-2" />
                <img src={require("../../assets/img/image 3.png")} alt="" className="img img-3" />
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
                                <img src={require("../../assets/img/logo.png")} alt="" />
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
                                <div className="input-field">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        id="password"
                                        {...register("password")}
                                    />
                                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                </div>
                                {/* <div className="d-flex align-items-center">
                                    <span className="ml-auto">
                                        <a href="#" className="forgot-pass">
                                            Forgot Password?
                                        </a>
                                    </span>
                                </div> */}
                                <button type="submit" disabled={loading} className="btn btn-block btn-primary w-100">
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )


}
export default Login;