import React, { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageProvider.context";
import lang from "../../assets/lang/language";
import { api } from "../../data/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const Step2 = ({ back, data, onComplete }) => {
    const { language } = useContext(LanguageContext);
    const [files, setFiles] = useState({});
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleUpload = async () => {
        const formData = new FormData();
        Object.entries(files).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // Object.entries(data).forEach(([key, value]) => {
        //     formData.append(key, value);
        // });

        const config = {
            onUploadProgress: (e) => {
                const percent = Math.round((e.loaded * 100) / e.total);
                setProgress(percent);
            },
        };

        try {
            await api.post("/account/register/", formData, config);
            onComplete();
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    return (
        <div className="step-container" dir={lang[language].direction}>
            <h3 className="text-center">{lang[language].createAccount}</h3>
            <h3>{lang[language].step} <span className="badge  fs-6" style={{ backgroundColor: "#224375" }}>2/2</span></h3>
            <button className="btn btn-secondary mb-3 rounded-5" style={{ backgroundColor: "#224375" }}  onClick={back}>
                <FontAwesomeIcon icon={faArrowLeft} /> {lang[language].back}
            </button>

            <div className="upload-grid">
                {[
                    { name: "personalImage", label: lang[language].fields.personalImage.label, hint:"4x6" },
                    { name: "ssnImage", label: lang[language].fields.ssnImage.label },
                    { name: "salaryProof", label: lang[language].fields.salaryProof.label },
                    { name: "medicalReport", label: lang[language].fields.medicalReport.label },
                ].map((field) => (
                    <div key={field.name} className="upload-box  ">
                        <div className="h-50 d-flex justify-content-center align-items-center">
                            {files[field.name] ? (
                                <img src={URL.createObjectURL(files[field.name])} alt={field.label}  width={"80%"} height={"100%"} className="mx-3 "/>
                            ) : (
                                <FontAwesomeIcon icon={faUpload} size="2x" className="mx-3 position-relative bottom-0" />
                            )
                            }
                        </div>
                        <label htmlFor={field.name} className="form-label py-2">{field.label} {field?.hint && <span className="text-muted">{field.hint}</span>}</label>
                        <input
                            type="file"
                            name={field.name}
                            id={field.name}
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            <div className="progress my-3 ">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {progress}%
                </div>
            </div>


            <button className="btn btn-primary w-100" style={{ backgroundColor: "#224375" }}  onClick={handleUpload}>
                {lang[language].register}
            </button>
        </div>
    );
};

export default Step2;
