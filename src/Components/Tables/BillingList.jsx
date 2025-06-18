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

const BillingList = () => {
    // const navigate = useNavigate();
    const [Billing, setBilling] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const BillingPerPage = 10;


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
            const res = await axios.get(`http://localhost:7183/Billing`);
            setBilling(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    



    // Pagination logic
    const indexOfLastRequest= currentPage * BillingPerPage;
    const indexOfFirstRequest = indexOfLastRequest - BillingPerPage;

    //in the format (yyyy-mm-dd)
    const filteredBilling = Billing.filter(bill => {
        if (!startDate && !endDate) return true;
        
            const billDate = new Date(bill.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
        
            if (start && end) {
            return billDate >= start && billDate <= end;
            } else if (start) {
            return billDate >= start;
            } else if (end) {
            return billDate <= end;
            }
        
            return true;
        });
        
    
    const totalPages = Math.ceil(filteredBilling.length / BillingPerPage);
    const currentBilling = filteredBilling.slice(indexOfFirstRequest, indexOfLastRequest);
    

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
                            <th className='w-auto'>{langs.billID}</th>
                            <th className="w-auto text-break">{langs.date}</th>
                            <th className="w-auto text-break">{langs.billType}</th>
                            <th className="w-auto text-break">{langs.billAmount}</th>
                            <th className="w-auto text-break">{langs.billStatus}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBilling.map(bill => (
                            <tr key={bill.id}>
                                <td>{bill.billID}</td>
                                <td className="text-break">{bill.date}</td>
                                <td className="text-break">{bill.type}</td>
                                {/* <td className="text-break">{jobTypes.fields[Bill.job - jobTypes.start]}</td> */}
                                <td className="text-break">{bill.amount} {langs.currency}</td>
                                <td className="text-break" style={{ color: bill.status === 'paid' ? 'green' : 'red'}}>{bill.status}</td>
                                {/* <td className="text-break">{bill.status}</td> */}
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

export default BillingList;