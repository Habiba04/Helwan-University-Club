// import React, { useContext } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
// import { LanguageContext } from '../../context/LanguageProvider.context';
// import lang from '../../assets/lang/language';

// const socialOptions = ['married', 'single', 'divorced', 'widowed', 'separated', 'engaged'];
// const jobOptions = ['professor', 'teaching assistant', 'teacher', 'full-time teacher', 'full-time teaching assistant', 'full-time professor', 'employee', 'student'];
// const nationalityOptions = ['Egyptian', 'Foreign'];
// const subscriptionOptions = ['yearly', 'monthly'];
// const membershipOptions = ['visitor member', 'Associate member', 'branch member', 'worker member', 'sports member', 'sessonal foreigner - yearly', 'sessonal foreigner -6 month', 'sessonal foreigner - monthly'];

// const Step1 = ({ formData, errors, handleChange, nextStep }) => {
//     const { language } = useContext(LanguageContext);
//     return (
//         <form className="step1-form">
//             <div className="row">
//                 {['name', 'phone', 'ssn', 'email', 'password', 'confirmPassword', 'hobby', 'healthStatus', 'salary'].map(field => (
//                     <div className="col-md-4 form-group" key={field}>
//                         <label>{lang[language].fields[field].label}</label>
//                         <input
//                             type={field.toLowerCase().includes('password') ? 'password' : 'text'}
//                             name={field}
//                             className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
//                             placeholder={lang[language].fields[field].placeholder}
//                             value={formData[field]}
//                             onChange={handleChange}
//                         />
//                         {errors[field] && <div className="invalid-feedback"><FontAwesomeIcon icon={faExclamationCircle} /> {errors[field]}</div>}
//                     </div>
//                 ))}
//                 <div className="col-md-4 form-group">
//                     <label>{lang[language].fields.socialStatus.label}</label>
//                     <select name="socialStatus" className={`form-control ${errors.socialStatus ? 'is-invalid' : ''}`} value={formData.socialStatus} onChange={handleChange}>
//                         <option value="">--</option>
//                         {socialOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                     </select>
//                 </div>
//                 <div className="col-md-4 form-group">
//                     <label>{lang[language].fields.job.label}</label>
//                     <select name="job" className={`form-control ${errors.job ? 'is-invalid' : ''}`} value={formData.job} onChange={handleChange}>
//                         <option value="">--</option>
//                         {jobOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                     </select>
//                 </div>
//                 <div className="col-md-4 form-group">
//                     <label>Date of Birth</label>
//                     <input type="date" name="dob" className="form-control" value={formData.dob} readOnly />
//                 </div>
//                 <div className="col-md-4 form-group">
//                     <label>Age</label>
//                     <input type="number" name="age" className="form-control" value={formData.age} readOnly />
//                 </div>
//                 <div className="col-md-4 form-group">
//                     <label>Gender</label>
//                     <input type="text" name="gender" className="form-control" value={formData.gender} readOnly />
//                 </div>
//                 <div className="col-md-4 form-group">
//                     <label>{lang[language].fields.nationality.label}</label>
//                     <select name="nationality" className={`form-control ${errors.nationality ? 'is-invalid' : ''}`} value={formData.nationality} onChange={handleChange}>
//                         <option value="">--</option>
//                         {nationalityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                     </select>
//                 </div>
//                 <div className="col-md-4 form-group">
//                     <label>{lang[language].fields.subscriptionType.label}</label>
//                     <select name="subscriptionType" className="form-control" value={formData.subscriptionType} onChange={handleChange}>
//                         <option value="">--</option>
//                         {subscriptionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                     </select>
//                 </div>
//                 <div className="col-md-4 form-group">
//                     <label>{lang[language].fields.membershipType.label}</label>
//                     <select name="membershipType" className="form-control" value={formData.membershipType} onChange={handleChange}>
//                         <option value="">--</option>
//                         {membershipOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                     </select>
//                 </div>
//             </div>
//             <button type="button" className="btn btn-primary next-btn" onClick={nextStep}>{lang[language].next}</button>
//         </form>
//     );
// };
// export default Step1;

// import React, { useContext } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
// import { LanguageContext } from '../../context/LanguageProvider.context';
// import lang from '../../assets/lang/language';

// const Step1 = ({ formData, errors, handleChange, nextStep }) => {
//     const { language } = useContext(LanguageContext);
//     return (
//         <form className="step1-form">
//             <div className="row">
//                 {['name', 'phone', 'ssn', 'socialStatus', 'email', 'password', 'confirmPassword', 'hobby', 'healthStatus', 'job', 'salary', 'nationality', 'subscriptionType', 'membershipType'].map(field => (
//                     <div className="col-md-4 form-group" key={field}>
//                         <label>{lang[language].fields[field].label}</label>
//                         {field === 'socialStatus' || field === 'job' || field === 'nationality' || field === 'subscriptionType' || field === 'membershipType'
//                             ? <select name={field} className={`form-control ${errors[field] ? 'is-invalid' : ''}`} value={formData[field]} onChange={handleChange}>
//                                 <option value="">--</option>
//                                 {/* Populate options dynamically or hardcode */}
//                             </select>
//                             : <input
//                                 type={field.toLowerCase().includes('password') ? 'password' : 'text'}
//                                 name={field}
//                                 className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
//                                 placeholder={lang[language].fields[field].placeholder}
//                                 value={formData[field]}
//                                 onChange={handleChange}
//                             />
//                         }
//                         {errors[field] && <div className="invalid-feedback"><FontAwesomeIcon icon={faExclamationCircle} /> {errors[field]}</div>}
//                     </div>
//                 ))}
//             </div>
//             <button type="button" className="btn btn-primary next-btn" onClick={nextStep}>{lang[language].next}</button>
//         </form>
//     );
// };
// export default Step1;


import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext } from '../../context/LanguageProvider.context';
import lang from '../../assets/lang/language';

// Helper functions
const computeAge = ssn => { const year = 1900 + parseInt(ssn.slice(1, 3), 10); return new Date().getFullYear() - year; };
const computeGender = ssn => parseInt(ssn[0], 10) % 2 ? 'Female' : 'Male';

const jobs = ['professor', 'teaching assistant', 'teacher', 'full-time teacher', 'full-time teaching assistant', 'full-time professor', 'employee', 'student'];
const statuses = ['married', 'single', 'divorced', 'widow', 'separated', 'engaged'];
const nationalities = ['Egyptian', 'Foreign'];
const membershipCfg = {
    student: { membershipType: 'visitor member', salary: '0.0', disableSalary: true, disableMember: false },
    default: { membershipType: 'worker member', disableMember: true }
};

const Step1 = ({ initialData, onNext }) => {
    const { language } = useContext(LanguageContext);
    const t = lang[language];

    const [data, setData] = useState({
        name: '', phone: '', ssn: '', socialStatus: '', email: '', password: '', confirmPassword: '', hobby: '', healthStatus: '', job: '', salary: '', nationality: 'Egyptian', subscriptionType: '', membershipType: '', age: '', gender: '', ...initialData
    });
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
        if (name === 'ssn' && value.length >= 5) {
            setData(prev => ({ ...prev, age: computeAge(value), gender: computeGender(value) }));
        }
        if (name === 'job') {
            const cfg = membershipCfg[value] || membershipCfg.default;
            setData(prev => ({ ...prev, salary: cfg.salary || '', membershipType: cfg.membershipType, disableSalary: cfg.disableSalary || false, disableMember: cfg.disableMember || false }));
        }
    };

    const validate = () => {
        const errs = {};
        if (data.name.trim().split(' ').length < 4) errs.name = 'Must be 4 words';
        if (!data.phone) errs.phone = t.required;
        if (!data.ssn) errs.ssn = t.required;
        if (!data.socialStatus) errs.socialStatus = t.required;
        if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) errs.email = 'Invalid email';
        if (data.password.length < 7 || !/[0-9]/.test(data.password) || !/[^A-Za-z0-9]/.test(data.password)) errs.password = 'Weak password';
        if (data.confirmPassword !== data.password) errs.confirmPassword = 'Passwords must match';
        if (!data.job) errs.job = t.required;
        if (!data.salary && !data.disableSalary) errs.salary = t.required;
        if (!data.nationality) errs.nationality = t.required;
        if (!data.subscriptionType) errs.subscriptionType = t.required;
        if (!data.membershipType) errs.membershipType = t.required;
        return errs;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        onNext(data);
    };

    return (
        <form onSubmit={handleSubmit} dir={t.direction} className="step-form">
            <div className="row gx-3 gy-3">
                {/* Name */}
                <div className="col-md-4">
                    <label>{t.name}</label>
                    <input name="name" value={data.name} onChange={handleChange} placeholder={t.namePH} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    {errors.name && <div className="invalid-feedback"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.name}</div>}
                </div>
                {/* Phone */}
                <div className="col-md-4">
                    <label>{t.phone}</label>
                    <input name="phone" value={data.phone} onChange={handleChange} placeholder="+20*************" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                    {errors.phone && <div className="invalid-feedback"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.phone}</div>}
                </div>
                {/* SSN */}
                <div className="col-md-4">
                    <label>{t.ssn}</label>
                    <input name="ssn" value={data.ssn} onChange={handleChange} placeholder="national id" className={`form-control ${errors.ssn ? 'is-invalid' : ''}`} />
                    {errors.ssn && <div className="invalid-feedback"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.ssn}</div>}
                </div>
                {/* Gender/Age */}
                <div className="col-md-2"><label>{t.gender}</label><input readOnly value={data.gender} className="form-control-plaintext" /></div>
                <div className="col-md-2"><label>{t.age}</label><input readOnly value={data.age} className="form-control-plaintext" /></div>
                {/* Social Status */}
                <div className="col-md-4">
                    <label>{t.socialStatus}</label>
                    <select name="socialStatus" value={data.socialStatus} onChange={handleChange} className={`form-select ${errors.socialStatus ? 'is-invalid' : ''}`}>
                        <option value="">{t.select}</option>
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.socialStatus && <div className="invalid-feedback">{errors.socialStatus}</div>}
                </div>
                {/* Email */}
                <div className="col-md-4">
                    <label>{t.email}</label>
                    <input name="email" value={data.email} onChange={handleChange} placeholder="example@gmail.com" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                {/* Password */}
                <div className="col-md-4">
                    <label>{t.password}</label>
                    <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="*************" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                {/* Confirm Password */}
                <div className="col-md-4">
                    <label>{t.confirmPassword}</label>
                    <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} placeholder="*************" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
                {/* Hobby & Health */}
                <div className="col-md-4"><label>{t.hobby}</label><input name="hobby" value={data.hobby} onChange={handleChange} placeholder="swimming, fishing" className="form-control" /></div>
                <div className="col-md-4"><label>{t.healthStatus}</label><input name="healthStatus" value={data.healthStatus} onChange={handleChange} placeholder="cardiac problems, etc..." className="form-control" /></div>
                {/* Job */}
                <div className="col-md-4">
                    <label>{t.job}</label>
                    <select name="job" value={data.job} onChange={handleChange} className={`form-select ${errors.job ? 'is-invalid' : ''}`}>
                        <option value="">{t.select}</option>
                        {jobs.map(j => <option key={j} value={j}>{j}</option>)}
                    </select>
                    {errors.job && <div className="invalid-feedback">{errors.job}</div>}
                </div>
                {/* Salary */}
                <div className="col-md-4">
                    <label>{t.salary}</label>
                    <input name="salary" value={data.salary} onChange={handleChange} disabled={data.disableSalary} placeholder={t.salaryPH} className={`form-control ${errors.salary ? 'is-invalid' : ''}`} />
                    {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
                </div>
                {/* Nationality */}
                <div className="col-md-4">
                    <label>{t.nationality}</label>
                    <select name="nationality" value={data.nationality} onChange={handleChange} className={`form-select ${errors.nationality ? 'is-invalid' : ''}`}>
                        {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                </div>
                {/* Subscription Type */}
                <div className="col-md-4">
                    <label>{t.subscriptionType}</label>
                    <select name="subscriptionType" value={data.subscriptionType} onChange={handleChange} className={`form-select ${errors.subscriptionType ? 'is-invalid' : ''}`}>
                        <option value="">{t.select}</option>
                        {/* options based on nationality can be added */}
                        <option value="yearly">Yearly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                    {errors.subscriptionType && <div className="invalid-feedback">{errors.subscriptionType}</div>}
                </div>
                {/* Membership Type */}
                <div className="col-md-4">
                    <label>{t.membershipType}</label>
                    <input name="membershipType" value={data.membershipType} readOnly disabled={data.disableMember} className="form-control-plaintext" />
                </div>
            </div>

            <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary">{t.next}</button>
            </div>
        </form>
    );
};

export default Step1;
