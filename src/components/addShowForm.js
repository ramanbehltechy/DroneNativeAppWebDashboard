import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { postShowRequest, postShowSuccess } from '../redux/reducers/showSlice';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Autocomplete } from '@react-google-maps/api';
import { timeZoneRequest } from '../redux/reducers/timeZoneSlice';

const AddShowForm = ({ setMapData }) => {
    const schema = yup.object({
        address: yup.string().required('Address is required'),
        latitude: yup.number().typeError('Latitude must be a valid number').min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90').required('Latitude is required'),
        longitude: yup.number().typeError('Longitude must be a valid number').min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180').required('Longitude is required'),
        showTitle: yup.string().required('Show Title is required'),
        description: yup.string().required('Descripion is required'),
        date: yup.string().required('Date is required'),
        startTime: yup.string().required('Start Time is required'),
        timezone: yup.string().required('Time zone is required'),
        radius: yup.number().typeError('Radius must be a valid number').min(1, 'Minimum raduis is 1').max(10, 'Maximum raduis is 10').positive('Radius must be a positive number').required('Radius is required'),
        preShowFile: yup.mixed().nullable()
            .test('fileType', 'Only mp3 files are allowed', (value) => {
                if (value && value.type !== 'audio/mpeg') {
                    return false;
                }
                return true;
            }),
        file: yup.mixed().required('MP3 file is required')
            .test('fileType', 'Only mp3 files are allowed', (value) => {
                if (value) {
                    return value.type === 'audio/mpeg';
                }
                return false;
            }),
        postShowFile: yup.mixed().nullable()
            .test('fileType', 'Only mp3 files are allowed', (value) => {
                if (value && value.type !== 'audio/mpeg') {
                    return false;
                }
                return true;
            })
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { postShow: { loading, res }, timeZone: { res: timeZoneRes, error: timeZoneError } } = useSelector((state) => state);
    const { register, setValue, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schema)
    });
    const [autocomplete, setAutocomplete] = useState(null);
    const [formStep, setFormStep] = useState(0);
    const [formData, setFormData] = useState({
        address: "",
        latitude: "",
        longitude: "",
        showTitle: "",
        description: "",
        date: "",
        startTime: "",
        timezone: "",
        radius: 10,
        preShowFile: [],
        postShowFile: [],
        file: []
    });

    useEffect(() => {
        if (res?.success) {
            toast(res?.message);
            dispatch(postShowSuccess(null));
            navigate("/");
        } else {
            toast(res?.message);
            dispatch(postShowSuccess(null));

        }
    }, [res, navigate, dispatch]);

    useEffect(() => {
        if (timeZoneRes?.status === 200) {
            setFormData(prevalue => ({ ...prevalue, timezone: timeZoneRes?.data?.timeZoneId }));
            setValue("timezone", timeZoneRes?.data?.timeZoneId);
            trigger("timezone");
        }
        else if(timeZoneError){
            toast("There is some error please try again");
        }
    }, [timeZoneRes, timeZoneError, dispatch,setValue, trigger]);


    useEffect(() => {
        const formDataLatitude = String(formData.latitude).trim();
        const formDataLongitude = String(formData.longitude).trim();
        if (formDataLatitude.length <= 0 || formDataLongitude.length <= 0) {
            setFormData(prevalue => ({ ...prevalue, address: '' }))
            setValue("address", "");
            trigger("address");
        }
        else {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat: Number(formDataLatitude), lng: Number(formDataLongitude) } }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    setFormData(prevalue => ({ ...prevalue, address: results[0].formatted_address }));
                    setValue("address", results[0].formatted_address);
                    trigger("address");
                } else {
                    setFormData(prevalue => ({ ...prevalue, address: '' }))
                    setValue("address", "");
                    trigger("address");
                }
            });
        }
    }, [formData.latitude, formData.longitude, setValue, trigger]);

    const updateFormData = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file' || name === 'preShowFile' || name === 'postShowFile') {
            if (files && files.length > 0) {
                setFormData((prevValue) => ({ ...prevValue, [name]: files[0] }));
                setValue(name, files[0]);
                trigger(name);
            } else {
                setValue(name, null);
            }
        } else {
            const nameArr = ['address', 'latitude', 'longitude'];
            setFormData(prevalue => ({ ...prevalue, [name]: value }))
            if (nameArr.includes(name) && formStep !== 0) { setFormStep(0) }
            setValue(name, value);
            trigger(name);
        }
    }

    const onSubmit = (data, e) => {
        const formData = new FormData();
        for (const i in data) {
            formData.append(i, data[i]);
        }
        dispatch(postShowRequest(formData));
    }

    const handleValidation = async () => {
        try {
            const validateData = await trigger(["address", 'latitude', 'longitude']);
            if (validateData) {
                setMapData({ address: formData.address, longitude: Number(formData.longitude), latitude: Number(formData.latitude) });
                dispatch(timeZoneRequest({ latitude: formData.latitude, longitude: formData.longitude }));
                setFormStep(1);
            }
        } catch (err) {
            console.error('Validation failed', err);
        }
    };


    const locationChange = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place && place.geometry) {
                setFormData(prevalue => ({ ...prevalue, address: place.formatted_address, longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() }))
                setValue("address", place.formatted_address);
                setValue("longitude", place.geometry.location.lng());
                setValue("latitude", place.geometry.location.lat());
                trigger("address");
                trigger("longitude");
                trigger("latitude");
                setFormStep(0)
            }
        }
    };


    return (
        <form className="add-form-main" onSubmit={handleSubmit(onSubmit)}>
            {(formStep === 0 || formStep === 1) &&
                <>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <Autocomplete onLoad={(auto) => setAutocomplete(auto)} onPlaceChanged={locationChange}>
                            <input type="text" className="form-control" id="address" placeholder="Enter Address" name='address' {...register("address")} value={formData.address} onChange={updateFormData} />
                        </Autocomplete>
                        {errors.address && <p className='text-danger'>{errors.address.message}</p>}
                    </div>
                    <div className="mb-3 position-relative else-info text-center my-4">
                        <hr className="position-absolute" />
                        <span>OR</span>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="latitude" className="form-label">Latitude</label>
                        <input type="text" className="form-control" id="latitude" placeholder="Enter Latitude" name='latitude' {...register("latitude")} value={formData.latitude} onChange={updateFormData} />
                        {errors.latitude && <p className='text-danger'>{errors.latitude.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="longitude" className="form-label">Longitude</label>
                        <input type="text" className="form-control" id="longitude" placeholder="Enter Longitude" name='longitude' {...register("longitude")} value={formData.longitude} onChange={updateFormData} />
                        {errors.longitude && <p className='text-danger'>{errors.longitude.message}</p>}
                    </div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <Link to="/" className="btn btn-secondary sec-btn-custom">
                                Back
                            </Link>
                        </div>
                        <div className="col-6 text-end">
                            <button onClick={formStep === 0 ? handleValidation : () => { setFormStep(2) }} type="button" className="btn add-btn-custom" >
                                {formStep === 0 ? "Get Address" : "next"}
                            </button>
                        </div>
                    </div>
                </>
            }

            {formStep === 2 &&
                <>
                    <div className="mb-3">
                        <label htmlFor="showTitle" className="form-label">Show Title</label>
                        <input type="text" className="form-control" id="showTitle" placeholder="Enter ShowTitle" name='showTitle' {...register("showTitle")} value={formData.showTitle} onChange={updateFormData} />
                        {errors.showTitle && <p className='text-danger'>{errors.showTitle.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" placeholder="Enter Descripion" name='description' {...register("description")} value={formData.description} onChange={updateFormData} />
                        {errors.description && <p className='text-danger'>{errors.description.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" placeholder="Enter Date" name='date' {...register("date")} value={formData.date} onChange={updateFormData} />
                        {errors.date && <p className='text-danger'>{errors.date.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startTime" className="form-label">Start Time</label>
                        <input type="time" className="form-control" id="startTime" placeholder="Enter StartTime" name='startTime' {...register("startTime")} value={formData.startTime} onChange={updateFormData} />
                        {errors.startTime && <p className='text-danger'>{errors.startTime.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="radius" className="form-label">Radius (1-10 miles)</label>
                        <input type="number" className="form-control" id="radius" placeholder="Enter radius" name='radius' {...register("radius")} value={formData.radius} onChange={updateFormData} />
                        {errors.radius && <p className='text-danger'>{errors.radius.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="preShowFile" className="form-label">Pre show mp3 file</label>
                        <input type="file" className="form-control" id="preShowFile" placeholder="Enter Longitude" name='preShowFile' onChange={updateFormData} />
                        {errors.preShowFile && <p className='text-danger'>{errors.preShowFile.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Upload mp3</label>
                        <input type="file" className="form-control" id="file" placeholder="Enter Longitude" name='file' onChange={updateFormData} />
                        {errors.file && <p className='text-danger'>{errors.file.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="postShowFile" className="form-label">Post show Upload mp3</label>
                        <input type="file" className="form-control" id="postShowFile" placeholder="Enter Longitude" name='postShowFile' onChange={updateFormData} />
                        {errors.postShowFile && <p className='text-danger'>{errors.postShowFile.message}</p>}
                    </div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <button onClick={() => { setFormStep(0) }} className="btn btn-secondary sec-btn-custom">
                                Back
                            </button>
                        </div>
                        <div className="col-6 text-end">
                            <button type="submit" disabled={loading} className="btn add-btn-custom" >
                                {loading ? 'loading...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </>
            }
        </form>
    )
}
export default AddShowForm;