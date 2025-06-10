import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faXTwitter, faThreads, faYoutube } from '@fortawesome/free-brands-svg-icons'
import {faAnglesLeft} from '@fortawesome/free-solid-svg-icons'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer" dir='rtl'>
            <div className="overlay">
            <div >
        <div className="container">
            <div className="box">
                <div>
                    <img src="/assets/logo.png" alt="" />
                </div>
                <ul className="social">
                    <li>
                        <a href="https://www.facebook.com/share/1AWwYkwbG7/" className="facebook">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/helwan.university.club?igsh=b3V2NzVuYXoxOXdu" className="instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </li>
                    <li>
                        <a href="https://x.com/Helwan_HUC" className="x-twitter">
                        <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.threads.com/@helwan.university.club?hl=en" className="threads">
                        <FontAwesomeIcon icon={faThreads} />
                        </a>
                    </li>
                    <li>
                        <a href="https://youtube.com/@helwanuniversityclub?si=-h78Iqw0O_XfxKD_" className="youtube">
                        <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </li>
                </ul>
                <p className="text">تابعنا ليصلك كل جديد!</p>
            </div>
            <div className="box">
                <ul className="links">
                    <li><span><FontAwesomeIcon icon={faAnglesLeft} /></span><a href="#home">الصفحة الرئيسية</a></li>
                    <li><span><FontAwesomeIcon icon={faAnglesLeft} /></span><a href="#about">من نحن</a></li>
                    <li><span><FontAwesomeIcon icon={faAnglesLeft} /></span><a href="#activities">أنشطة النادي</a></li>
                    <li><span><FontAwesomeIcon icon={faAnglesLeft} /></span><a href="#register">أصبح عضو</a></li>
                </ul>
            </div>

            
        </div>
        <p className="copyright" dir='ltr'>&copy; Helwan University Club 2025 Copyright. All rights reserved.</p>
    </div>
    </div>
        </div>
    )
}

export default Footer
