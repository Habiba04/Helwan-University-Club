import React, { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageProvider.context";
import lang from "../../assets/lang/language";
import { api } from "../../data/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useProfileFieldsRoles from "../../shared/services/useProfileFields";

const Step2 = ({ back, data, onComplete }) => {
    const { language } = useContext(LanguageContext);
    const [files, setFiles] = useState({});
    const [progress, setProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const { jobTypes , membership, subscriptionType, gender, nationality} = useProfileFieldsRoles(data.job);
    
    const handleChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });

        console.log(files)
    };

    const handleUpload = async () => {
        setSubmitting(true);
        const formData = new FormData();
        Object.entries(files).forEach(([key, value]) => {
            formData.append(key, value);
        });
        Object.entries(data).forEach(([key, value]) => {
            if (key === "name") {
                
                formData.append("fullName", value);
            }
            else if (key === "phone") {
                
                formData.append("phoneNumber", value);
            }
            else if (key === "ssn") {
            
                formData.append("NationalID", value);
            }
            else if (key === "hobby") {
                value = value !== "" ? value : "--"
                formData.append("Hobbies", value??"--");
            
            }   
            else if (key == "healthStatus") {

                value = value !== "" ? value : "--"
                formData.append("HealthStatus", value??"--");
            }
            else if (key == "salary") {
                let skip = false
                value = value == "0.0" ? skip = true : value

                if (!skip) {
                    
                    formData.append("Salary", value);
                }
            }
            else if (key == "job") {
                jobTypes.fields.forEach((j, i) => {
                    if (j === value) {
                        value = i;
                    }
                })
                formData.append("Job", value);
            }
            else if (key == "membershipType") {
                membership.fields.forEach((j, i) => {
                    if (j === value) {
                        value = i + membership.start;
                    }
                })
                formData.append("MembershipType", value);
            }
            else if (key == "subscriptionType") {
                subscriptionType.fields.forEach((j, i) => {
                    if (j === value) {
                        value = i ==2 ? 0 : i == 0 ? 2 :1 + subscriptionType.start;
                    }
                })
                formData.append("subscriptionType", value);
            }
            else if (key == "DOB") {
                formData.append("BrithDate", value);
            }
            else if (key == "gender") {
                gender.fields.forEach((j, i) => {
                    if (j == value) {
                        value = i + gender.start;
                    }
                })
                if (!value) {
                    value = 0;
                }
                formData.append("Gender", value);
            }
            else if (key == "nationality") {
                nationality.fields.forEach((j, i) => {
                    if (j == value) {
                        value = i + nationality.start;
                    }
                })
                formData.append("nationality", value);
            }
            else {
                
                formData.append(key, value);
            }
        });

        const config = {
            onUploadProgress: (e) => {
                const percent = Math.round((e.loaded * 100) / e.total);
                setProgress(percent);
            },
        };

        try {
            console.log(formData)
            await api.post(`Account/Register/${language}`, formData, config);

            onComplete();
        } catch (error) {
            console.error("Upload failed", error);
        }
    };
    const isSalrayRequired = (field) => {
        let isJobPasswithSalary = false;
        jobTypes.fields.forEach((j, i) => {
            if (j === data.job && !jobTypes.noSalary?.includes(i)) isJobPasswithSalary = true;
        })
        return field.name === "salaryProof" && (data.salary === "0.0"  || !isJobPasswithSalary)
    }
    const isHealthProveRequired = (field)=>{
        return (data.healthStatus === "" ) && field.name === "medicalReport"
    }
    return (
        <div className="step-container" dir={lang[language].direction}>
            <h3 className="text-center">{lang[language].createAccount}</h3>
            <h3>{lang[language].step} <span className="badge  fs-6" style={{ backgroundColor: "#224375" }}>2/2</span></h3>
            <button className="btn btn-secondary mb-3 rounded-5" style={{ backgroundColor: "#224375" }}  onClick={back}>
                <FontAwesomeIcon icon={faArrowLeft} /> {lang[language].back}
            </button>

            <div className="upload-grid">
                {[
                    { name: "faceImage", label: lang[language].fields.faceImage.label, hint:"4x6" },
                    { name: "ssnImage", label: lang[language].fields.ssnImage.label },
                    { name: "salaryProof", label: lang[language].fields.salaryProof.label },
                    { name: "medicalReport", label: lang[language].fields.medicalReport.label },
                ].map((field, i) => 
                {
                    if (isSalrayRequired(field)|| isHealthProveRequired(field)) return null;
                        else {
                        const fileForm = (<div key={field.name} className="upload-box  ">
                            <div className={`${files.hasOwnProperty(field.name)? "": "h-50"}  d-flex justify-content-center align-items-center`}>
                                {files[field.name] ? (
                                    <img src={URL.createObjectURL(files[field.name])} alt={field.label} width={"80%"} height={"100%"} className="mx-3 " />
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
                        </div>);
                        return fileForm;
                    }
                }
                )}
            </div>
                <div className="progress my-3 ">
            {submitting && (
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
            )}
                </div>


            <button className="btn btn-primary w-100" style={{ backgroundColor: "#224375" }} testid="registerbtnsubmit" onClick={handleUpload}>
                {lang[language].register}
            </button>
        </div>
    );
};

export default Step2;
