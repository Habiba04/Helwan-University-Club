import { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../../data/Api';
// import 'bootstrap/dist/css/bootstrap.min.css';
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
    const [totalPage, setTotalPage] = useState(10);
    const StaffPerPage = 10;
    const [load, setload] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // const { jobTypes } = useProfileFieldsRoles();

    const { language } = useContext(LanguageContext);
    const langs = lang[language];


    const handleAdd = async () => {
        setload(true);
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
            userType: Number(type),
            ssn: '',
            phone: ''
        };
    
        try {
            // const res = await axios.post("http://localhost:7183/Staff", newStaff); 
            // https://localhost:7016/api/Staff/ar
            const res = await api.post(`Staff/${language}`, newStaff);
            // setStaff(prev => [...prev]);
            // let t = setTimeout(() => {
            let t = setTimeout(() => {
                fetchData();
                clearTimeout(t);
                setload(false);
            }, 3000);
                //     clearTimeout(t);
                // }, 1000);
                // Reset form
                document.getElementById("Name").value = "";
                document.getElementById("Email").value = "";
                document.getElementById("Pass").value = "";
                document.getElementById("type").value = 4; 
                
                // Close modal manually
                // const modal = window.bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
                // modal.hide();
                
            } catch (error) {
                console.error("Error adding staff:", error);
                setload(false);
            }
            finally {
                const close = document.getElementById("closebtn");
                close?.click();
            }
    };
    


    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            //to be replaced with instance
            const res = await api.get(`Staff/${language}?PageIndex=${currentPage}&PageSize=${totalPage}`);
            console.log(res.data.data)
            setStaff(res.data.data.staff);

            console.log(res.data.data.metadata)
            setCurrentPage(res.data.data.metadata.pagination?.pageIndex);
            setTotalPage(res.data.data.metadata.pagination?.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    
    const [currID,setCurrID] = useState(0);
    const handleDelete = async(id) => {
        setload(true);
        setCurrID(id);
        try {
            //to be replaced with instance
            // const res = await axios.delete(`http://localhost:7183/Staff/${id}`);
            await api.delete(`Staff/Delete/${id}/${language}`);
            let t = setTimeout(() => {
                fetchData();
                clearTimeout(t);
                setload(false);
            }, 3000);
        } catch (error) {
            console.error("Error deleting staff:", error);
            setload(false);
        }
    };


    // // Pagination logic
    // const indexOfLastRequest= currentPage * StaffPerPage;
    // const indexOfFirstRequest = indexOfLastRequest - StaffPerPage;

    // const filteredStaff = Staff.filter(r =>
    //     r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     (r.staffName && r.staffName.includes(searchTerm))
    // );
    
    // const totalPages = Math.ceil(filteredStaff.length / StaffPerPage);
    // const currentStaff = filteredStaff.slice(indexOfFirstRequest, indexOfLastRequest);
     

    return (
        <div dir={langs.direction} className='p-4 bg-light min-vh-100'>

            <div className="search">
            <div className="mb-4 row">
                <div className="addModal col-md-1 mb-2">
                    <button type="button"  className="btn my-btn-primary d-flex align-items-center " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <FontAwesomeIcon icon={faPlus} />
                        <span className='mx-2'>{langs.add}</span>
                    </button>

                    {/* Modal */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                <label htmlFor="Name" className="form-label">{langs.fields.name.label}</label>
                                <input type="text" className="form-control" id="Name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">{langs.email}</label>
                                <input type="email" className="form-control" id="Email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Pass" className="form-label">{langs.password}</label>
                                <input type="text" className="form-control" id="Pass"/>
                            </div>
                            <div className="mb-3">
                                
                                    <label className="form-label" htmlFor="type">
                                    {langs.staffType}
                                    </label>
                                    <select className="form-select" aria-label="type" id='type' defaultValue={4}>
                                        <option value="4">{langs.membershipStaff}</option>
                                        <option value="5">{langs.securityStaff}</option>
                                    </select>
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                                        {load && (
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>)}
                                        {
                                            !load && (
                                                <>
                                                    <button type="button" className="btn btn-secondary" id='closebtn' data-bs-dismiss="modal">{langs.close}</button>
                                                    <button type="button" className="btn my-btn-primary" onClick={handleAdd}>{langs.add}</button>
                                                </>
                                            )
                                        }
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
                        {Staff.map(staff => (
                            <tr key={staff.id}>
                                <td>{staff.name}</td>
                                <td className="text-break">{langs.userType[staff.userType-1]}</td>
                                {/* <td className="text-break">{jobTypes.fields[staff.job - jobTypes.start]}</td> */}
                                <td className="text-center" style={{ alignContent: "center" }}>
                                    {load && staff.id === currID && (
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>)}
                                    {!load && (<button className="btn my-delete mx-2" onClick={() => handleDelete(staff.id)}> 
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>)}
                                    {/* TODO: onClick={() => navigate(`/staff/${request.id}`)} */}
                                    {/* <button className="btn my-edit mx-2" >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button> */}
                                    {/* TODO: onClick={() => handleDelete()} */}
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
                        <li className='page-item ' >
                            <button className="page-link rounded-0" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => {
                                // console.log(prev);
                                return isNaN(prev - 1) ? 1 : prev - 1
                            })}>{langs.back}</button>
                        </li>
                        <li className={`page-item `}>
                            <button className="page-link rounded-0" disabled={currentPage === totalPage && !isNaN(totalPage)} onClick={() => setCurrentPage(prev => {
                                // console.log(prev);
                                return (prev + 1)
                            })}>{langs.next}</button>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default StaffList;