import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import useProfileFieldsRoles from "../../shared/services/useProfileFields";

const Step1 = ({ next, initialData }) => {
    const { language } = useContext(LanguageContext);
    const t = lang[language];
    const dir = t.direction;

    const {
        gender,
        nationality,
        socialStatus,
        jobTypes,
        membership,
        subscriptionType
    } = useProfileFieldsRoles();

    const [dynamicFields, setDynamicFields] = useState({
        gender: "",
        age: "",
        isStudent: false,
        isForeigner: false,
        salaryDisabled: false,
        membershipDisabled: false,
    });

    const initialValues = {
        name: "",
        phone: "",
        ssn: "",
        socialStatus: "",
        email: "",
        password: "",
        confirmPassword: "",
        hobby: "",
        healthStatus: "",
        job: "",
        salary: "",
        nationality: "",
        subscriptionType: "",
        membershipType: "",
        ...initialData,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().test("four-words", t.errors.name, val => val?.trim().split(" ").length >= 4).required(),
        phone: Yup.string().required(t.errors.phone),
        ssn: Yup.string().required(t.errors.ssn).length(14),
        email: Yup.string().email().required(),
        password: Yup.string()
            .min(6)
            .matches(/[A-Z]/i)
            .matches(/[0-9]/)
            .matches(/[!@#$%^&*]/)
            .required(t.errors.password),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], t.errors.confirmPassword)
            .required(t.errors.confirmPassword),
        job: Yup.string().required(t.errors.job),
        // salary: Yup.mixed().when("job", {
        //     is: (val) => val?.toLowerCase() !== "student",
        //     then: Yup.number()
        //         .typeError(t.errors.salary)
        //         .required(t.errors.salary),
        //     otherwise: Yup.number()
        //         .typeError(t.errors.salary)
        //         .notRequired(),
        // }),
        nationality: Yup.string().required(),
        subscriptionType: Yup.string().required(),
        membershipType: Yup.string().required(),
    });

    // SSN auto logic
    const handleSSNChange = (val, setFieldValue) => {
        if (val.length === 14) {
            const century = val[0] === "2" ? 1900 : 2000;
            const birthYear = century + parseInt(val.slice(1, 3));
            const currentYear = new Date().getFullYear();
            const age = currentYear - birthYear;

            const genderDigit = parseInt(val.slice(12, 13));
            const computedGender = genderDigit % 2 === 0 ? t.gender[1] : t.gender[0];

            setFieldValue("age", age);
            setDynamicFields((prev) => ({ ...prev, gender: computedGender }));
        }
    };

    // Job logic
    const handleJobChange = (val, setFieldValue) => {
        const job = val;
        const isStudent = job === lang[language].jobTypes[8];
        setDynamicFields((prev) => ({
            ...prev,
            isStudent,
            salaryDisabled: isStudent,
            membershipDisabled: job !== lang[language].jobTypes[111] ,
        }));
        if (isStudent) {
            setFieldValue("salary", "0.0");
        }
    };

    // Nationality logic
    const handleNationalityChange = (val, setFieldValue) => {
        const isForeigner = val.toLowerCase().includes("foreign");
        setDynamicFields((prev) => ({ ...prev, isForeigner }));
        if (isForeigner) {
            setFieldValue("membershipType", "foreigner sessonal member");
            setFieldValue("subscriptionType", "month");
        }
    };

    return (
        <div className="step-container" dir={dir}>
            <h3>{t.createAccount}</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={next}
            >
                {({ values, setFieldValue, handleChange }) => (
                    <Form>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>{t.fields.name.label}</label>
                                <Field name="name" className="form-control" placeholder={t.fields.name.placeholder} />
                                <ErrorMessage name="name" component="div" className="text-danger small" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>{t.fields.phone.label}</label>
                                <Field name="phone" className="form-control" placeholder={t.fields.phone.placeholder} />
                                <ErrorMessage name="phone" component="div" className="text-danger small" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>{t.fields.ssn.label}</label>
                                <Field
                                    name="ssn"
                                    className="form-control"
                                    placeholder={t.fields.ssn.placeholder}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleSSNChange(e.target.value, setFieldValue);
                                    }}
                                />
                                <ErrorMessage name="ssn" component="div" className="text-danger small" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>{t.fields.email.label}</label>
                                <Field name="email" type="email" className="form-control" placeholder={t.fields.email.placeholder} />
                                <ErrorMessage name="email" component="div" className="text-danger small" />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>{t.fields.password.label}</label>
                                <Field name="password" type="password" className="form-control" placeholder="**********" />
                                <ErrorMessage name="password" component="div" className="text-danger small" />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>{t.fields.confirmPassword.label}</label>
                                <Field name="confirmPassword" type="password" className="form-control" placeholder="**********" />
                                <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>{t.fields.job.label}</label>
                                <Field
                                    as="select"
                                    name="job"
                                    className="form-select"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleJobChange(e.target.value, setFieldValue);
                                    }}
                                >
                                    <option value="">--</option>
                                    {jobTypes.fields.map((j, idx) => (
                                        <option key={idx} value={j}>{j}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="job" component="div" className="text-danger small" />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>{t.fields.salary.label}</label>
                                <Field
                                    name="salary"
                                    className="form-control"
                                    disabled={dynamicFields.salaryDisabled}
                                />
                                <ErrorMessage name="salary" component="div" className="text-danger small" />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>{t.fields.nationality.label}</label>
                                <Field
                                    as="select"
                                    name="nationality"
                                    className="form-select"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleNationalityChange(e.target.value, setFieldValue);
                                    }}
                                >
                                    <option value="">--</option>
                                    {nationality.fields.map((n, idx) => (
                                        <option key={idx} value={n}>{n}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="nationality" component="div" className="text-danger small" />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>{t.fields.subscriptionType.label}</label>
                                <Field as="select" name="subscriptionType" className="form-select">
                                    <option value="">--</option>
                                    {subscriptionType.fields.map((s, idx) => (
                                        <option key={idx} value={s}>{s}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="subscriptionType" component="div" className="text-danger small" />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>{t.fields.membershipType.label}</label>
                                <Field
                                    as="select"
                                    name="membershipType"
                                    className="form-select"
                                    // disabled={dynamicFields.membershipDisabled}
                                >
                                    <option value="">--</option>
                                    {membership.fields.map((m, idx) => (
                                        <option key={idx} value={m}>{m}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="membershipType" component="div" className="text-danger small" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <button className="btn btn-primary w-100" type="submit">
                                    {t.next}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Step1;
