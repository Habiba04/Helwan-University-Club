import validate from "./validate.service";
import api from "../../../data/Api";
import authorize from "./authuorize.service";

const handleSubmit = async (e, email, password, setErrors,setLoading,langType,setData) => {
    e.preventDefault();
    setLoading(true);
    const errs = validate(email, password,langType);
    if (Object.keys(errs).length > 0) {
        setErrors(errs);
        setLoading(false);
        return;
    }
    try {
        const response = await api.post(`Account/LogIn/${langType}`, { email, password });
        console.log('تم تسجيل الدخول بنجاح:', response.data);
        const data = authorize(response.data.data.token,setData);
       
        return data;

    } catch (error) {
        console.error('فشل تسجيل الدخول:', error);
    }
    finally {
        setLoading(false);
    }
};

export default handleSubmit;