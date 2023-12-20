import React, { useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { db1 } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Template3 = () => {
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
    <div className='shadow-md p-2 bg-white'>
        <div className="flex justify-between items-start">
                    <div>
                        <div className='font-semibold text-2xl text-sky-950'>{dataStore?.personalDetails?.firstName} {dataStore?.personalDetails?.lastName}</div>
                        <div className='text-xl text-gray-700'>Bussiness Development Manager</div>
                        <div className='p-1 text-sm w-4/5'>{dataStore?.personalSummary?.summary}</div>
                    </div>
                    <div className='text-blue flex flex-col items-end'>
                        <div className='flex items-center mt-1 float-right'><p className='text-md'>{dataStore.email}</p><MdEmail className='text-md ml-2'/></div>
                        <div className='flex items-center mt-1 float-right'><p className='text-md'>{dataStore?.personalDetails?.phoneNumber}</p><FaPhoneAlt className='text-md ml-2'/></div>
                        <div className='flex items-center mt-1 float-right'><p className='text-md'>{dataStore?.personalDetails?.homeLocation}</p><FaLocationDot className='text-md ml-2'/></div>
                    </div>
            </div>
        
            <div className='mt-2'>
                <hr className='h-0.5 border-none bg-gray-800'/>
                <div className='text-center font-bold text-gray-700'>SKILLS</div>
                <hr className='h-0.5 border-none bg-gray-800'/>
                <div className='p-1 my-2 flex flex-wrap'>
                { dataStore?.skills?.length>0 && dataStore?.skills?.map((item,index)=>{
                    return (
                        <div className='p-1 border-none mx-1 m-1 px-2 bg-sky-950 shadow-md rounded-md text-white' key={  index}>                            
                            <span className='text-md capitalize'>{item}</span>       
                        </div>
                    )
                })}
            </div>  
            </div>
            <div>
            <hr className='h-0.5 border-none bg-gray-800'/>
                <div className='text-center font-bold text-gray-700'>WORK EXPERIENCE</div>
                <hr className='h-0.5 border-none bg-gray-800'/>
                <div className='p-1 my-2'>
                { dataStore?.careerHistory?.length>0 && dataStore?.careerHistory?.map((item,index)=>{
                    return (
                        <div className='p-1' key={index}>
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
            </div>
            <div>
            <hr className='h-0.5 border-none bg-gray-800'/>
                <div className='text-center font-bold text-gray-700'>EDUCATION</div>
                <hr className='h-0.5 border-none bg-gray-800'/>
            <div className='p-1 my-2'>
                { dataStore?.education?.length>0 && dataStore?.education?.map((item)=>{
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
            </div>


            <div>
                <hr className='h-0.5 border-none bg-gray-800'/>
                    <div className='text-center font-bold text-gray-700'>CERTIFICATES</div>
                    <hr className='h-0.5 border-none bg-gray-800'/>
                    <div className='p-1 my-2'>
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
    </>
  )
}

export default Template3