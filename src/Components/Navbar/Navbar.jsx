import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageProvider.context';
import "./Navbar.css"
import { NavLink, useNavigate } from 'react-router-dom';
import lang from '../../assets/lang/language';
import { Collapse } from 'bootstrap/dist/js/bootstrap.min'; 
const Navbar = () => {
    // const { isLoggedIn, role } = JSON.parse(localStorage.getItem('toekn'));
    // const { isLoggedIn, role } = { isLoggedIn: true, role: 'admin' };
    // const { isLoggedIn, role } = { isLoggedIn: true, role: 'staffMembership' };
    const { isLoggedIn, role } = { isLoggedIn: true, role: 'member' };
    const navigate = useNavigate();
    let {language, changeLanguage} = useContext(LanguageContext);

    // Collapse menu on item click
    const collapseNavbar = () => {
        const menu = document.getElementById('navbarSupportedContent');
        if (menu && menu.classList.contains('show')) {
            const bsCollapse = new Collapse(menu, {
                toggle: false
            });
            bsCollapse.hide();
        }
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/home" onClick={collapseNavbar} >
                        <img src="/assets/logo.png" alt="HUC" style={{width:"80px"}}/>
                    </NavLink>
                    <button onClick={collapseNavbar} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" onClick={collapseNavbar}>
                                <NavLink className={({ isActive }) => isActive ? "nav-link activeLink" : "nav-link idealLink"}
                                    to="/home">
                                    {lang[language].homeLink}
                                <span/>
                                </NavLink>
                            </li>

                            {role === 'admin' && isLoggedIn && (
                                <>
                                    <li className="nav-item" onClick={collapseNavbar}>
                                    <NavLink className={({ isActive }) => isActive ? "nav-link activeLink" : "nav-link idealLink"}
                                        to="/members">
                                            {lang[language].requestMembershipLink}
                                        <span/>
                                    </NavLink>
                                    </li>
                                    <li className="nav-item" onClick={collapseNavbar}>
                                    <NavLink className={({ isActive }) => isActive ? "nav-link activeLink" : "nav-link idealLink"}
                                        to="/staff">
                                            {lang[language].employeesListLink}
                                        <span/>
                                    </NavLink>
                                    </li>
                                </>
                            )} 
                            {role === 'staffMembership' && isLoggedIn && (
                                
                                    <li className="nav-item" onClick={collapseNavbar}>
                                    <NavLink className={({ isActive }) => isActive ? "nav-link activeLink" : "nav-link idealLink"}
                                        to="/members">
                                            {lang[language].requestMembershipLink}
                                        <span/>
                                    </NavLink>
                                    </li>
                                
                            )} 

                            {role === 'member' && isLoggedIn && (
                                <>
                                    <li className="nav-item" onClick={collapseNavbar}>
                                        <NavLink className={({ isActive }) => isActive ? "nav-link activeLink" : "nav-link idealLink"}
                                            to="/member/billing">
                                            {lang[language].billingLink}
                                            <span />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item" onClick={collapseNavbar}>
                                        <NavLink className={({ isActive }) => isActive ? "nav-link activeLink" : "nav-link idealLink"}
                                            to="/member/cards">
                                            {lang[language].cardsLink}
                                            <span />
                                        </NavLink>
                                    </li>
                                </>
                            )} 
                        </ul>

                        <div className="d-flex" role="search">
                            <select onChange={(e) => {
                                language = changeLanguage(e.target.value);
                            }} value={language} name='lang'>
                                <option value="ar">عربي</option>
                                <option value="en">english</option>
                            </select>
                            {!isLoggedIn && (
                                <>
                                    <button className="btn my-btn-outline-info mx-1" onClick={() => {
                                        navigate("/login")
                                        collapseNavbar();
                                    }} >{lang[language].login}</button>
                                    <button className="btn my-btn-outline-info mx-1" onClick={() => {
                                        navigate("/register")
                                        collapseNavbar();
                                    }}>{lang[language].register}</button>
                                </>
                            )}
                            {isLoggedIn &&  role === 'member' && (
                                <button className="btn my-btn-outline-info mx-1" onClick={() => {
                                    navigate("/profile/0")
                                    collapseNavbar();
                                }}>{lang[language].profileLink}</button>
                            )}
                            {isLoggedIn && (
                                <button className="btn my-btn-outline-info mx-1" onClick={
                                    () => {
                                        logout();
                                        collapseNavbar();
                                    }
                                }>{lang[language].logout}</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
