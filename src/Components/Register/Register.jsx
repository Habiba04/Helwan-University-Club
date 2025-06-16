import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const next = (data) => {
        setFormData({ ...formData, ...data });
        console.log(formData);
        setStep(2);
    };

    const back = () => setStep(1);

    const handleComplete = () => {
        navigate("/profile/0");
    };

    return (
        <div className="register-container">
            {step === 1 && <Step1 next={next} initialData={formData} />}
            {step === 2 && <Step2 back={back} data={formData} onComplete={handleComplete} />}
        </div>
    );
};

export default Register;
