import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Tables.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// import useProfileFieldsRoles from './../../shared/services/useProfileFields';
import { LanguageContext } from './../../context/LanguageProvider.context';
import { useContext } from 'react';
import lang from './../../assets/lang/language';
// import { type } from './../../../node_modules/axios/index.d';

const ProfileList = () => {
    // const navigate = useNavigate();
    const [Profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ProfilesPerPage = 10;

    const [searchTerm, setSearchTerm] = useState('');

    // const { jobTypes } = useProfileFieldsRoles();

    const { language } = useContext(LanguageContext);
    const langs = lang[language];




    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //to be replaced with instance
            const res = await axios.get(`http://localhost:7183/Profiles`);
            setProfiles(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    



    // Pagination logic
    const indexOfLastRequest= currentPage * ProfilesPerPage;
    const indexOfFirstRequest = indexOfLastRequest - ProfilesPerPage;

    const filteredProfiles = Profiles.filter(r =>
        r.memberid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.memberid && r.memberid.includes(searchTerm))
    );
    
    const totalPages = Math.ceil(filteredProfiles.length / ProfilesPerPage);
    const currentProfiles = filteredProfiles.slice(indexOfFirstRequest, indexOfLastRequest);
    

    return (
        <div dir={langs.direction} className='p-4 bg-light min-vh-100'>


            <div className="search">
            <div className="mb-4 row">
                <div className="col-md-3 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={langs.fields.search.placeholder}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="col-md-4 d-flex gap-2 mb-2">
                    <button type="button" className="btn my-btn-outline-primary d-flex align-items-center">
                        <span className="mx-2">{langs.login}</span>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button type="button" className="btn my-delete d-flex align-items-center">
                        <span className='mx-2'>{langs.logout}</span>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
            </div>

            </div>

            <div >
                <table dir={langs.direction} className="table table-hover text-center">
                    <thead className="table-secondary">
                        <tr>
                            <th className='w-auto'>{langs.image}</th>
                            <th className="w-auto text-break">{langs.membersId}</th>
                            <th className='w-auto text-break'>{langs.fields.name.label}</th>
                            <th className="w-auto text-break">{langs.fields.membershipType.label}</th>
                            <th className="w-auto text-break">{langs.fields.status.label}</th>
                            <th className="text-center" style={{minWidth:"80px"}}>{langs.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProfiles.map(Profile => (
                            <tr key={Profile.id}>
                                <td>{Profile.img}</td>
                                <td className="text-break">{Profile.memberid}</td>
                                <td className="text-break">{Profile.name}</td>
                                <td className="text-break">{Profile.type}</td>
                                {/* <td className="text-break">{jobTypes.fields[Profile.job - jobTypes.start]}</td> */}
                                <td className="text-break" style={{ color: Profile.status === 'تم التجديد' ? 'green' : 'red'}}>{Profile.status}</td>
                                <td className="text-center" style={{alignContent:"center"}}>
                                    <input type="checkbox" className="form-check-input" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link rounded-0" onClick={() => setCurrentPage(currentPage - 1)}>{langs.back}</button>
                        </li>
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link rounded-0" onClick={() => setCurrentPage(currentPage + 1)}>{langs.next}</button>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default ProfileList;