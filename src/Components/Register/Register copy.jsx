// // src/Components/Register/Register.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationCircle, faCloudUploadAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { api } from '../../data/Api';
// import { LanguageContext } from '../../context/LanguageProvider.context';
// import lang from '../../assets/lang/language';
// import './Register.css';

// const Register = () => {
//     const { language } = useContext(LanguageContext);
//     const labels = lang[language];
//     const navigate = useNavigate();
//     const [step, setStep] = useState(2);

//     const initial = {
//         name: '', phone: '', ssn: '', email: '', password: '', confirmPassword: '', socialStatus: '', job: '', salary: '', nationality: '', subscriptionType: '', membershipType: '', hobby: '', healthStatus: '',
//         age: '', dob: '', gender: '', personalImage: null, ssnImage: null, medicalReport: null, salaryProof: null
//     };
//     const [data, setData] = useState(initial);
//     const [errors, setErrors] = useState({});
//     const [uploadProgress, setUploadProgress] = useState(0);

//     const lists = {
//         socialStatus: ['married', 'single', 'divorced', 'widowed', 'separated', 'engaged'],
//         job: ['professor', 'teaching assistant', 'teacher', 'full-time teacher', 'full-time teaching assistant', 'full-time professor', 'employee', 'student'],
//         nationality: ['Egyptian', 'Foreign'],
//         subscriptionType: ['yearly', 'monthly'],
//         membershipType: ['visitor member', 'Associate member', 'branch member', 'worker member', 'sports member', 'sessonal foreigner - yearly', 'sessonal foreigner -6 month', 'sessonal foreigner - monthly']
//     };

//     const handleChange = e => {
//         const { name, value, files } = e.target;
//         setData(prev => ({ ...prev, [name]: files ? files[0] : value }));
//         setErrors(prev => ({ ...prev, [name]: '' }));
//     };

//     // compute DOB, age, gender from Egyptian SSN
//     useEffect(() => {
//         const { ssn } = data;
//         // Egyptian SSN: 14 digits, first digit = century (2 for 1900s, 3 for 2000s)
//         if (/^[23][0-9]{13}$/.test(ssn)) {
//             const century = ssn.charAt(0) === '2' ? 1900 : 2000;
//             const year = century + parseInt(ssn.substr(1, 2), 10);
//             const month = parseInt(ssn.substr(3, 2), 10);
//             const day = parseInt(ssn.substr(5, 2), 10);
//             const birth = new Date(year, month - 1, day);
//             if (!isNaN(birth)) {
//                 const age = new Date().getFullYear() - birth.getFullYear();
//                 const mm = String(birth.getMonth() + 1).padStart(2, '0');
//                 const dd = String(birth.getDate()).padStart(2, '0');
//                 const dob = `${birth.getFullYear()}-${mm}-${dd}`;
//                 const gender = (parseInt(ssn.charAt(12), 10) % 2) ? 'Male' : 'Female';
//                 setData(prev => ({ ...prev, age, dob, gender }));
//             }
//         }
//     }, [data.ssn]);

//     // dynamic membership filter
//     const availableMemberships = () => {
//         if (data.nationality === 'Foreign') {
//             return lists.membershipType.filter(m => m.startsWith('sessonal foreigner'));
//         }
//         if (data.job !== 'student') {
//             return ['visitor member', 'Associate member', 'branch member', 'worker member', 'sports member'];
//         }
//         return lists.membershipType;
//     };

//     const validateStep1 = () => {
//         const errs = {};
//         if (data.name.trim().split(/\s+/).length < 4) errs.name = labels.errors.name;
//         if (!/^\+?[0-9]{10,15}$/.test(data.phone)) errs.phone = labels.errors.phone;
//         if (!/^[23][0-9]{13}$/.test(data.ssn)) errs.ssn = labels.errors.ssn;
//         if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) errs.email = labels.errors.email;
//         if (!data.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/)) errs.password = labels.errors.password;
//         if (data.password !== data.confirmPassword) errs.confirmPassword = labels.errors.confirmPassword;
//         if (!data.socialStatus) errs.socialStatus = labels.errors.socialStatus;
//         if (!data.job) errs.job = labels.errors.job;
//         if (data.job !== 'student' && (!data.salary || isNaN(parseFloat(data.salary)))) errs.salary = labels.errors.salary;
//         if (!data.nationality) errs.nationality = labels.errors.nationality;
//         if (!data.subscriptionType) errs.subscriptionType = labels.errors.subscriptionType;
//         if (!data.membershipType) errs.membershipType = labels.errors.membershipType;

//         setErrors(errs);
//         return Object.keys(errs).length === 0;
//     };

//     const next = () => { if (validateStep1()) setStep(2); };
//     const back = () => setStep(1);

//     const submit = async () => {
//         const form = new FormData();
//         Object.entries(data).forEach(([k, v]) => v && form.append(k, v));
//         try {
//             const res = await api.post('/register', form, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 onUploadProgress: e => setUploadProgress(Math.round(e.loaded * 100 / e.total))
//             });
//             if (res.status === 200) navigate('/billing');
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     return (
//         <div className="register-wrapper m-5 " dir={labels.direction}>
//             <h2 className="register-title">{labels.createAccount}</h2>
//             <span className="step-badge">{step}/2</span>
//             {step === 1 ? (
//                 <div className="step1-form">
//                     <div className="row">
//                         {['name', 'phone', 'ssn', 'email', 'password', 'confirmPassword', 'hobby', 'healthStatus', 'salary'].map(f => (
//                             <div className="col-md-4 form-group" key={f}>
//                                 <label>{labels.fields[f].label}</label>
//                                 <input
//                                     type={f.includes('password') ? 'password' : 'text'} name={f}
//                                     value={data[f]} onChange={handleChange}
//                                     placeholder={labels.fields[f].placeholder}
//                                     className={`form-control ${errors[f] ? 'is-invalid' : ''}`} />
//                                 {errors[f] && <div className="invalid-feedback"><FontAwesomeIcon icon={faExclamationCircle} /> {errors[f]}</div>}
//                             </div>
//                         ))}
//                         {['socialStatus', 'job', 'nationality', 'subscriptionType', 'membershipType'].map(f => (
//                             <div className="col-md-4 form-group" key={f}>
//                                 <label>{labels.fields[f].label}</label>
//                                 <select name={f} value={data[f]} onChange={handleChange} className={`form-control ${errors[f] ? 'is-invalid' : ''}`}>
//                                     <option value="">--</option>
//                                     {(f === 'membershipType' ? availableMemberships() : lists[f]).map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                                 </select>
//                                 {errors[f] && <div className="invalid-feedback"><FontAwesomeIcon icon={faExclamationCircle} /> {errors[f]}</div>}
//                             </div>
//                         ))}
//                         {['dob', 'age', 'gender'].map(f => (
//                             <div className="col-md-4 form-group" key={f}>
//                                 <label>{f.charAt(0).toUpperCase() + f.slice(1)}</label>
//                                 <input type={f === 'dob' ? 'date' : 'text'} name={f} value={data[f]} readOnly className="form-control" />
//                             </div>
//                         ))}
//                     </div>
//                     <button className="btn btn-primary next-btn" onClick={next}>{labels.next}</button>
//                 </div>
//             ) : (
//                 <div className="step2-form">
//                     <div className="row">
//                         {['personalImage', 'ssnImage', 'medicalReport', 'salaryProof'].map(f => (
//                             <div className="col-md-3 upload-card" key={f}>
//                                 <div className="upload-box">
//                                     <FontAwesomeIcon icon={faCloudUploadAlt} size="2x" />
//                                     <input type="file" name={f} accept="image/*" onChange={handleChange} />
//                                 </div>
//                                 <label>{labels.fields[f].label}</label>
//                             </div>
//                         ))}
//                     </div>
//                     {uploadProgress > 0 && <div className="progress mt-3"><div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }}>{uploadProgress}%</div></div>}
//                     <div className="mt-4">
//                         <button className="btn btn-secondary mr-2" onClick={back}><FontAwesomeIcon icon={faArrowLeft} /> {labels.back}</button>
//                         <button className="btn btn-primary" onClick={submit}>{labels.register}</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Register;

//     import React, { useState, useContext, useEffect } from 'react';
//     import { useNavigate } from 'react-router-dom';
//     import Step1 from './Step1';
//     import Step2 from './Step2';
//     import './Register.css';
//     import { api } from '../../data/Api';
//     import { LanguageContext } from '../../context/LanguageProvider.context';
//     import lang from '../../assets/lang/language';

//     const Register = () => {
//         const { language } = useContext(LanguageContext);
//         const navigate = useNavigate();
//         const [step, setStep] = useState(1);
//         const [formData, setFormData] = useState({
//             name: '', phone: '', ssn: '', socialStatus: '', email: '', password: '', confirmPassword: '',
//             hobby: '', healthStatus: '', job: '', salary: '', nationality: '', subscriptionType: '', membershipType: '',
//             age: '', dob: '', gender: '', personalImage: null, ssnImage: null, medicalReport: null, salaryProof: null
//         });
//         const [errors, setErrors] = useState({});
//         const [uploadProgress, setUploadProgress] = useState(0);

//         const handleChange = e => {
//             const { name, value } = e.target;
//             setFormData(prev => ({ ...prev, [name]: value }));
//             setErrors(prev => ({ ...prev, [name]: '' }));
//         };
//         const handleFileChange = e => {
//             const { name, files } = e.target;
//             setFormData(prev => ({ ...prev, [name]: files[0] }));
//             setErrors(prev => ({ ...prev, [name]: '' }));
//         };

//         useEffect(() => {
//             if (formData.ssn.length >= 14) {
//                 const year = +('19' + formData.ssn.substr(0, 2));
//                 const month = +formData.ssn.substr(2, 2);
//                 const day = +formData.ssn.substr(4, 2);
//                 const birth = new Date(year, month - 1, day);
//                 const age = new Date().getFullYear() - birth.getFullYear();
//                 const yyyy = birth.getFullYear();
//                 const mm = String(birth.getMonth() + 1).padStart(2, '0');
//                 const dd = String(birth.getDate()).padStart(2, '0');
//                 const dob = `${yyyy}-${mm}-${dd}`;
//                 const genderDigit = +formData.ssn.charAt(12);
//                 setFormData(prev => ({ ...prev, age, dob, gender: genderDigit % 2 ? 'Male' : 'Female' }));
//             }
//         }, [formData.ssn]);

//     const validateStep1 = () => {
//         const errs = {};
//         if (formData.name.trim().split(/\s+/).length < 4) errs.name = lang[language].errors.name;
//         if (!formData.phone) errs.phone = lang[language].errors.phone;
//         if (!formData.ssn) errs.ssn = lang[language].errors.ssn;
//         if (!formData.job) errs.job = lang[language].errors.job;
//         if (formData.job !== 'student' && !formData.salary) errs.salary = lang[language].errors.salary;
//         if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/)) errs.password = lang[language].errors.password;
//         if (formData.password !== formData.confirmPassword) errs.confirmPassword = lang[language].errors.confirmPassword;
//         setErrors(errs);
//         return Object.keys(errs).length === 0;
//     };

//     const nextStep = () => { if (validateStep1()) setStep(2); };
//     const prevStep = () => setStep(1);

//     const handleSubmit = async () => {
//         const data = new FormData();
//         Object.entries(formData).forEach(([k, v]) => v != null && data.append(k, v));
//         try {
//             const resp = await api.post('/register', data, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 onUploadProgress: e => setUploadProgress(Math.round((e.loaded * 100) / e.total))
//             });
//             if (resp.status === 200) navigate('/billing');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="register-wrapper" dir={lang[language].direction}>
//             <h2 className="register-title">{lang[language].createAccount}</h2>
//             <span className="step-badge">{`${step}/2`}</span>
//             {step === 1
//                 ? <Step1 formData={formData} errors={errors} handleChange={handleChange} nextStep={nextStep} />
//                 : <Step2 formData={formData} errors={errors} handleFileChange={handleFileChange} prevStep={prevStep} handleSubmit={handleSubmit} uploadProgress={uploadProgress} />
//             }
//         </div>
//     );
// };
// export default Register;



import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import './Register.css';
import { api } from '../../data/Api';
import { LanguageContext } from '../../context/LanguageProvider.context';
import lang from '../../assets/lang/language';

const Register = () => {
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', phone: '', ssn: '', socialStatus: '', email: '', password: '', confirmPassword: '',
        hobby: '', healthStatus: '', job: '', salary: '', nationality: '', subscriptionType: '', membershipType: '',
        age: '', gender: '', personalImage: null, ssnImage: null, medicalReport: null, salaryProof: null
    });
    const [errors, setErrors] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };
    const handleFileChange = e => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };
    useEffect(() => {
        // auto-compute age/gender from ssn if length matches
        if (formData.ssn.length >= 14) {
            // example: SSN pattern YYMMDD... gender digit at pos 12
            const year = +('19' + formData.ssn.substr(0, 2));
            const month = +formData.ssn.substr(2, 2);
            const day = +formData.ssn.substr(4, 2);
            const birth = new Date(year, month - 1, day);
            const age = new Date().getFullYear() - birth.getFullYear();
            const genderDigit = +formData.ssn.charAt(12);
            setFormData(prev => ({ ...prev, age, gender: genderDigit % 2 ? 'Male' : 'Female' }));
        }
    }, [formData.ssn]);

    const validateStep1 = () => {
        const errs = {};
        if (formData.name.trim().split(/\s+/).length < 4) errs.name = lang[language].errors.name;
        if (!formData.phone) errs.phone = lang[language].errors.phone;
        if (!formData.ssn) errs.ssn = lang[language].errors.ssn;
        if (!formData.job) errs.job = lang[language].errors.job;
        if (formData.job !== 'student' && !formData.salary) errs.salary = lang[language].errors.salary;
        if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/)) errs.password = lang[language].errors.password;
        if (formData.password !== formData.confirmPassword) errs.confirmPassword = lang[language].errors.confirmPassword;
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const nextStep = () => {
        if (validateStep1())
            setStep(2);
    };
    const prevStep = () => setStep(1);

    const handleSubmit = async () => {
        const data = new FormData();
        Object.entries(formData).forEach(([k, v]) => v != null && data.append(k, v));
        try {
            const resp = await api.post('/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: e => setUploadProgress(Math.round((e.loaded * 100) / e.total))
            });
            if (resp.status === 200) navigate('/billing');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register-wrapper" dir={lang[language].direction}>
            <h2 className="register-title">{lang[language].createAccount}</h2>
            <span className="step-badge">{`${step}/2`}</span>
            {step === 1
                ? <Step1 formData={formData} errors={errors} handleChange={handleChange} nextStep={nextStep} />
                : <Step2 formData={formData} errors={errors} handleFileChange={handleFileChange} prevStep={prevStep} handleSubmit={handleSubmit} uploadProgress={uploadProgress} />
            }
        </div>
    );
};
export default Register;

// import React, { useState } from 'react';
// import Step1 from './Step1';
// import Step2 from './Step2';
// import './Register.css';

// const Register = () => {
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({});

//     const next = (data) => {
//         setFormData(prev => ({ ...prev, ...data }));
//         setStep(prev => prev + 1);
//     };

//     const back = () => setStep(prev => prev - 1);

//     return (
//         <div className="register-container my-5">
//             {step === 1 && <Step1 initialData={formData} onNext={next} />}
//             {step === 2 && <Step2 initialData={formData} onBack={back} />}
//         </div>
//     );
// };

// export default Register;