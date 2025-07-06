
/* eslint-disable no-undef */
import { useRef,useEffect, useState, useContext } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Tables.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faExclamation, faPrint } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext } from './../../context/LanguageProvider.context';
import lang from './../../assets/lang/language';
import api from '../../data/Api';
import { useAuth } from '../../context/AuthContext';
import CardPrint from '../cardPrint/CardPrint';

const ProfileList = ({ memberId = 0 }) => {
    const { user } = useAuth();
    const [load, setLoad] = useState(false);
    const role = user?.user.Type.toLowerCase();
    const [Profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentMembers, setCurrentMembers] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [printProfile, setPrintProfile] = useState('');
    const { language } = useContext(LanguageContext);
    const langs = lang[language];

    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        birthdate: '',
        image: null,
    });

    useEffect(() => {
        fetchData();
    }, [user, language, searchTerm]);

    const fetchData = async () => {
        setLoad(true);
        if (!user) return;
        try {
            const res = await api.get(`MemberDependents/member/depentents/${language}?MemberId=${memberId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setProfiles(res.data.data.memberDependents);
            console.log(res.data.data.memberDependents);
            setCurrentPage(res.data.metadata?.pagination.pageIndex);
            setCurrentMembers(res.data.metadata?.pagination.totalRecords);
            setTotalPages(res.data.metadata?.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoad(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    
    const handleAdd = async () => {
        if (!formData.name || !formData.birthdate || !formData.image) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        const submitData = new FormData();
        submitData.append("Name", formData.name);
        submitData.append("Birthdate", formData.birthdate);
        
        submitData.append("MemberID", memberId); // passed as prop
        // submitData.append("SubscriptionMode", memberId); // passed as prop
        submitData.append("Image", formData.image);
        console.log(submitData);

        setLoad(true);

        try {
            await api.post(`MemberDependents/member/depentents/${language}`, submitData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            let t = setTimeout(() => {
                fetchData();
                clearTimeout(t);
                setLoad(false);
            }, 2000);

            // Reset form
            setFormData({ name: '', birthdate: '', image: null });
            setPreviewImage(null);
            // modalRef.current?.click();
        } catch (error) {
            console.error("Error adding dependent:", error);
            setLoad(false);
        } finally {
            window.document.getElementById("closebtn")?.click();
        }
    };

    return (
        <div dir={langs.direction} className='p-4 bg-light h-50'>
            <div className="search">
                <div className="mb-4 row">
                    <div className="addModal col-md-3 mb-2">
                        <button type="button" style={{"borderColor":"#2c3e50"}} className="btn my-btn-primary d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <FontAwesomeIcon icon={faPlus} />
                            <span className='mx-2'>{langs.add}</span>
                        </button>

                        {/* Modal */}
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header d-flex justify-content-between align-items-center">
                                        <h1 className="modal-title fs-5 text-center w-100" id="staticBackdropLabel">{langs.ModalAdd}</h1>
                                        <button type="button" className="btn-close ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">{langs.fields.name.label}</label>
                                                <input type="text" className="form-control" id="name" value={formData.name} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="birthdate" className="form-label">{langs.fields.DOB?.label || "Birthdate"}</label>
                                                <input type="date" className="form-control" id="birthdate" value={formData.birthdate} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="image" className="form-label">{langs.image}</label>
                                                <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} />
                                                {previewImage && (
                                                    <div className="mt-3">
                                                        <img src={previewImage} alt="Preview" className="img-thumbnail" width="100" />
                                                    </div>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        {load ? (
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            <>
                                                    <button type="button" className="btn btn-secondary" id="closebtn" data-bs-dismiss="modal"
                                                        style={{ display: load ? "none" : "inline-block" }}>{langs.close}</button>
                                                <button type="button" className="btn my-btn-primary" onClick={handleAdd}>{langs.add}</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div>
                <table dir={langs.direction} className="table table-hover text-center">
                    <thead className="table-secondary">
                        <tr>
                            <th>{langs.image}</th>
                            <th>{langs.membersId}</th>
                            <th>{langs.fields.name.label}</th>
                            <th>{langs.fields.membershipType.label}</th>
                            {/* <th>{langs.fields.status.label}</th> */}
                            {(role === "superadmin" || role === "admin" || role === "stuffmembership") && (
                                <th>{langs.actions}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {Profiles.length === 0 ? (
                            <tr>
                                <td colSpan="6">
                                    <span className="mx-2">{langs.noData}</span>
                                    <FontAwesomeIcon className="mx-3" icon={faExclamation} />
                                </td>
                            </tr>
                        ) : (
                            Profiles.map((Profile, i) => (
                                <tr key={i}>
                                    <td><img src={Profile.image} alt="person" width="50" height="50" className="rounded-circle" /></td>
                                    <td>{Profile.memberId}</td>
                                    <td>{Profile.name}</td>
                                    <td>{langs.membershipTypes[1]}</td>
                                    {/* <td style={{ color: Profile.status === 'تم التجديد' ? 'green' : 'red' }}>{Profile.status}</td> */}
                                    {(role === "superadmin" || role === "admin" || role === "stuffmembership")&&(<td>
                                        {/* <input type="checkbox" className="form-check-input" /> */}
                                        <button style={{ borderColor: "#2c3e50" }} className="btn my-btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#cardModalD" onClick={() => {
                                            setPrintProfile({
                                                name: Profile.name,
                                                memberId: memberId,
                                                imgs: Profile.image
                                            })
                                        }}><FontAwesomeIcon icon={faPrint} /></button>
                                        <div className="modal fade" id="cardModalD" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content" >
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="cardModalLabel">{lang[language].printCard}</h5>
                                                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                                    </div>
                                                    <div className="modal-body">
                                                        <CardPrint keyin={i} name={printProfile.name} memberId={memberId} imgs={printProfile.imgs} memberType={false} />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div> 
                                    </td>)}
                                </tr>
                            ))
                        )}
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



// /* eslint-disable no-undef */
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import './Tables.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus, faExclamation } from '@fortawesome/free-solid-svg-icons'; 
// // import useProfileFieldsRoles from './../../shared/services/useProfileFields';
// import { LanguageContext } from './../../context/LanguageProvider.context';
// import { useContext } from 'react';
// import lang from './../../assets/lang/language';
// // import { type } from './../../../node_modules/axios/index.d';

// import api from '../../data/Api';
// import { useAuth } from '../../context/AuthContext';
// const ProfileList = ({memberId=0}) => {
//     // const navigate = useNavigate();

//     const { user } = useAuth();
//     const [load, setload] = useState(false);
//     const role = user?.user.Type.toLowerCase();
//     const [Profiles, setProfiles] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const ProfilesPerPage = 10;


//     const [totalPages, setTotalPages] = useState(0);
//     const [currentMembers, setCurrentMembers] = useState(0);

//     const [searchTerm, setSearchTerm] = useState('');

//     // const { jobTypes } = useProfileFieldsRoles();

//     const { language } = useContext(LanguageContext);
//     const langs = lang[language];



//     useEffect(() => {
//            fetchData();
//        }, [user,language,searchTerm]);
    
//     const fetchData = async () => {
//            setload(true);
//            if(!user) return
//            try {
//                //to be replaced with instance
//                // MemberDependents/member/depentents/ar?MemberId=6
//                const res = await api.get(`MemberDependents/member/depentents/${language}?MemberId=${memberId}`, {
//                    headers: { Authorization: `Bearer ${user.token}` },
//                });
//                console.log(res.data.data)
//                setProfiles(res.data.data.memberDependents); 
//                setCurrentPage(res.data.metadata?.pagination.pageIndex);
//                setCurrentMembers(res.data.metadata?.pagination.totalRecords);
//                setTotalPages(res.data.metadata?.pagination.totalPages);
//            } catch (error) {
//                console.error("Error fetching data:", error);
//            }finally{
//                setload(false);
//            }
//        };

//        const handleAdd = async () => {
//                setload(true);
//                const name = document.getElementById("Name").value.trim();
//                const email = document.getElementById("Email").value.trim();
//                const password = document.getElementById("Pass").value.trim();
//                const type = document.getElementById("type").value;
               
//                if (!name || !email || !password || !type) {
//                    alert("Please fill in all fields.");
//                    return;
//                }
           
//                const newStaff = {
//                    name,
//                    email,
//                    password,
//                    userType: Number(type),
//                    ssn: '',
//                    phone: ''
//                };
           
//                try {
//                    // const res = await axios.post("http://localhost:7183/Staff", newStaff); 
//                    // https://localhost:7016/api/Staff/ar
//                    const res = await api.post(`Staff/${language}`, newStaff);
//                    // setStaff(prev => [...prev]);
//                    // let t = setTimeout(() => {
//                    let t = setTimeout(() => {
//                        fetchData();
//                        clearTimeout(t);
//                        setload(false);
//                    }, 3000);
//                        //     clearTimeout(t);
//                        // }, 1000);
//                        // Reset form
//                        document.getElementById("Name").value = "";
//                        document.getElementById("Email").value = "";
//                        document.getElementById("Pass").value = "";
//                        document.getElementById("type").value = 4; 
                       
//                        // Close modal manually
//                        // const modal = window.bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
//                        // modal.hide();
                       
//                    } catch (error) {
//                        console.error("Error adding staff:", error);
//                        setload(false);
//                    }
//                    finally {
//                        const close = document.getElementById("closebtn");
//                        close?.click();
//                    }
//            };

//     // // Pagination logic
//     // const indexOfLastRequest= currentPage * ProfilesPerPage;
//     // const indexOfFirstRequest = indexOfLastRequest - ProfilesPerPage;

//     // const filteredProfiles = Profiles.filter(r =>
//     //     r.memberid.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //     (r.memberid && r.memberid.includes(searchTerm))
//     // );
    
//     // const totalPages = Math.ceil(filteredProfiles.length / ProfilesPerPage);
//     // const currentProfiles = filteredProfiles.slice(indexOfFirstRequest, indexOfLastRequest);
    

//     return (
//         <div dir={langs.direction} className='p-4 bg-light h-50 '>


//             <div className="search">
//             <div className="mb-4 row">
//                 <div className="col-md-3 mb-2">
//                     {/* <input
//                         type="text"
//                         className="form-control"
//                         placeholder={langs.fields.search.placeholder}
//                         value={searchTerm}
//                         onChange={(e) => {
//                             setSearchTerm(e.target.value);
//                             setCurrentPage(1);
//                         }}
//                     /> */}
                        
//                         <div className="addModal col-md-1 mb-2">
//                             <button type="button" className="btn my-btn-primary d-flex align-items-center " style={{ borderColor: '#224375' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//                                 <FontAwesomeIcon icon={faPlus} />
//                                 <span className='mx-2'>{langs.add}</span>
//                             </button>

//                             {/* Modal */}
//                             <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                                 <div className="modal-dialog">
//                                     <div className="modal-content">
//                                         <div className="modal-header d-flex justify-content-between align-items-center">
//                                             <div className='flex-grow-1 text-center'>
//                                                 <h1 className="modal-title fs-5 w-100" id="staticBackdropLabel">{langs.ModalAdd}</h1>
//                                             </div>
//                                             <button type="button" className="btn-close ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
//                                         </div>
//                                         <div className="modal-body">
//                                             <form>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="Name" className="form-label">{langs.fields.name.label}</label>
//                                                     <input type="text" className="form-control" id="Name" />
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="Email" className="form-label">{langs.email}</label>
//                                                     <input type="email" className="form-control" id="Email" />
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="Pass" className="form-label">{langs.password}</label>
//                                                     <input type="text" className="form-control" id="Pass" />
//                                                 </div>
//                                                 <div className="mb-3">

//                                                     <label className="form-label" htmlFor="type">
//                                                         {langs.staffType}
//                                                     </label>
//                                                     <select className="form-select" aria-label="type" id='type' defaultValue={4}>
//                                                         <option value="4">{langs.membershipStaff}</option>
//                                                         <option value="5">{langs.securityStaff}</option>
//                                                     </select>
//                                                 </div>

//                                             </form>
//                                         </div>
//                                         <div className="modal-footer">
//                                             {load && (
//                                                 <div className="spinner-border text-primary" role="status">
//                                                     <span className="visually-hidden">Loading...</span>
//                                                 </div>)}
//                                             {
//                                                 !load && (
//                                                     <>
//                                                         <button type="button" className="btn btn-secondary" id='closebtn' data-bs-dismiss="modal">{langs.close}</button>
//                                                         <button type="button" className="btn my-btn-primary" onClick={handleAdd}>{langs.add}</button>
//                                                     </>
//                                                 )
//                                             }
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

                        
//                 </div>
//                 {/* <div className="col-md-4 d-flex gap-2 mb-2">
//                     <button type="button" className="btn my-btn-outline-primary d-flex align-items-center">
//                         <span className="mx-2">{langs.login}</span>
//                         <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                     <button type="button" className="btn my-delete d-flex align-items-center">
//                         <span className='mx-2'>{langs.logout}</span>
//                         <FontAwesomeIcon icon={faMinus} />
//                     </button>
//                 </div> */}
//             </div>

//             </div>

//             <div >
//                 <table dir={langs.direction} className="table table-hover text-center">
//                     <thead className="table-secondary">
//                         <tr>
//                             <th className='w-auto'>{langs.image}</th>
//                             <th className="w-auto text-break">{langs.membersId}</th>
//                             <th className='w-auto text-break'>{langs.fields.name.label}</th>
//                             <th className="w-auto text-break">{langs.fields.membershipType.label}</th>
//                             <th className="w-auto text-break">{langs.fields.status.label}</th>
//                             <th className="text-center" style={{minWidth:"80px"}}>{langs.actions}</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {  ( Profiles.length <= 0) && (
//                             <tr >
//                                 <td className="text-center" style={{ alignContent: "center" }} colSpan={6}   >
                                    
//                                     <span className="mx-2">{langs.noData}</span>
                                    
//                                     <FontAwesomeIcon className="mx-3" icon={faExclamation} />
                                
//                                 </td>
//                             </tr>
//                         )}
//                         {Profiles.length > 0 && Profiles.map((Profile,i) => (
//                             <tr key={i}>
//                                 <td><img alt="person" src={Profile.image} width="50" height="50" className="rounded-circle"  /></td>
//                                 <td className="text-break">{Profile.memberId}</td>
//                                 <td className="text-break">{Profile.name}</td>
//                                 <td className="text-break">{langs.membershipTypes[0]}</td>
//                                 {/* <td className="text-break">{jobTypes.fields[Profile.job - jobTypes.start]}</td> */}
//                                 <td className="text-break" style={{ color: Profile.status === 'تم التجديد' ? 'green' : 'red'}}>{Profile.status}</td>
//                                 <td className="text-center" style={{alignContent:"center"}}>
//                                     <input type="checkbox" className="form-check-input" />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className="d-flex justify-content-center mt-4">
//                 <nav>
//                     <ul className="pagination">
//                         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                             <button className="page-link rounded-0" onClick={() => setCurrentPage(currentPage - 1)}>{langs.back}</button>
//                         </li>
//                         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                             <button className="page-link rounded-0" onClick={() => setCurrentPage(currentPage + 1)}>{langs.next}</button>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>


//         </div>
//     );
// };

// export default ProfileList;