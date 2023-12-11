import React, { useEffect, useState } from 'react'
import {doc,getDoc} from "firebase/firestore"
import { db1 } from '../config/firebase';
import { PDFExport } from "@progress/kendo-react-pdf";
import ShareModal from './ShareModel';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const CreateResume = () => {
    const [dataStore,setDataStore] = useState('')
    const [profileDetails,setProfileDetails] = useState({})
    const [personalSummary,setPersonalSummary] = useState('')
    const [experiences, setExperiences] = useState([])
    const [education,setEducation] = useState([])
    const [certificates,setCertificates] = useState([])
    const [skills,setSkills] = useState([])
    const pdfExportComponent = React.useRef(null);
    const resumeUrl = 'http://localhost:3000/resume';
    const textAreaRef = React.useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);

    //show the model
    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand('copy');
        setModalOpen(true);
    };

    //only copy url
    const onlyCopyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand('copy');
    }
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
                  setDataStore(userData)
                  setProfileDetails(userData.personalDetails);
                  setPersonalSummary(userData.personalSummary.summary)
                  setExperiences(userData.careerHistory)
                  setEducation(userData.education)
                  setSkills(userData.skills)
                  setCertificates(userData.licenceCertificate)
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
        <>
        <button className='m-14 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-md py-2 px-4 sm:px-6 lg:px-8' onClick={() => {
              if (pdfExportComponent.current) {
                pdfExportComponent.current.save();   
              }
            }}>Download</button>
            
        
        <button className='m-14 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-md py-2 px-4 sm:px-6 lg:px-8'  onClick={copyToClipboard}>Share the resume</button>
        <ShareModal isOpen={isModalOpen} onClose={closeModal} copiedUrl={resumeUrl} />
        <div>
            <textarea
                ref={textAreaRef}
                readOnly
                value={resumeUrl}
                style={{ position: 'absolute', left: '-9999px' }}
            />
            <p>Your resume URL: {resumeUrl}</p>

            <button onClick={onlyCopyToClipboard} className='bg-slate-400 hover:bg-slate-600 text-white px-4 p-1 m-2 rounded-md border-none '>Copy URL</button>
        </div>
        
        <div className="m-4 p-4 border border-gray-800 shadow-lg rounded-md">
        <PDFExport paperSize="A4" margin="0.5cm" ref={pdfExportComponent}>
            <div className="flex justify-between items-center px-4 text-white bg-slate-900 h-40 rounded-sm" >
                <div>
                    <div className='font-semibold text-2xl'>{profileDetails.firstName} {profileDetails.lastName}</div>
                        <div className='flex items-center mt-1'><MdEmail className='text-md mr-2'/><p className='text-sm'>{dataStore.email}</p></div>
                        <div className='flex items-center mt-1'><FaPhoneAlt className='text-md mr-2'/><p className='text-sm'>{profileDetails.phoneNumber}</p></div>
                        <div className='flex items-center mt-1'><FaLocationDot className='text-md mr-2'/><p className='text-sm'>{profileDetails.homeLocation}</p></div>
                    </div>
                <div className="" >
                    <img className="rounded-full mx-auto object-cover w-28 h-28" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU" alt='profile-pic'/>
                   
                </div>
            </div>
        
            <hr className='h-0.5 my-2 bg-gray-800'/>
            <div className='text-md'>
            <div className='bg-slate-900 text-white text-center rounded-sm p-1'>PROFILE</div>
            <div className='p-1 text-sm'>{personalSummary}</div> 
            </div>

            <hr className='h-0.5 my-2 bg-gray-800'/>

            <div className='bg-slate-900 text-white text-center rounded-sm p-1'>EMPLOYEMENT HISTORY</div>
                <div className='p-1 my-2'>
                { experiences.length>0 && experiences.map((item)=>{
                    return (
                        <div className='p-1'>
                            <div className='flex justify-between items-center'>
                                <p className='font-bold text-md'>{item.companyName}</p>
                                <div>
                                    <p className='text-sm'><span>{item.started.month.substring(0,3)}-{item.started.year}</span>{ item.ended.stillInRole ? <span>Current</span> : <span> / {item.ended.month.substring(0,3)}-{item.ended.year}</span>}</p>
                                </div>   
                            </div>
                            <p className='italic'>{item.jobTitle}</p>
                            <p className='text-sm'>{item.description}</p>
                        </div>
                    )
                })}
            </div>  

            <hr className='h-0.5 my-2 bg-gray-800'/>

            <div className='bg-slate-900 text-white text-center rounded-sm p-1'>EDUCATION</div>
            <div className='p-1 my-2'>
                { education.length>0 && education.map((item)=>{
                    return (
                        <div className='p-1' key={item.eduId}>
                            <div className='flex justify-between items-center'>
                                <p className='font-bold text-md'>{item.institution}</p>
                                <p className='text-sm'>{item.completionYear}</p>
                            </div>
                            <p className='italic'>{item.courseName}</p>
                           
                        </div>
                    )
                })}
            </div>  

            <hr className='h-0.5 my-2 bg-gray-800'/>

            <div className='bg-slate-900 text-white text-center rounded-sm p-1'>SKILLS</div>
            <div className='p-1 my-2 flex flex-wrap'>
                { skills.length>0 && skills.map((item,index)=>{
                    return (
                        <div className='p-1 border-none mx-1 m-1 px-2 bg-slate-400 shadow-md rounded-md text-white' key={index}>                            
                            <span className='text-md'>{item}</span>       
                        </div>
                    )
                })}
            </div>  
            <hr className='h-0.5 my-2 bg-gray-800'/>
        
            <div className='bg-slate-900 text-white text-center rounded-sm p-1'>CERTIFICATES</div>
            <div className='p-1 my-2'>
                { certificates.length>0 && certificates.map((item)=>{
                    return (
                        <div className='p-1' key={item.licenceId}>
                            <div className='flex justify-between items-center'>
                                <p className='font-bold text-md'>{item.licenceCertificateName} <span className='italic font-normal'>({item.issuingOrganisation})</span></p>
                                <div>
                                    <p className='text-sm'><span>{item.issueDate.month.substring(0,3)}-{item.issueDate.year}</span>  {item.expiryDate.noExpiry ? null : <span> / {item.expiryDate.month.substring(0,3)}-{item.expiryDate.year} </span>}</p>
                                </div>   
                            </div>
                            <p className='text-sm'>{item.description}</p>
                           
                        </div>
                    )
                })}
            </div> 
        </PDFExport>    
        </div>
    </>
  )
}

export default CreateResume