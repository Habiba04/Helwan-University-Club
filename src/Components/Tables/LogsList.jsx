import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Tables.css';
// import useProfileFieldsRoles from './../../shared/services/useProfileFields';
import { LanguageContext } from '../../context/LanguageProvider.context';
import { useContext } from 'react';
import lang from '../../assets/lang/language';

const LogsList = () => {
    // const navigate = useNavigate();
    const [Logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const LogsPerPage = 10;


    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // const { jobTypes } = useProfileFieldsRoles();

    const { language } = useContext(LanguageContext);
    const langs = lang[language];




    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //to be replaced with instance
            const res = await axios.get(`http://localhost:3000/Logs`);
            setLogs(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    



    // Pagination logic
    const indexOfLastRequest= currentPage * LogsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - LogsPerPage;

    //in the format (yyyy-mm-dd)
    const filteredLogs = Logs.filter(log => {
        if (!startDate && !endDate) return true;
        
            const logDate = new Date(log.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
        
            if (start && end) {
            return logDate >= start && logDate <= end;
            } else if (start) {
            return logDate >= start;
            } else if (end) {
            return logDate <= end;
            }
        
            return true;
        });
        
    
    const totalPages = Math.ceil(filteredLogs.length / LogsPerPage);
    const currentLogs = filteredLogs.slice(indexOfFirstRequest, indexOfLastRequest);
    

    return (
        <div dir={langs.direction} className='p-4 bg-light min-vh-100'>


            <div className="row mb-4">
            <div className="col-md-3 mb-2">
                <label className="form-label">{langs.startDate}</label>
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
            <div className="col-md-3 mb-2">
                <label className="form-label">{langs.endDate}</label>
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
                            <th className="w-auto text-break">{langs.type}</th>
                            <th className="w-auto text-break">{langs.message}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLogs.map(log => (
                            <tr key={log.id}>
                                <td>{log.userId}</td>
                                <td className="text-break">{log.userName}</td>
                                <td className="text-break">{log.date}</td>
                                {/* <td className="text-break">{jobTypes.fields[log.job - jobTypes.start]}</td> */}
                                <td className="text-break">{log.type}</td>
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

export default LogsList;