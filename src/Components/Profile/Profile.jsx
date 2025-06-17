import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPen, faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import Notice from './../Notice'

const defaultProfile = {
    name: 'Ahmeed Sayed Zaki Kamel',
    membershipType: 'عضو عامل',
    subscriptionType: 'سنوي أو شهري',
    nationality: 'مصري',
    phone: '01*********',
    age: '45',
    nationalId: '20**************',
    salary: '20313',
    job: 'Teaching Assistant',
    hobbies: 'Swimming, Padel',
    hasPaid: false
};

export default function PersonalProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(defaultProfile);

    useEffect(() => {
        if (id && id !== '0') {
            // TODO: fetch profile by id and setProfile
        }
    }, [id]);

    return (
        <div className="profile-wrapper" >
            <Notice name={profile.name} cost="250" hasPaid={profile.hasPaid}/>
            <div className="profile-card">
                <div className="profile-header">1919</div>
                <h2 className="profile-title">ملف شخصي</h2>

                <div className="profile-main" dir='ltr'>
                    <div className="left-col">
                        <div className="avatar">
                            <img src="https://via.placeholder.com/120" alt="avatar" />
                        </div>
                        <div className="upload-list">
                            {['البطاقة الشخصية', 'تقرير طبي', 'إثبات الدخل'].map((label) => (
                                <div key={label} className="upload-item" dir='rtl'>
                                    <FontAwesomeIcon icon={faImage} size="lg" />
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="right-col" dir='rtl'>
                        <div className="form-group">
                            <label>الاسم الرباعي</label>
                            <input value={profile.name} readOnly />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>نوع العضويه</label>
                                <input value={profile.membershipType} readOnly />
                            </div>
                            <div className="form-group">
                                <label>نظام الاشتراك</label>
                                <input value={profile.subscriptionType} readOnly />
                            </div>
                            <div className="form-group">
                                <label>الجنسية</label>
                                <input value={profile.nationality} readOnly />
                            </div>
                        </div>
                        {['phone', 'age', 'nationalId', 'salary', 'job', 'hobbies'].map((key, idx) => {
                            const labels = {
                                phone: 'رقم الهاتف',
                                age: 'العمر',
                                nationalId: 'الرقم القومي',
                                salary: 'الراتب',
                                job: 'الوظيفة',
                                hobbies: 'الهوايات'
                            };
                            return (
                                <div key={key} className="form-group">
                                    <label>{labels[key]}</label>
                                    <input value={profile[key]} readOnly />
                                </div>
                            );
                        })}

                        <div className="btn-row">
                            <button className="btn edit"><FontAwesomeIcon icon={faEdit} /> تعديل</button>
                            <button className="btn open"><FontAwesomeIcon icon={faPen} /> فتح التعديل</button>
                            <button className="btn cancel"><FontAwesomeIcon icon={faTimes} /> التعديل ملغي</button>
                            <button className="btn save"><FontAwesomeIcon icon={faCheck} /> حفظ التعديل</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
