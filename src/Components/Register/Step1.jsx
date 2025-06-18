import React, { useContext, useState } from "react";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";
import useProfileFieldsRoles from "../../shared/services/useProfileFields";

const Step1 = ({ next, initialData = {} }) => {
    const { language } = useContext(LanguageContext);
    const t = lang[language];
    const dir = t.direction;
    const { gender, nationality, jobTypes, membership, subscriptionType } = useProfileFieldsRoles();

    const [values, setValues] = useState({
        name: "",
        phone: "",
        ssn: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: "",
        job: "",
        salary: "",
        nationality: "",
        subscriptionType: "",
        membershipType: "",
        hobby: "",
        healthStatus: "",
        age: "",
        ...initialData,
    });
    const [errors, setErrors] = useState({});
    const [dynamic, setDynamic] = useState({ gender: "", isStudent: false, isForeigner: false, isRetired: false });

    const validate = () => {
        const errs = {};
        if (values.name.trim().split(" ").length < 4) errs.name = t.errors.name;
        if (!values.phone) errs.phone = t.errors.phone;
        if (values.ssn.length !== 14) errs.ssn = t.errors.ssn;
        if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = t.errors.email;
        if (!values.password.match(/.{6,}/) || !values.password.match(/[A-Z]/i) || !values.password.match(/[0-9]/) || !values.password.match(/[!@#$%^&*]/)) errs.password = t.errors.password;
        if (values.confirmPassword !== values.password) errs.confirmPassword = t.errors.confirmPassword;
        if (!values.job) errs.job = t.errors.job;
        if (!dynamic.isStudent && !dynamic.isRetired && (!values.salary || isNaN(values.salary))) errs.salary = t.errors.salary;
        if (!values.nationality) errs.nationality = t.errors.nationality;
        if (!values.subscriptionType) errs.subscriptionType = t.errors.subscriptionType;
        if (!values.membershipType) errs.membershipType = t.errors.membershipType;
        return errs;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        let newValues = { ...values, [name]: value };
        let newDynamic = { ...dynamic };

        // SSN logic: age and gender
        if (name === "ssn" && value.length === 14 && !newDynamic.isForeigner) {
            const century = value[0] === '2' ? 1900 : 2000;
            const year = century + parseInt(value.slice(1, 3));
            newValues.age = new Date().getFullYear() - year;
            const genderDigit = parseInt(value[12]);
            newDynamic.gender = genderDigit % 2 === 0 ? t.gender[1] : t.gender[0];
        }

        // Job logic: membership auto assign & retired/salary logic
        if (name === "job") {
            const idx = jobTypes.fields.indexOf(value);
            let mem = values.membershipType;
            let isStudent = false;
            let isRetired = false;

            if (idx >= 0 && idx <= 7) {
                mem = membership.fields[0];
            } else if (idx === 8) {
                mem = membership.fields[7];
                isStudent = true;
                newValues.salary = '0.0';
            } else if (idx === 9) {
                mem = membership.fields[2];
            }
            // retired jobs detection: any value containing retired keyword
            if (value.toLowerCase().includes(t.fields.job.retiredKeyword || 'متقاعد')) {
                isRetired = true;
                newValues.salary = '';
            }

            newValues.membershipType = mem;
            newDynamic = { ...newDynamic, isStudent, isRetired };
        }

        // Nationality logic: foreigner age shown and membership
        if (name === "nationality") {
            const isFor = value === nationality.fields[1];
            newDynamic.isForeigner = isFor;
            if (isFor) newValues.membershipType = membership.fields[6];
        }

        // Subscription logic: set default subscription based on membership
        if (name === 'membershipType' || name === 'nationality') {
            if (!newDynamic.isForeigner) {
                const seasonal = subscriptionType.fields[1];
                if (newValues.membershipType === membership.fields.find(m => m.toLowerCase().includes('موسمي')))
                    newValues.subscriptionType = seasonal;
                else newValues.subscriptionType = subscriptionType.fields[0];
            }
        }

        setValues(newValues);
        setDynamic(newDynamic);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) next(values);
    };

    return (
        <form onSubmit={handleSubmit} className="step-container" dir={dir} noValidate>
            <h2 className="text-center">{t.createAccount}</h2>
            <h3>{t.step} <span className="badge fs-6" style={{ backgroundColor: '#224375' }}>1/2</span></h3>

            <div className="row">
                {/* Name */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.name.label}</label>
                    <input name="name" className="form-control" placeholder={t.fields.name.placeholder}
                        value={values.name} onChange={handleChange} />
                    {errors.name && <div className="text-danger small">{errors.name}</div>}
                </div>
                {/* Phone */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.phone.label}</label>
                    <input name="phone" className="form-control" placeholder={t.fields.phone.placeholder}
                        value={values.phone} onChange={handleChange} />
                    {errors.phone && <div className="text-danger small">{errors.phone}</div>}
                </div>
                {/* Nationality */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.nationality.label}</label>
                    <select name="nationality" className="form-select" value={values.nationality} onChange={handleChange}>
                        <option value="">--</option>
                        {nationality.fields.map((n, i) => <option key={i} value={n}>{n}</option>)}
                    </select>
                    {errors.nationality && <div className="text-danger small">{errors.nationality}</div>}
                </div>
                {/* Hidden Gender */}
                <input type="hidden" name="gender" value={dynamic.gender} />
                {/* Job */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.job.label}</label>
                    <select name="job" className="form-select" value={values.job} onChange={handleChange}>
                        <option value="">--</option>
                        {jobTypes.fields.map((j, i) => <option key={i} value={j}>{j}</option>)}
                    </select>
                    {errors.job && <div className="text-danger small">{errors.job}</div>}
                </div>
                {/* SSN */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.ssn.label}</label>
                    <input name="ssn" className="form-control" placeholder={t.fields.ssn.placeholder}
                        maxLength={14} value={values.ssn} onChange={handleChange} />
                    {errors.ssn && <div className="text-danger small">{errors.ssn}</div>}
                </div>
                {/* Age (shown when nationality matches or SSN parsed) */}

                {(dynamic.isForeigner || values.age) && (
                    <div className="col-md-6 mb-3">
                        <label>{t.fields.age?.label || 'Age'}</label>
                        <input name="age" className="form-control" value={values.age} onChange={handleChange} readOnly={!dynamic.isForeigner} />
                    </div>
                )}
                {/* Email */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.email.label}</label>
                    <input name="email" type="email" className="form-control" placeholder={t.fields.email.placeholder}
                        value={values.email} onChange={handleChange} />
                    {errors.email && <div className="text-danger small">{errors.email}</div>}
                </div>
                {/* Password */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.password.label}</label>
                    <input name="password" type="password" className="form-control"
                        value={values.password} onChange={handleChange} onMouseEnter={e => e.target.type = 'text'}  onMouseLeave={e => e.target.type = 'password'} />
                    {errors.password && <div className="text-danger small">{errors.password}</div>}
                </div>
                {/* Confirm Password */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.confirmPassword.label}</label>
                    <input name="confirmPassword" type="password" className="form-control"
                        value={values.confirmPassword} onChange={handleChange} onMouseEnter={e => e.target.type = 'text'} onMouseLeave={e => e.target.type = 'password'} />
                    {errors.confirmPassword && <div className="text-danger small">{errors.confirmPassword}</div>}
                </div>
                {/* Salary */}
                {!dynamic.isStudent && !dynamic.isRetired && (
                    <div className="col-md-6 mb-3">
                        <label>{t.fields.salary.label}</label>
                        <input name="salary" type="number" className="form-control"
                            value={values.salary} onChange={handleChange} />
                        {errors.salary && <div className="text-danger small">{errors.salary}</div>}
                    </div>
                )}
                {/* Subscription */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.subscriptionType.label}</label>
                    <select name="subscriptionType" className="form-select" value={values.subscriptionType} onChange={handleChange}>
                        <option value="">--</option>
                        {subscriptionType.fields.map((s, i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                    {errors.subscriptionType && <div className="text-danger small">{errors.subscriptionType}</div>}
                </div>
                {/* Membership */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.membershipType.label}</label>
                    <select name="membershipType" className="form-select" value={values.membershipType} onChange={handleChange}>
                        <option value="">--</option>
                        {membership.fields.map((m, i) => membership.fields[1] !== m ?(<option key={i} value={m}>{m}</option>): null)}
                    </select>
                    {errors.membershipType && <div className="text-danger small">{errors.membershipType}</div>}
                </div>
                {/* Hobby & Health */}
                <div className="col-md-6 mb-3">
                    <label>{t.fields.hobby.label}</label>
                    <input name="hobby" className="form-control" value={values.hobby} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label>{t.fields.healthStatus.label}</label>
                    <input name="healthStatus" className="form-control" value={values.healthStatus} onChange={handleChange} />
                </div>
                {/* Submit */}
                <div className="col-md-12 mt-3">
                    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#224375' }}>
                        {t.next}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Step1;

// =================== v1

// import React, { useContext, useState } from "react";
// import lang from "../../assets/lang/language";
// import { LanguageContext } from "../../context/LanguageProvider.context";
// import useProfileFieldsRoles from "../../shared/services/useProfileFields";

// const Step1 = ({ next, initialData = {} }) => {
//     const { language } = useContext(LanguageContext);
//     const t = lang[language];
//     const dir = t.direction;
//     const { gender, nationality, jobTypes, membership, subscriptionType } = useProfileFieldsRoles();

//     const [values, setValues] = useState({
//         name: "",
//         phone: "",
//         ssn: "",
//         gender: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         job: "",
//         salary: "",
//         nationality: "",
//         subscriptionType: "",
//         membershipType: "",
//         hobby: "",
//         healthStatus: "",
//         age: "",
//         ...initialData,
//     });
//     const [errors, setErrors] = useState({});

//     // Manual validation rules
//     const validate = () => {
//         const errs = {};
//         if (values.name.trim().split(" ").length < 4) errs.name = t.errors.name;
//         if (!values.phone) errs.phone = t.errors.phone;
//         if (values.ssn.length !== 14) errs.ssn = t.errors.ssn;
//         if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = t.errors.email;
//         if (!values.password.match(/.{6,}/) || !values.password.match(/[A-Z]/i) || !values.password.match(/[0-9]/) || !values.password.match(/[!@#$%^&*]/)) errs.password = t.errors.password;
//         if (values.confirmPassword !== values.password) errs.confirmPassword = t.errors.confirmPassword;
//         if (!values.job) errs.job = t.errors.job;
//         if (!dynamic.isStudent && (!values.salary || isNaN(values.salary))) errs.salary = t.errors.salary;
//         if (!values.nationality) errs.nationality = t.errors.nationality;
//         if (!values.subscriptionType) errs.subscriptionType = t.errors.subscriptionType;
//         if (!values.membershipType) errs.membershipType = t.errors.membershipType;
//         return errs;
//     };

//     const [dynamic, setDynamic] = useState({ gender: "", isStudent: false, isForeigner: false });

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setValues(v => ({ ...v, [name]: value }));

//         // dynamic logic
//         if (name === "ssn" && value.length === 14) {
//             const century = value[0] === '2' ? 1900 : 2000;
//             const year = century + parseInt(value.slice(1, 3));
//             const age = new Date().getFullYear() - year;
//             const genderDigit = parseInt(value[12]);
//             const computedGender = genderDigit % 2 === 0 ? t.gender[1] : t.gender[0];
//             setValues(v => ({ ...v, age }));
//             setDynamic(d => ({ ...d, gender: computedGender }));
//         }
//         if (name === "job") {
//             const isStudent = value === jobTypes.fields[8];
//             setDynamic(d => ({ ...d, isStudent }));
//             if (isStudent) setValues(v => ({ ...v, salary: '0.0' }));
//         }
//         if (name === "nationality") {
//             const isFor = value.toLowerCase().includes(nationality.fields[1].toLowerCase());
//             setDynamic(d => ({ ...d, isForeigner: isFor }));
//             if (isFor) setValues(v => ({ ...v, membershipType: membership.fields[6] }));
//         }
//     };

//     const handleSubmit = e => {
//         e.preventDefault();
//         const errs = validate();
//         setErrors(errs);
//         if (Object.keys(errs).length === 0) next(values);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="step-container" dir={dir} noValidate>
//             <h2 className="text-center">{t.createAccount}</h2>
//             <h3>{t.step} <span className="badge fs-6" style={{ backgroundColor: '#224375' }}>1/2</span></h3>

//             <div className="row">
//                 {/* Name */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.name.label}</label>
//                     <input name="name" className="form-control" placeholder={t.fields.name.placeholder}
//                         value={values.name} onChange={handleChange} />
//                     {errors.name && <div className="text-danger small">{errors.name}</div>}
//                 </div>
//                 {/* Phone */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.phone.label}</label>
//                     <input name="phone" className="form-control" placeholder={t.fields.phone.placeholder}
//                         value={values.phone} onChange={handleChange} />
//                     {errors.phone && <div className="text-danger small">{errors.phone}</div>}
//                 </div>
//                 {/* Nationality */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.nationality.label}</label>
//                     <select name="nationality" className="form-select" value={values.nationality} onChange={handleChange}>
//                         <option value="">--</option>
//                         {nationality.fields.map((n, i) => <option key={i} value={n}>{n}</option>)}
//                     </select>
//                     {errors.nationality && <div className="text-danger small">{errors.nationality}</div>}
//                 </div>
//                 {/* Hidden Gender */}
//                 <input type="hidden" name="gender" value={dynamic.gender} />
//                 {/* Job */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.job.label}</label>
//                     <select name="job" className="form-select" value={values.job} onChange={handleChange}>
//                         <option value="">--</option>
//                         {jobTypes.fields.map((j, i) => <option key={i} value={j}>{j}</option>)}
//                     </select>
//                     {errors.job && <div className="text-danger small">{errors.job}</div>}
//                 </div>
//                 {/* SSN */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.ssn.label}</label>
//                     <input name="ssn" className="form-control" placeholder={t.fields.ssn.placeholder}
//                         maxLength={14} value={values.ssn} onChange={handleChange} />
//                     {errors.ssn && <div className="text-danger small">{errors.ssn}</div>}
//                 </div>
//                 {/* Email */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.email.label}</label>
//                     <input name="email" type="email" className="form-control" placeholder={t.fields.email.placeholder}
//                         value={values.email} onChange={handleChange} />
//                     {errors.email && <div className="text-danger small">{errors.email}</div>}
//                 </div>
//                 {/* Password */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.password.label}</label>
//                     <input name="password" type="password" className="form-control"
//                         value={values.password} onChange={handleChange} />
//                     {errors.password && <div className="text-danger small">{errors.password}</div>}
//                 </div>
//                 {/* Confirm Password */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.confirmPassword.label}</label>
//                     <input name="confirmPassword" type="password" className="form-control"
//                         value={values.confirmPassword} onChange={handleChange} />
//                     {errors.confirmPassword && <div className="text-danger small">{errors.confirmPassword}</div>}
//                 </div>
//                 {/* Salary */}
//                 {!dynamic.isStudent && (
//                     <div className="col-md-6 mb-3">
//                         <label>{t.fields.salary.label}</label>
//                         <input name="salary" type="number" className="form-control"
//                             value={values.salary} onChange={handleChange} />
//                         {errors.salary && <div className="text-danger small">{errors.salary}</div>}
//                     </div>
//                 )}
//                 {/* Subscription */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.subscriptionType.label}</label>
//                     <select name="subscriptionType" className="form-select" value={values.subscriptionType} onChange={handleChange}>
//                         <option value="">--</option>
//                         {subscriptionType.fields.map((s, i) => <option key={i} value={s}>{s}</option>)}
//                     </select>
//                     {errors.subscriptionType && <div className="text-danger small">{errors.subscriptionType}</div>}
//                 </div>
//                 {/* Membership */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.membershipType.label}</label>
//                     <select name="membershipType" className="form-select" value={values.membershipType} onChange={handleChange}>
//                         <option value="">--</option>
//                         {membership.fields.map((m, i) => <option key={i} value={m}>{m}</option>)}
//                     </select>
//                     {errors.membershipType && <div className="text-danger small">{errors.membershipType}</div>}
//                 </div>
//                 {/* Hobby & Health */}
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.hobby.label}</label>
//                     <input name="hobby" className="form-control" value={values.hobby} onChange={handleChange} />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                     <label>{t.fields.healthStatus.label}</label>
//                     <input name="healthStatus" className="form-control" value={values.healthStatus} onChange={handleChange} />
//                 </div>
//                 {/* Submit */}
//                 <div className="col-md-12 mt-3">
//                     <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#224375' }}>
//                         {t.next}
//                     </button>
//                 </div>
//             </div>
//         </form>
//     );
// };

// export default Step1;
