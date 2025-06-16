import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Tables.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
// import useProfileFieldsRoles from './../../shared/services/useProfileFields';
import { LanguageContext } from './../../context/LanguageProvider.context';
import { useContext } from 'react';
import lang from './../../assets/lang/language';

const StaffList = () => {
    // const navigate = useNavigate();
    const [Staff, setStaff] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const StaffPerPage = 10;

    const [searchTerm, setSearchTerm] = useState('');

    // const { jobTypes } = useProfileFieldsRoles();

    const { language } = useContext(LanguageContext);
    const langs = lang[language];


    const handleAdd = async () => {
        const name = document.getElementById("Name").value.trim();
        const email = document.getElementById("Email").value.trim();
        const password = document.getElementById("Pass").value.trim();
        const type = document.getElementById("type").value;
    
        if (!name || !email || !password || !type) {
            alert("Please fill in all fields.");
            return;
        }
    
        const newStaff = {
            name,
            email,
            password,
            type,
        };
    
        try {
            const res = await axios.post("http://localhost:3000/Staff", newStaff);
            setStaff(prev => [...prev, res.data]);
    
            // Reset form
            document.getElementById("Name").value = "";
            document.getElementById("Email").value = "";
            document.getElementById("Pass").value = "";
            document.getElementById("type").value = "membership";
    
            // Close modal manually
            const modal = window.bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
            modal.hide();
    
        } catch (error) {
            console.error("Error adding staff:", error);
        }
    };
    


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //to be replaced with instance
            const res = await axios.get(`http://localhost:3000/Staff`);
            setStaff(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    



    // Pagination logic
    const indexOfLastRequest= currentPage * StaffPerPage;
    const indexOfFirstRequest = indexOfLastRequest - StaffPerPage;

    const filteredStaff = Staff.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.staffName && r.staffName.includes(searchTerm))
    );
    
    const totalPages = Math.ceil(filteredStaff.length / StaffPerPage);
    const currentStaff = filteredStaff.slice(indexOfFirstRequest, indexOfLastRequest);
    

    return (
        <div dir={langs.direction} className='p-4 bg-light min-vh-100'>

            <div className="search">
            <div className="mb-4 row">
                <div className="addModal col-md-1 mb-2">
                    <button type="button"  className="btn my-btn-primary " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <FontAwesomeIcon icon={faPlus} />
                        <span className='mx-2'>{langs.add}</span>
                    </button>

                    {/* Modal */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between align-items-center">
                            <div className='flex-grow-1 text-center'>
                                <h1 className="modal-title fs-5 w-100" id="staticBackdropLabel">{langs.ModalAdd}</h1>
                            </div>
                            <button type="button" className="btn-close ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="Name" className="form-label">{langs.fields.name.label}</label>
                                <input type="text" className="form-control" id="Name" />
                            </div>
                            <div className="mb-3">
                                <label for="Email" classNAme="form-label">{langs.email}</label>
                                <input type="email" className="form-control" id="Email"/>
                            </div>
                            <div className="mb-3">
                                <label for="Pass" className="form-label">{langs.password}</label>
                                <input type="password" className="form-control" id="Pass"/>
                            </div>
                            <div className="mb-3">
                                
                                    <label className="form-label" for="type">
                                    {langs.staffType}
                                    </label>
                                    <select className="form-select" aria-label="type" id='type'>
                                        <option value="membership" selected>{langs.membershipStaff}</option>
                                        <option value="security">{langs.securityStaff}</option>
                                    </select>
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{langs.close}</button>
                            <button type="button" className="btn my-btn-primary" onClick={handleAdd}>{langs.add}</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={langs.fields.staffSearch.placeholder}
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
                            <th className='w-auto'>{langs.fields.name.label}</th>
                            <th className='w-auto text-break'>{langs.staffType}</th>
                            <th className="text-center" style={{minWidth:"80px"}}>{langs.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStaff.map(staff => (
                            <tr key={staff.id}>
                                <td>{staff.name}</td>
                                <td className="text-break">{staff.type}</td>
                                {/* <td className="text-break">{jobTypes.fields[staff.job - jobTypes.start]}</td> */}
                                <td className="text-center" style={{alignContent:"center"}}>
                                    {/* TODO: onClick={() => navigate(`/staff/${request.id}`)} */}
                                    <button className="btn my-edit mx-2" >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    {/* TODO: onClick={() => handleDelete()} */}
                                    <button className="btn my-delete mx-2" >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
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

export default StaffList;