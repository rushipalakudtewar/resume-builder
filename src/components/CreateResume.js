import React, { useEffect, useState } from 'react'
import {doc,getDoc} from "firebase/firestore"
import { db1 } from '../config/firebase';
// import { PDFExport } from "@progress/kendo-react-pdf";
import ShareModel from './ShareModel';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import { useNavigate } from 'react-router-dom';

const CreateResume = () => {
    const [dataStore,setDataStore] = useState('')
    const [profileDetails,setProfileDetails] = useState({})
    const [personalSummary,setPersonalSummary] = useState('')
    const [experiences, setExperiences] = useState([])
    const [education,setEducation] = useState([])
    const [certificates,setCertificates] = useState([])
    const [skills,setSkills] = useState([])
    const [languages,setLanguages] = useState([])
    // const pdfExportComponent = React.useRef(null);
    const resumeUrl = 'http://localhost:3000/resume';
    const textAreaRef = React.useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('template1');
    const navigate = useNavigate()
    
    const handleTemplateClick = (template) => {
      setSelectedTemplate(template);
    };
  
    //show the model
    const copyToClipboard = () => {
        // textAreaRef.current.select();
        // document.execCommand('copy');
        setModalOpen(true);
    };

    // only copy url
    // const onlyCopyToClipboard = () => {
    //     textAreaRef.current.select();
    //     document.execCommand('copy');
    // }
    const closeModal = () => {
        setModalOpen(false);
      };
    
    const getUserDetails = async() =>{
        const userId = localStorage.getItem("userId");
        try {
             const userRef = doc(db1, "users", userId);
             const docSnap = await getDoc(userRef);
 
             if (docSnap.exists()) {
                  const userData = docSnap.data();
                  console.log("User is ",userData);
                  setDataStore(userData)
                  setProfileDetails(userData.personalDetails);
                  setPersonalSummary(userData.personalSummary.summary)
                  setExperiences(userData.careerHistory)
                  setEducation(userData.education)
                  setSkills(userData.skills)
                  setCertificates(userData.licenceCertificate)
                  setLanguages(userData.languages)
                  
                } else {
                    console.log("No such document!");
               }
          } catch (error) {
               console.error(error);
          }
    }

useEffect(()=>{
    getUserDetails()
},[])




return (
        <div className='mb-20'>
        {/* <button className='m-14 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-md py-2 px-4 sm:px-6 lg:px-8' onClick={() => {
              if (pdfExportComponent.current) {
                pdfExportComponent.current.save();   
              }
            }}>Download</button>
             */}
        <div className='flex justify-between items-center mb-5 mx-10'>        
        <button className='bg-gradient-to-r m-5 from-purple-500 via-pink-500 to-red-500 text-white shadow-md py-2 px-4 sm:px-6 lg:px-8' onClick={()=>navigate('/resume-dashboard')}>Back</button>
        <button className='bg-gradient-to-r m-5 from-purple-500 via-pink-500 to-red-500 text-white shadow-md py-2 px-4 sm:px-6 lg:px-8' onClick={copyToClipboard}>Share the resume</button>
        <ShareModel isOpen={isModalOpen} onClose={closeModal} copiedUrl={resumeUrl} />
        </div>

        {/* <div>
            <textarea
                ref={textAreaRef}
                readOnly
                value={resumeUrl}
                style={{ position: 'absolute', left: '-9999px' }}
            />
            <p>Your resume URL: {resumeUrl}</p>

            <button onClick={onlyCopyToClipboard} className='bg-slate-400 hover:bg-slate-600 text-white px-4 p-1 m-2 rounded-md border-none '>Copy URL</button>
        </div > */}

        <div className='flex justify-between items-start flex-col md:flex-row mx-0 md:mx-20'>
        <div className='mt-10 flex flex-row md:flex-col'>
        <button onClick={() => handleTemplateClick('template1')} className='bg-gray-400 hover:bg-gray-600 text-white px-4 p-2 m-4 shadow-md'>Fresher</button>

        <button onClick={() => handleTemplateClick('template2')} className='bg-gray-400 hover:bg-gray-600 text-white px-4 p-2 m-4 shadow-md'>Midlevel</button>

        <button onClick={() => handleTemplateClick('template3')}  className='bg-gray-400 hover:bg-gray-600 text-white px-4 p-2 m-4 shadow-md'>Experienced</button>

        </div>
        <div className="bg-gray-200 p-4 m-2 w-[793px] border-gray-800 shadow-lg rounded-md">
            {selectedTemplate === 'template1' && <Template1 dataStore={dataStore} personalSummary={personalSummary} certificates={certificates} skills={skills} profileDetails={profileDetails} experiences={experiences} education={education} languages={languages}/>}
            {selectedTemplate === 'template2' && <Template2 dataStore={dataStore} personalSummary={personalSummary} certificates={certificates} skills={skills} profileDetails={profileDetails} experiences={experiences} education={education} languages={languages}/>}
            {selectedTemplate === 'template3' && <Template3 dataStore={dataStore} personalSummary={personalSummary} certificates={certificates} skills={skills} profileDetails={profileDetails} experiences={experiences} education={education} languages={languages}/>}
        </div>
        </div>
    </div>
  )
}

export default CreateResume