const validate = (formData, setErrors, lang) => {
    

            const errs = {};
            if (formData.name.trim().split(/\s+/).length < 4) errs.name = lang.errors.name;
            if (!formData.phone) errs.phone = lang.errors.phone;
            if (!formData.ssn) errs.ssn = lang.errors.ssn;
            if (!formData.job) errs.job = lang.errors.job;
            if (formData.job !== 'student' && !formData.salary) errs.salary = lang.errors.salary;
            if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)) errs.password = lang.errors.password;
            if (formData.password !== formData.confirmPassword) errs.confirmPassword = lang.errors.confirmPassword;
            setErrors(errs);
            return Object.keys(errs).length === 0;
            
};

export default validate;