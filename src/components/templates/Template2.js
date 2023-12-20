import React, { useEffect, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdArrowRight } from "react-icons/md";
import { db1 } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Template2 = () => {
    const [dataStore,setDataStore] = useState({})
    
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

    useEffect(()=>{
        getUserDetails()
    },[])



    return (
  <>
  <div className="mx-0 md:mx-60 my-0 md:my-10 bg-gray-200 p-4 m-2 w-[793px] border-gray-800 shadow-lg rounded-md">
    <div className='w-full flex justify-between items-center shadow-lg bg-white'>
        <div className='bg-slate-600 w-2/6 p-4 text-white h-full'>
            <div className='m-2'>
                <img className="mx-auto object-cover w-34 h-34" src={dataStore?.profilePhoto} alt='profile-pic'/>
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
                                    
                                    <p className='flex items-center text-md'><MdArrowRight className='text-lg'/>{item}</p>
                            </div>
                        )
                    })}
                </div> 
            </div>

        </div>
        <div className='w-4/6 p-4 text-slate-900 h-full '>
            <h1 className='font-bold text-5xl uppercase'>{dataStore?.personalDetails?.firstName} {dataStore?.personalDetails?.lastName}</h1>
            <hr className='h-1 w-4/5 rounded-lg border-none  bg-gray-800'/>
            <h3 className='font-bold text-2xl'>Software Developer</h3>   
            <div className='mt-2'>
                <h4 className='font-bold text-lg p-1'>CAREER OBJECTIVE</h4>
                <div className='p-1 text-sm'>{dataStore?.personalSummary?.summary}</div> 
            </div>
            <div className='mt-2'>
                <h4 className='font-bold text-lg'>EDUCATION</h4>
                <hr className='h-1 w-1/4 rounded-lg border-none  bg-gray-800'/>
                <div className='p-1'>
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
                </div>  
            </div>
            
            <div className='mt-2'>
                <h4 className='font-bold text-lg'>EXPERIENCE</h4>
                <hr className='h-1 w-1/4 rounded-lg border-none  bg-gray-800'/>
                <div className='p-1'>
                    { dataStore?.careerHistory?.length>0 && dataStore?.careerHistory?.map((item,index)=>{
                        return (
                            <div className='p-1' key={index}>
                                <div className='flex justify-center items-start'>
                                    <div>
                                        <p className='text-xl font-bold'>{ item.ended.stillInRole ? <span>Current</span> : <span>{item.ended.year}</span>}</p>
                                    </div>
                                    <div className='ml-8'>
                                        <p className='font-bold text-md'>{item.companyName} - <span className='font-normal text-md'>{item.jobTitle}</span></p>
                                        <p className='text-sm'>{item.description}</p>        
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>  
            </div>
            <div className='mt-2'>
                <h4 className='font-bold text-lg'>CERTIFICATES</h4>
                <hr className='h-1 w-1/4 rounded-lg border-none  bg-gray-800'/>
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
  </>
  )
}

export default Template2