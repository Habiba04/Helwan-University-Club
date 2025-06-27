import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
import './Tables.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import useProfileFieldsRoles from './../../shared/services/useProfileFields';
import { LanguageContext } from './../../context/LanguageProvider.context';
import { useContext } from 'react';
import lang from './../../assets/lang/language';
import api from '../../data/Api';
import { useAuth } from '../../context/AuthContext';

const MembersList = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [Members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const MembersPerPage = 10;

    const [searchTerm, setSearchTerm] = useState('');

    const { jobTypes, subscriptionStatus } = useProfileFieldsRoles();

    const { language } = useContext(LanguageContext);
    const langs = lang[language];



    const [totalPages, setTotalPages] = useState(0);
    const [currentMembers, setCurrentMembers]  = useState(0);


    useEffect(() => {
        fetchData();
    }, [user,language,searchTerm]);
 
    const fetchData = async () => {
        if(!user) return
        try {
            //to be replaced with instance
            // https://localhost:7016/api/Member/getAllMembers/ar?PageIndex=1&PageSize=5
            const res = await api.get(`Member/getAllMembers/${language}?PageIndex=${currentPage}&PageSize=${MembersPerPage}`, {
                headers: { Authorization: `Bearer ${user.token}` },
                params: {
                    ...(searchTerm.toString().match(/^\d+$/)
                        ? { Ssn: searchTerm }
                        : { Name: searchTerm }),
                }
            });
            console.log(res.data)
            setMembers(res.data.data);
            setCurrentPage(res.data.pagination.pageIndex);
            setCurrentMembers(res.data.pagination.totalRecords);
            setTotalPages(res.data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    


    

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
                        {Members.length > 0 && Members.map((member,i) => (
                            <tr key={member.id}>
                                <td>{member.memberId}</td>
                                <td className="text-break">{member.name}</td>
                                <td className="text-break">{member.ssn}</td>
                                <td className="text-break">{jobTypes.fields[member.job - jobTypes.start]}</td>
                                <td className="text-break" style={{ color: member.isApplicationPaid === false ? '#AD8700' : member.subscriptionStatus === 1 ? 'red' : 'green'}}>{subscriptionStatus.fields[member.subscriptionStatus - subscriptionStatus.start]}</td>
                                <td className="text-center" style={{alignContent:"center"}}>
                                    {/* TODO: onClick={() => navigate(`/staff/${request.id}`)} */}
                                    <button className="btn my-btn-primary" onClick={() => navigate(`/profile/${member.id}`)} testid={`view-${i}`}>
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