import lang from "../../assets/lang/language";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageProvider.context";

const Register = () => {
    const { language } = useContext(LanguageContext);


    return (
        <div className="h-100 bg-info text-center m-5 p-2 h-75  d-flex justify-content-center">
            <div className="border-rounded rounded-3 text-center w-75  h-100 bg-danger d-flex justify-content-start align-items-center flex-column ">
                <div className="border-rounded rounded-top-3 w-100 h-25 bg-warning d-flex justify-content-center align-items-center flex-column ">
                    <h1 className="text-center">{lang[language].createAccount}</h1>
                    <div className="w-100 h-100 bg-white d-flex justify-content-start align-items-center " dir={lang[language].direction}>
                        <h3 className={lang[language].direction === "rtl" ? "me-5 ms-2" : "ms-5 me-2"}>{lang[language].step}</h3> <span className="badge bg-danger fs-6">1/2</span>
                    </div>
                </div>
                <div className="w-100 h-100 bg-success  d-flex align-items-start" dir={lang[language].direction}>
                    <form className="w-100  d-flex flex-row flex-wrap gap-2 mx-3 justify-content-center">
                        <div className="mb-3   w-75">
                            <label htmlFor="name">{lang[language].fields.name.label}</label>
                            <input id="name" type="text" className="form-control" />
                        </div>
                        <div className="mb-3  w-75">
                            <label htmlFor="phone">{lang[language].fields.phone.label}</label>
                            <input id="phone" type="text" className="form-control" />
                        </div>
                        <div className="mb-3   w-75">
                            <label htmlFor="ss">{lang[language].fields.socialStatus.label}</label>
                            <select id="ss" type="text" className="form-control" >
                                <option value="">--</option>
                                {lang[language].socialStatus.map((opt, index) => <option key={opt} value={index}>{opt}</option>)}
                            </select>
                        </div>
                        <div className="mb-3   w-75">
                            <label htmlFor="ssn">{lang[language].fields.ssn.label}</label>
                            <input id="ssn" type="text" className="form-control" />
                        </div>
                        <div className="mb-3    w-75">
                            <label htmlFor="email">{lang[language].fields.email.label}</label>
                            <input id="email" type="text" className="form-control" />
                        </div>
                        <div className="mb-3    w-75">
                            <label htmlFor="password">{lang[language].fields.password.label}</label>
                            <input id="password" type="password" className="form-control" />
                        </div>
                        <div className="mb-3    w-75">
                            <label htmlFor="confirmPassword">{lang[language].fields.confirmPassword.label}</label>
                            <input id="confirmPassword" type="password" className="form-control" />
                        </div>
                        <div className="mb-3   w-75">
                            <label htmlFor="name">{lang[language].fields.name.label}</label>
                            <input id="name" type="text" className="form-control" />
                        </div>
                        <div className="mb-3   w-75">
                            <label htmlFor="phone">{lang[language].fields.phone.label}</label>
                            <input id="phone" type="text" className="form-control" />
                        </div>
                        <div className="mb-3   w-75">
                            <label htmlFor="ss">{lang[language].fields.socialStatus.label}</label>
                            <select id="ss" type="text" className="form-control" >
                                <option value="">--</option>
                                {lang[language].socialStatus.map((opt, index) => <option key={opt} value={index}>{opt}</option>)}
                            </select>
                        </div>
                        <div className="mb-3   w-75">
                            <label htmlFor="ssn">{lang[language].fields.ssn.label}</label>
                            <input id="ssn" type="text" className="form-control" />
                        </div>
                        <div className="mb-3    w-75">
                            <label htmlFor="email">{lang[language].fields.email.label}</label>
                            <input id="email" type="text" className="form-control" />
                        </div>
                        <div className="mb-3    w-75">
                            <label htmlFor="password">{lang[language].fields.password.label}</label>
                            <input id="password" type="password" className="form-control" />
                        </div>
                        <div className="mb-3    w-75">
                            <label htmlFor="confirmPassword">{lang[language].fields.confirmPassword.label}</label>
                            <input id="confirmPassword" type="password" className="form-control" />
                        </div>
                    </form>
                </div>
                <div className="w-100  py-3 bg-primary border-rounded rounded-bottom-3">
                    actions
                    actions
                    actions

                </div>

            </div>
        </div>
    );
};

export default Register;