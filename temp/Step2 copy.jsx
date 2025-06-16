// import React, { useContext } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloudUploadAlt, faArrowLeft , faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
// import { LanguageContext } from '../../context/LanguageProvider.context';
// import lang from '../../assets/lang/language';

// const Step2 = ({ formData, errors, handleFileChange, prevStep, handleSubmit, uploadProgress }) => {
//     const { language } = useContext(LanguageContext);
//     return (
//         <form className="step2-form">
//             <div className="row">
//                 {['personalImage', 'ssnImage', 'medicalReport', 'salaryProof'].map(key => (
//                     <div className="col-md-3 upload-card" key={key}>
//                         <div className="upload-box">
//                             <FontAwesomeIcon icon={faCloudUploadAlt} size="2x" />
//                             <input type="file" name={key} accept="image/*" onChange={handleFileChange} />
//                         </div>
//                         <label>{lang[language].fields[key].label}</label>
//                         {errors[key] && <div className="text-danger"><FontAwesomeIcon icon={faExclamationCircle} /> {errors[key]}</div>}
//                     </div>
//                 ))}
//             </div>
//             {uploadProgress > 0 && <div className="progress mt-3"><div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }}>{uploadProgress}%</div></div>}
//             <div className="mt-4">
//                 <button type="button" className="btn btn-secondary mr-2" onClick={prevStep}><FontAwesomeIcon icon={faArrowLeft} /> {lang[language].back}</button>
//                 <button type="button" className="btn btn-primary" onClick={handleSubmit}>{lang[language].register}</button>
//             </div>
//         </form>
//     );
// };
// export default Step2;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext } from '../../context/LanguageProvider.context';
import lang from '../../assets/lang/language';
import api from '../../data/Api';

const filesConfig = [
  { key:'personalImage', label:'Personal Image', accept:'image/*' },
  { key:'ssnFace', label:'SSN Face', accept:'image/*' },
  { key:'medicalReport', label:'Medical Report', accept:'application/pdf,image/*', optional:true },
  { key:'salaryProof', label:'Salary Proof', accept:'application/pdf,image/*', conditional:'job', conditionalValue:['professor','teaching assistant','teacher'] }
];

const Step2 = ({ initialData, onBack }) => {
  const { language } = useContext(LanguageContext);
  const t = lang[language];
  const navigate = useNavigate();

  const [files, setFiles] = useState({});
  const [progress, setProgress] = useState({});
  const [error, setError] = useState('');

  const handleFile = (e, key) => {
    setFiles(prev => ({ ...prev, [key]: e.target.files[0] }));
    setProgress(prev => ({ ...prev, [key]: 0 }));
  };

  const uploadAll = async () => {
    try {
      for (let cfg of filesConfig) {
        if (cfg.optional) continue;
        // conditional skip
        if (cfg.conditional && !cfg.conditionalValue.includes(initialData.job)) continue;
        const file = files[cfg.key];
        if (!file) throw new Error(`${cfg.label} is required`);
        const form = new FormData(); form.append('file', file);
        await api.post(`/upload/${cfg.key}`, form, {
          headers:{'Content-Type':'multipart/form-data'},
          onUploadProgress: ({ loaded, total }) => setProgress(prev => ({ ...prev, [cfg.key]: Math.round((loaded/total)*100) }))
        });
      }
      navigate('/billing');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="step-form">
      <div className="row gy-4">
        {filesConfig.map(cfg => {
          if (cfg.conditional && !cfg.conditionalValue.includes(initialData.job)) return null;
          if (cfg.optional) return (
            <div key={cfg.key} className="col-md-3">
              <label>{cfg.label} <small>({t.optional})</small></label>
              <div className="upload-box">
                <input type="file" accept={cfg.accept} onChange={e=>handleFile(e,cfg.key)} />
                {progress[cfg.key] && <div className="progress mt-1"><div className="progress-bar" style={{width:`${progress[cfg.key]}%`}}>{progress[cfg.key]}%</div></div>}
              </div>
            </div>
          );
          return (
            <div key={cfg.key} className="col-md-3">
              <label>{cfg.label}</label>
              <div className="upload-box">
                <input type="file" accept={cfg.accept} onChange={e=>handleFile(e,cfg.key)} />
                {progress[cfg.key] != null && <div className="progress mt-1"><div className="progress-bar" style={{width:`${progress[cfg.key]}%`}}>{progress[cfg.key]}%</div></div>}
              </div>
            </div>
          );
        })}
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <div className="mt-4 d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={uploadAll}><FontAwesomeIcon icon={faUpload}/> {t.submit}</button>
      </div>
    </div>
  );
};

export default Step2;