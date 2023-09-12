import { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearEditingItem, editUserRequest, postUserFailure, postUserRequest, postUserSuccess ,editUserSuccess, editUserFailure } from '../../redux/reducers/userSlice';
import { toast } from 'react-toastify';
const AddUser = () => {
    const { loading, user } = useSelector((state) => state.postuserReducer);
    const { editingItem } = useSelector((state) => state.editUserReducer);
    const edituserRes = useSelector((state)=>state.editSliceUserReducer)
    const [showNewPassword,setShowNewPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u)
    

    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        role: yup.string().required('Role is required'),
        email: yup.string().trim().required('Email is required').email('Invalid email address').matches(emailRegex,"Invalid email"),
        ...(!editingItem &&
            
         {password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')}),
         ...(!editingItem ?
        { confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match')}:{ confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')})
        ,
    });
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (user!=null && user?.success) {
            toast.success(user?.message);
            dispatch(postUserSuccess(null));
            dispatch(clearEditingItem(null))
            navigate("/user");
        }
        else if(user!=null && user?.success === false)  {
            toast.error(user?.message);
            dispatch(postUserFailure(null));
        }

        if (edituserRes?.response?.success) {
            toast.success(edituserRes?.response?.message);
            dispatch(editUserSuccess(null));
            dispatch(clearEditingItem(null))
            navigate("/user");
        }
        else if (edituserRes?.response?.success === false) {
            toast.error(edituserRes?.response?.message);
            dispatch(editUserFailure(null));
        }


    }, [navigate, dispatch, user?.success, user?.message, editingItem, edituserRes?.response?.success, edituserRes?.response?.message, user]);

    useEffect(() => {
        if (editingItem != null) {
            setValue('name', editingItem?.name);
            setValue('email', editingItem?.email)
            setValue('role',editingItem?.role)
            // setValue('password', editingItem?.password)
            // setValue('confirmPassword', editingItem?.password)
        }
    }, [editingItem, setValue])

    const onSubmit = (data) => {
        if (editingItem != null) {
            dispatch(editUserRequest({ id: editingItem?._id, formData: data }))
        }
        else {
            dispatch(postUserRequest(data))
        }
    };
    return (
        <>
            <main className="col-sm-12 col-md-12 ms-sm-auto col-lg-10 px-md-4">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 96px)' }} className='add-form-main'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 96px)' }} className='add-form-main'>
                        <div className='card-wrap'>
                            <h1 className="h3 mb-5" style={{ textAlign: 'center' }}>
                                {editingItem != null ? "Update user" : "Add User"}</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter name"
                                        {...register("name")}
                                    />
                                    {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Email"
                                        {...register("email")}
                                    />
                                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="role" className="form-label">
                                        Role
                                    </label>
                                    <select name='role' className="form-select"
                                        id="role"
                                        {...register('role')}>
                                        <option className='d-none'></option>
                                        <option value="user">User</option>
                                        {/* <option value="admin">Admin</option> */}
                                    </select>
                                    {errors.role && <p className='text-danger'>{errors.role.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className='position-relative'>
                                    <input
                                       // type="password"
                                       type={showNewPassword ? "text" : "password"} 
                                        className="form-control"
                                        placeholder="Enter Password"
                                        id="password"
                                        {...register('password')}
                                    />
                                    <i className={`fa ${showNewPassword  ? 'fa-eye-slash' : 'fa-eye'}` }   style={{ cursor: 'pointer', position: 'absolute', right: '16px', top: '20px' }}
                    onMouseDown={() => setShowNewPassword(true)}
                    onMouseUp={() => setShowNewPassword(false)}  
                    onMouseOut={() => setShowNewPassword(false)}  />
                  </div>
                                    
                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <div className='position-relative'>
                                    <input
                                       // type="password"
                                       type={showConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Enter confirm Password"
                                        {...register('confirmPassword')}
                                    />
                                     <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}` }   style={{ cursor: 'pointer', position: 'absolute', right: '16px', top: '20px' }}
                    onMouseDown={() => setShowConfirmPassword(true)}
                    onMouseUp={() => setShowConfirmPassword(false)}  
                    onMouseOut={() => setShowConfirmPassword(false)}  />
                  </div>
                                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                                </div>
                                <div className="row mt-5">
                                    <div className="col-6">
                                        <button onClick={() => { dispatch(clearEditingItem());dispatch(postUserFailure(null));  navigate(-1); }} className="btn btn-secondary sec-btn-custom">
                                            Back
                                        </button>
                                    </div>
                                    <div className="col-6 text-end">
                                        <button type="submit" disabled={loading} className="btn add-btn-custom" >
                                            {editingItem != null ? "Update" : "Save"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </main>
        </>
    );
}

export default AddUser;