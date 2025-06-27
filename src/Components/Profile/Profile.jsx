import React, { useEffect, useState , useContext} from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPen, faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import Notice from './../Notice'
import { LanguageContext } from '../../context/LanguageProvider.context';
import lang from './../../assets/lang/language';
import { api } from './../../data/Api';
import { useAuth } from '../../context/AuthContext';
import useProfileFieldsRoles  from './../../shared/services/useProfileFields';

const defaultProfile = {
    name: 'Ahmeed Sayed Zaki Kamel',
    membershipType: 'عضو عامل',
    subscriptionType: 'سنوي أو شهري',
    nationality: 'مصري',
    phone: '01*********',
    age: '45',
    ssn: '20**************',
    salary: '20313',
    job: 'Teaching Assistant',
    hobbies: 'Swimming, Padel',
    hasPaid: true,
    gender: 1,
    role: 'staffmembership',
    ssnImage: "",
    faceImage: "",
    medicalRecordImage: "",
    salaryProve: "",
    dependent: [],
    memberId: 0,
    dob:"yyyy-mm-dd"
};

export default function PersonalProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(defaultProfile);
    const { language } = useContext(LanguageContext);
    const { user } = useAuth(); 
    const [loader, setLoader] = useState(false);
    const { jobTypes, membership, subscriptionType,nationality,gender} = useProfileFieldsRoles();
    const getProfile = async (id,token)=> {
        try {
            setLoader(true);
            console.log(sessionStorage.getItem("token").token);
            const response = await api.get(`Member/memberViewProfile/${id}/${language}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProfile({...response.data.data});
            
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoader(false);
        }
    }
    useEffect(() => {
        if (id && id !== '0'&& user) {
            // TODO: fetch profile by id and setProfile
            getProfile(id,user.token);
        }
    }, [id,user]);

    if (loader) {
        return (
            <div className="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="loader-inner">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="loader-line-wrap">
                            <div className="loader-line"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="profile-wrapper" >
            <Notice name={profile.name} cost="250" hasPaid={profile.hasPaid} />
            <div className="profile-card">
                <div className="profile-header">{profile.memberId }</div>
                <h2 className="profile-title">{lang[language].profileLink}</h2>

                <div className="profile-main" dir="ltr"> 
                    <div className="left-col">
                        <div className="avatar">
                            <img
                                src={profile.faceImage === "" ? "/Logos/avatar.jpeg" : profile.faceImage}
                                alt="avatar"
                                style={{ width: "100%", maxWidth: "120px", borderRadius: "50%", objectFit: "cover" }}
                            />

                        </div>
                        <div className="upload-list">
                            {[lang[language].fields.ssnImage.label, lang[language].fields.medicalReport.label, lang[language].fields.salaryProof.label].map((label) => {
                                let imageSrc = "";
                                if (label === lang[language].fields.ssnImage.label && profile.ssnImage) {
                                    imageSrc = profile.ssnImage;
                                } else if (label === lang[language].fields.medicalReport.label && profile.medicalRecordImage) {
                                    imageSrc = profile.medicalRecordImage;
                                } else if (label === lang[language].fields.salaryProof.label && profile.salaryProve) {
                                    imageSrc = profile.salaryProve;
                                }

                                return imageSrc ? (
                                    <div key={label} className="upload-item d-flex flex-column" dir={lang[language].direction}>
                                        <img src={imageSrc} alt='upload' width="100px" />
                                        <span>{label}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>

                    <div className="right-col" dir={lang[language].direction}>
                        <div className="form-group">
                            <label>{lang[language].fields.name.label}</label> 
                            <input value={profile.name} readOnly dir={lang[language].direction} disabled={true}/>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>{lang[language].fields.membershipType.label}</label> 
                                <input value={membership.fields[profile.membershipType-membership.start]} readOnly disabled={true} />
                            </div>
                            <div className="form-group">
                                <label>{lang[language].fields.subscriptionType.label }</label>
                                <input value={subscriptionType.fields[profile.subscriptionType==2?0: profile.subscriptionType == 0? 2: 1]} readOnly disabled={true} />
                            </div>
                            <div className="form-group">
                                <label>{lang[language].fields.nationality.label }</label>
                                <input value={nationality.fields[profile.nationality - nationality.start ]} readOnly disabled={true} />
                            </div>
                        </div>
                        {[lang[language].fields.phone.label, lang[language].fields.DOB.label, lang[language].fields.gender.label, lang[language].fields.salary.label, lang[language].fields.job.label, lang[language].fields.hobby.label].map((key, idx) => {
            
                            return ( 
                                <div key={key} className="form-group">
                                    <label>{key}</label>
                                    {/* TODO: remove disabled to allow edit */}
                                    {(key === lang[language].fields.gender.label) &&
                                        <input value={gender.fields[profile.gender - gender.start]} readOnly disabled={true} />
                                    }
                                    {(key === lang[language].fields.job.label) &&
                                        <input value={jobTypes.fields[profile.job - jobTypes.start]} readOnly disabled={true} />
                                    }
                                    {(key == lang[language].fields.DOB.label) &&
                                        <input value={profile["dob"]} readOnly disabled={true}/>
                                    }
                                    {(key == lang[language].fields.phone.label) &&
                                        <input value={profile["phone"]} readOnly disabled={true}/>
                                    }
                                    {(key == lang[language].fields.hobby.label) && 
                                        <input value={profile["hobbies"]} readOnly disabled={true}/>
                                    }
                                    {(key == lang[language].fields.salary.label) && 
                                        <input value={profile["salary"]} readOnly disabled={true}/> 
                                    }
                                </div>
                            ); 
                        })}

                        {/* TODO: fix and connect action button */}
                        {/* <div className="btn-row">
                            <button className="btn edit"><FontAwesomeIcon icon={faEdit} /> { lang[language].edit} </button>
                            <button className="btn open"><FontAwesomeIcon icon={faPen} /> {lang[language].openEdit} </button>
                            <button className="btn cancel"><FontAwesomeIcon icon={faTimes} /> {lang[language].cancel } </button>
                            <button className="btn save"><FontAwesomeIcon icon={faCheck} /> { lang[language].save} </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
