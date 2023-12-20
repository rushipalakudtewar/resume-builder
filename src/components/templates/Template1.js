import React, { useEffect, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { auth1, db1, storage1 } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

import html2pdf from 'html2pdf.js';
import { ref } from 'yup';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import ShareModel from '../ShareModel';

const Template1 = () => {
    const [dataStore,setDataStore] = useState({})
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const resumeUrl = 'http://localhost:3000/resume';
    const [isModalOpen, setModalOpen] = useState(false);
    const [shareableLink, setShareableLink] = useState('');

    const getUserDetails = async() =>{
        const userId = localStorage.getItem("userId");
        try {
             const userRef = doc(db1, "users", userId);
             const docSnap = await getDoc(userRef);
             if (docSnap.exists()) {
                  const userData = docSnap.data();
                  console.log("User is ",userData);
                  setDataStore(userData)
                } else {
                    console.log("No such document!");
               }
          } catch (error) {
               console.error(error);
          }
    }
    // console.log(dataStore.profilePhoto);
    
    const saveAndGeneratePDF = async() => {
        try{

            const element = document.getElementById('pdf-container');
            console.log(element);
        
            const pdf = await html2pdf(element)
              .from(element)
              .outputPdf();
            console.log(pdf);
            const filename = `resume_${Date.now()}.pdf`;
           
            // Check if storage is null or undefined
            if (!storage1) {
              console.error('Firebase Storage is not initialized.');
              return;
            }
            const storageRef = ref(storage1, `generatedresumes/${filename}`);

           
            await uploadBytes(storageRef, pdf);
        
            const downloadURL = await getDownloadURL(storageRef);
            console.log('Uploaded a file Successfully');
            console.log('File available at url:', downloadURL);
        
            console.log('PDF uploaded to Firebase Storage:', storageRef.fullPath);
            alert('PDF saved and uploaded to Firebase Storage');
                }
                catch(error)
                {
                        console.error('Error uploading PDF to Firebase Storage:', error);
                };
      };

    //show the model
    const generateShareableLink = async () => {
      const user = auth1.currentUser;
      console.log("shareable link",user);
      if (user) {
        const token = await user.getIdToken();
        const link = `http://localhost:3000/shared/${token}`;
        console.log(link);
        setShareableLink(link);
        // You can now use the 'link' variable to share the URL as needed
      }
    


    setModalOpen(true);
};

const closeModal = () => {
    setModalOpen(false);
  };

useEffect(()=>{
    getUserDetails()

        const unsubscribe = auth1.onAuthStateChanged((user) => {
          setIsAuthenticated(!!user);
        });
    
        return () => {
          unsubscribe();
        };
},[])

    
    return (
    <>
       <div>
            <h2>User's Resume</h2>
            {isAuthenticated ? (
                <p>This is the user's resume. Authenticated content goes here.</p>
            ) : (
                <p>This is the user's resume. Non-authenticated content goes here.</p>
            )}
    </div>
    <div className='flex justify-between items-center mx-0 md:mx-64 my-0 md:my-10 '>
        <div>
            <button onClick={()=>navigate('/choosetemplates')} className='bg-indigo-500 hover:bg-indigo-800 px-5 py-1 text-white shadow-md'>Back</button>
        </div>
        <div className='mr-14'>
            <button onClick={saveAndGeneratePDF} className='bg-indigo-500 hover:bg-indigo-800 px-5 py-1 text-white shadow-md mr-2'>Save as PDF</button>
            <button className='bg-indigo-500 hover:bg-indigo-800 px-5 py-1 text-white shadow-md mr-2'>Download</button>
            <button className='bg-indigo-500 hover:bg-indigo-800 px-5 py-1 text-white shadow-md mr-2' onClick={generateShareableLink}>Share</button>
            <ShareModel isOpen={isModalOpen} onClose={closeModal} copiedUrl={shareableLink} />
        </div>
    </div>
    <div className="mx-0 md:mx-60 my-0 md:my-10 bg-gray-200 p-4 m-2 w-[793px] border-gray-800 shadow-lg rounded-md">
    <div className='flex justify-between items-start p-4 w-full bg-white relative' id="pdf-container">
            <div className='bg-blue-500 w-40 h-40 top-0 left-0 absolute'>
            </div>
            <div dir='rtl'> 
                <div className='bg-gray-300 w-28 h-48 bottom-2 left-0 rounded-tr-full rounded-br-full absolute'>
                </div>
            </div>
            <div className='w-2/5 p-4 relative text-center'>
                        <div>
                            <img className="object-cover m-12 w-40 h-40 border-8 border-white rounded-full" 
                            src={ dataStore?.profilePhoto ? dataStore?.profilePhoto : `https://api.dicebear.com/5.x/initials/svg?seed=${dataStore?.personalDetails?.firstName} ${dataStore?.personalDetails?.lastName}`} alt='profile-pic' />
                        </div>
                        <div className='mt-2'>
                            <h4 className='font-bold text-lg p-1'>CONTACT</h4>
                            <div className='ml-2'>
                            <div className='flex items-center mt-1'><MdEmail className='text-md mr-2'/><p className='text-sm'>{dataStore?.email}</p></div>
                            <div className='flex items-center mt-1'><FaPhoneAlt className='text-md mr-2'/><p className='text-sm'>{dataStore?.personalDetails?.phoneNumber}</p></div>
                            <div className='flex items-center mt-1'><FaLocationDot className='text-md mr-2'/><p className='text-sm'>{dataStore?.personalDetails?.homeLocation}</p></div>
                            </div>
                        </div>
                        <div className='mt-2'>
                        <h4 className='font-bold text-lg p-1'>SKILLS</h4>
                            <div className='p-1 flex flex-wrap'>
                                { dataStore?.skills?.length>0 && dataStore?.skills?.map((item,index)=>{
                                    return (
                                        <div className='p-1 border-none mx-1 m-1 px-2 bg-slate-400 shadow-md rounded-md text-white' key={index}>                            
                                            <span className='text-md capitalize'>{item}</span>       
                                        </div>
                                    )
                                })}
                            </div>  
                        </div>
                        <div className='mt-2'>
                            <h4 className='font-bold text-lg p-1'>LANGUAGES</h4>
                            <div className='p-1'>
                                { dataStore?.languages?.length>0 && dataStore?.languages?.map((item,index)=>{
                                    return (
                                        <div className='p-1' key={index}>
                                                
                                                <p className='flex items-center text-md'>{item}</p>
                                        </div>
                                    )
                                })}
                            </div> 
                            </div>  
            </div>
           
            <div dir='ltr'> 
                <div className='bg-gray-300 w-28 h-48 top-8 right-0 rounded-tl-full rounded-bl-full absolute'>
                </div>
            </div>
            <div dir='ltr'> 
                <div className='bg-gray-300 w-28 h-28 bottom-0 right-0 rounded-tl-full  absolute'>
                </div>
            </div>
            <div className='w-4/6 p-4 text-slate-900 h-full relative'>
                <h1 className='font-bold text-6xl uppercase -ml-14'>{dataStore?.personalDetails?.firstName} {dataStore?.personalDetails?.lastName}</h1>
                <h3 className='font-normal text-2xl'>Software Developer</h3>   
                <div className='m-4'>
                <div className='mt-8'>
                    <h4 className='font-bold text-lg p-1 text-center'>CAREER OBJECTIVE</h4>
                    <div className='p-1 text-sm'>{dataStore?.personalSummary?.summary}</div> 
                </div>
                <div className='mt-2'>
                    <h4 className='font-bold text-lg text-center'>EDUCATION</h4>
                    { <div className='p-1'>
                        { dataStore?.education?.length>0 && dataStore?.education?.map((item)=>{
                            return (
                                <div className='px-1' key={item.eduId}>
                                    <div className='flex items-start'>
                                        <div>
                                        <p className='text-xl font-bold'>{item.completionYear}</p>
                                        </div>
                                        <div className='ml-8'>
                                            <p className='font-bold text-md'>{item.institution}</p>
                                            <p className='text-sm'>{item.courseName}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>   }
                </div>
                
                
                <div className='mt-2'>
                    <h4 className='font-bold text-lg text-center'>CERTIFICATES</h4>
                    <div className='p-1'>
                        { dataStore?.licenceCertificate?.length>0 && dataStore?.licenceCertificate?.map((item)=>{
                            return (
                                <div className='p-1' key={item.licenceId}>
                                    <div className='flex justify-between items-center'>
                                        <p className='font-bold text-md'>{item.licenceCertificateName} <span className='italic font-normal'>({item.issuingOrganisation})</span></p>
                                        <div>
                                            <p className='text-sm'><span>{item.issueDate.month.substring(0,3)}-{item.issueDate.year}</span>  {item.expiryDate.noExpiry ? null : <span> / {item.expiryDate.month.substring(0,3)}-{item.expiryDate.year} </span>}</p>
                                        </div>   
                                    </div>
                                </div>
                            )
                        })}
                    </div> 
                </div>
                </div>
            </div>    
    </div>
    </div>
    </>
  )
}

export default Template1