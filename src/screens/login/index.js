import { useEffect ,useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from "../../redux/reducers/authSlice";
import { toast } from "react-toastify";
import logo from '../../assets/svgs/logo-login.svg'

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loading, isLoggedIn, res } = useSelector((state) => state.auth);
    const [showPassword,setShowPassword]=useState(false);
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
    }, [res, isLoggedIn, navigate])
    const onSubmit = (data) => {
        dispatch(loginRequest(data));
    };
    return (
        <div className="d-flex align-items-center main-wrapper">
            <div className="bg order-1 order-md-2">
                <img src={require("../../assets/img/login-image.png")} alt="" className="img img-1" />
                {/* <img src={require("../../assets/img/image 2.png")} alt="" className="img img-2" />
                <img src={require("../../assets/img/image 3.png")} alt="" className="img img-3" /> */}
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
                                <div className="input-field">
                                    <label htmlFor="password">Password</label>
                                    <div className='position-relative'>
                                    <input
                                     type={showPassword ? "text" : "password"} 
                                        //type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        id="password"
                                        {...register("password")}
                                    />
                                    <i className={`fa ${showPassword  ? 'fa-eye-slash' : 'fa-eye'}` }   style={{ cursor: 'pointer', position: 'absolute', right: '16px', top: '20px' }}
                                    onMouseDown={() => setShowPassword(true)}
                                    onMouseUp={() => setShowPassword(false)}  
                                    onMouseOut={() => setShowPassword(false)}  />
                                    </div>
                                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                </div>
                                <button type="submit" disabled={loading} className="btn btn-block btn-primary w-100">
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                                 <div className="d-flex align-items-center justify-content-center" >
                                      <NavLink to="/forget-password" className="forgot-pass mt-2">Forgot Password</NavLink>          
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;