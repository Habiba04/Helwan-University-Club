import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
import './Tables.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import useProfileFieldsRoles from './../../shared/services/useProfileFields';
import { LanguageContext } from './../../context/LanguageProvider.context';
import { useContext } from 'react';
import lang from './../../assets/lang/language';

const MembersList = () => {
    // const navigate = useNavigate();
    const [Members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const MembersPerPage = 10;

    const [searchTerm, setSearchTerm] = useState('');

    const { jobTypes } = useProfileFieldsRoles();

    const { language } = useContext(LanguageContext);
    const langs = lang[language];




    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //to be replaced with instance
            const res = await axios.get(`http://localhost:7183/Members`);
            setMembers(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    



    // Pagination logic
    const indexOfLastRequest= currentPage * MembersPerPage;
    const indexOfFirstRequest = indexOfLastRequest - MembersPerPage;

    const filteredMembers = Members.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.memberId && r.memberId.includes(searchTerm))
    );
    
    const totalPages = Math.ceil(filteredMembers.length / MembersPerPage);
    const currentMembers = filteredMembers.slice(indexOfFirstRequest, indexOfLastRequest);
    

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
            </div>

            </div>

            <div >
                <table dir={langs.direction} className="table table-hover text-center">
                    <thead className="table-secondary">
                        <tr>
                            <th className='w-auto'>{langs.membersId}</th>
                            <th className='w-auto text-break'>{langs.fields.name.label}</th>
                            <th className="w-auto text-break">{langs.fields.ssn.label}</th>
                            <th className="w-auto text-break">{langs.fields.job.label}</th>
                            <th className="w-auto text-break">{langs.fields.status.label}</th>
                            <th className="text-center" style={{minWidth:"80px"}}>{langs.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMembers.map(member => (
                            <tr key={member.id}>
                                <td>{member.memberId}</td>
                                <td className="text-break">{member.name}</td>
                                <td className="text-break">{member.ssn}</td>
                                <td className="text-break">{jobTypes.fields[member.job - jobTypes.start]}</td>
                                <td className="text-break" style={{ color: member.status === 'لم يدفع الإستمارة' ? '#AD8700' : member.status === 'لم يدفع الإشتراك' ? 'green' : 'red'}}>{member.status}</td>
                                <td className="text-center" style={{alignContent:"center"}}>
                                    {/* TODO: onClick={() => navigate(`/staff/${request.id}`)} */}
                                    <button className="btn my-btn-primary" >
                                        <FontAwesomeIcon icon={faEye} />
                                        <span className="me-2 ms-2">
                                        {langs.view}
                                        </span></button>
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

export default MembersList;