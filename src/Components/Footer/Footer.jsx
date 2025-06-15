import React, { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageProvider.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faXTwitter, faThreads, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'
import lang from '../../assets/lang/language';
import { Link } from 'react-router-dom'

const Footer = () => {
    const { language } = useContext(LanguageContext);



    return (
        <div className="footer " dir={lang[language].direction}>
            <div className="image-container">
                <div className='overlay'>
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
                                    <a href="https://www.threads.com/@helwan.university.club?hl=en" className="threads">
                                        <FontAwesomeIcon icon={faThreads} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/helwan.university.club?igsh=b3V2NzVuYXoxOXdu" className="instagram">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://youtube.com/@helwanuniversityclub?si=-h78Iqw0O_XfxKD_" className="youtube">
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://x.com/Helwan_HUC" className="x-twitter">
                                        <FontAwesomeIcon icon={faXTwitter} />
                                    </a>
                                </li>
                            </ul>
                            <div className="text-div" dir={lang[language].direction}>
                                <p className="text" dir={lang[language].direction}>{lang[language].followusSection}</p>
                            </div>
                        </div>
                        <div className="box">
                            <ul className="links">
                                <li dir={lang[language].direction}>
                                    <span>
                                        <FontAwesomeIcon icon={lang[language].direction === "rtl" ? faAnglesLeft : faAnglesRight} />
                                    </span>
                                    <Link to="/home#top" dir={lang[language].direction}>
                                        {lang[language].homeLink}
                                    </Link>
                                </li>
                                <li dir={lang[language].direction}>
                                    <span>
                                        <FontAwesomeIcon icon={lang[language].direction === "rtl" ? faAnglesLeft : faAnglesRight} />
                                    </span>
                                    <Link to="/home#about" dir={lang[language].direction} >
                                        {lang[language].aboutusSection}
                                    </Link>
                                </li>
                                <li dir={lang[language].direction}>
                                    <span>
                                        <FontAwesomeIcon icon={lang[language].direction === "rtl" ? faAnglesLeft : faAnglesRight} />
                                    </span>
                                    <Link to="/home#activities" dir={lang[language].direction}>
                                        {lang[language].clubActivitiesSection}
                                    </Link>
                                </li>

                                <li dir={lang[language].direction}>
                                    <span>
                                        <FontAwesomeIcon icon={lang[language].direction === "rtl" ? faAnglesLeft : faAnglesRight} />
                                    </span>
                                    <Link to="/register" dir={lang[language].direction}>
                                        {lang[language].becomeMember}
                                    </Link>
                                </li>

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
