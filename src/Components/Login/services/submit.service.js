import validate from "./validate.service";
import api from "../../../data/Api";
import authorize from "./authuorize.service";

const handleSubmit = async (e, email, password, setErrors,setLoading,langType) => {
    e.preventDefault();
    setLoading(true);
    const errs = validate(email, password,langType);
    if (Object.keys(errs).length > 0) {
        setErrors(errs);
        setLoading(false);
        return;
    }
    try {
        const response = await api.post('/auth/login', { email, password });
        console.log('تم تسجيل الدخول بنجاح:', response.data);
        console.log(authorize(response.data.token));
    } catch (error) {
        console.error('فشل تسجيل الدخول:', error);
    }
    finally {
        setLoading(false);
    }
};

export default handleSubmit;