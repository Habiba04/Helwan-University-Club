import React from 'react';
import "./Navbar.css"

const Navbar = ({ isLoggedIn, role }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#home" >
                        <img src="/assets/logo.png" alt="HUC" style={{width:"80px"}}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">الصفحة الرئيسية</a>
                            </li>

                            {role === 'admin' && isLoggedIn && (
                                <li className="nav-item">
                                    <a className="nav-link" href="#">قائمة طلبات العضوية</a>
                                </li>
                            )}

                            {role === 'member' && isLoggedIn && (
                                <li className="nav-item">
                                    <a className="nav-link" href="#">مصروفات</a>
                                </li>
                            )}
                        </ul>

                        <div className="d-flex" role="search">
                            {!isLoggedIn && (
                                <>
                                    <button className="btn btn-outline-info mx-1">تسجيل دخول</button>
                                    <button className="btn btn-outline-info mx-1">إنشاء حساب</button>
                                </>
                            )}

                            {isLoggedIn && (
                                <button className="btn btn-outline-info mx-1">تسجيل خروج</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
