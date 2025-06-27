import { useEffect, useState, useContext } from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Tables.css';
// import useProfileFieldsRoles from './../../shared/services/useProfileFields';
import { LanguageContext } from '../../context/LanguageProvider.context';

import lang from '../../assets/lang/language';
import api from '../../data/Api';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter,faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

const LogsList = () => {
    // const navigate = useNavigate();
    const [Logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const LogsPerPage = 10;

    const {user} = useAuth();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // const { jobTypes } = useProfileFieldsRoles();

    const { language } = useContext(LanguageContext);
    const langs = lang[language];




    useEffect(() => {
        if(!user || !currentPage) return
        console.log("useEffect called");
        console.log(currentPage)
        console.log(totalPage)
        fetchData();
    }, [user,startDate,endDate,currentPage]); 

    const fetchData = async () => {
        try {
            //to be replaced with instance
            // const res = await axios.get(`http://localhost:7183/Logs`);
            /*
            
             "id": 230,
        "userID": "2b6e7d7a-3095-4eb7-b702-edf3638799b2",
        "userName": "SuperAdmin@gmail.com",
        "type": 1,
        "timeStamp": "2025-06-23T11:13:33.4491442",
        "message": "[محاولة تسجيل دخول] البريد الإلكتروني: SuperAdmin@gmail.com\r\n[نجاح] تم تسجيل الدخول بنجاح.\r\n"
      },
            */
            const res = await api.get(`Logs/${language}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
                params: {
                    // PageIndex=1 & PageSize=30& StartDate=2025-06 - 22 & EndDate=2025-12 - 30'
                    PageIndex: isNaN(currentPage) ? 1 : currentPage,
                    PageSize: LogsPerPage,
                    StartDate: startDate??null,
                    EndDate: endDate??null
                }
            });
            console.log(res.data.data.logs)
            setLogs(res.data.data.logs);
            console.log(res.data.data.metadata)
            setCurrentPage(res.data.data.metadata.pagination?.pageIndex);
            setTotalPage(res.data.data.metadata.pagination?.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    



    // Pagination logic
    // const indexOfLastRequest= currentPage * LogsPerPage;
    // const indexOfFirstRequest = indexOfLastRequest - LogsPerPage;

    //in the format (yyyy-mm-dd)
    // const filteredLogs = Logs.filter(log => {
    //     if (!startDate && !endDate) return true;
        
    //         const logDate = new Date(log.date);
    //         const start = startDate ? new Date(startDate) : null;
    //         const end = endDate ? new Date(endDate) : null;
        
    //         if (start && end) {
    //         return logDate >= start && logDate <= end;
    //         } else if (start) {
    //         return logDate >= start;
    //         } else if (end) {
    //         return logDate <= end;
    //         }
        
    //         return true;
    //     });
        
    
    // const totalPages = Math.ceil(filteredLogs.length / LogsPerPage);
    // const currentLogs = filteredLogs.slice(indexOfFirstRequest, indexOfLastRequest);
    

    return (
        <div dir={langs.direction} className='p-4 bg-light min-vh-100'>


            <div className="row mb-4">
                <div className="col-1  d-flex flex-row justify-content-center align-items-center">
                <button className='btn btn-outline-danger' onClick={() => {
                    setStartDate('');
                    setEndDate('');
                    setCurrentPage(1);
                }}> 
                        <FontAwesomeIcon icon={faDeleteLeft} size='lg' /> 
                        {/* <FontAwesomeIcon icon={faFilter} size='sm'/> */}
                </button>
                </div>
            <div className="col-md-3 mb-2 d-flex flex-row justify-content-center align-items-center">
                <label className="form-label ms-3">{langs.startDate}</label>
                <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => {
                    setStartDate(e.target.value);
                    setCurrentPage(1);
                }}
                />
            </div>
                <div className="col-md-3 mb-2 d-flex flex-row justify-content-center align-items-center">
                <label className="form-label mx-3">{langs.endDate}</label>
                <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => {
                    setEndDate(e.target.value);
                    setCurrentPage(1);
                }}
                />
            </div>
            </div>


            <div >
                <table dir={langs.direction} className="table table-hover text-center">
                    <thead className="table-secondary">
                        <tr>
                            <th className='w-auto'>{langs.userID}</th>
                            <th className='w-auto text-break'>{langs.userName}</th>
                            <th className="w-auto text-break">{langs.date}</th>
                            <th className="w-auto text-break "><span className='mx-5'>{langs.type}</span></th>
                            <th className="w-auto text-break">{langs.message}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Logs?.length > 0 && Logs?.map(log => ( 
                            <tr key={log.id}>
                                <td>{log.userID}</td>
                                <td className="text-break">{log.userName}</td>
                                <td className="text-break">{log.timeStamp}</td>
                                {/* <td className="text-break">{jobTypes.fields[log.job - jobTypes.start]}</td> */}
                                <td className="text-break"><span className="mx-5">{langs.logs[log.type - 1]}</span></td>
                                <td className="text-break">{log.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        <li className='page-item ' >
                            <button className="page-link rounded-0" disabled={currentPage === 1}  onClick={() => setCurrentPage(prev => {
                                // console.log(prev);
                                return isNaN(prev - 1) ? 1 : prev - 1
                            })}>{langs.back}</button>
                        </li>
                        <li className={`page-item `}>
                            <button className="page-link rounded-0" disabled={currentPage === totalPage && !isNaN(totalPage)} onClick={() => setCurrentPage(prev => {
                                // console.log(prev);
                                return  (prev + 1)
                            })}>{langs.next}</button>
                        </li> 
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default LogsList;