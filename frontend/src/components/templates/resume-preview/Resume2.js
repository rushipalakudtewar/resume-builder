import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdArrowRight } from "react-icons/md";
const Resume2 = ({dataStore, userPhoto, isLoading}) => {
  return (
    <div>
        <div className='w-full  flex justify-between items-center shadow-lg bg-white'>
        <div className='bg-slate-600 w-2/6 p-4 text-white'>
            <div className='m-2 h-60'>
                {/* <img className="mx-auto object-cover w-34 h-34" src={dataStore?.profilePhoto} alt='profile-pic'/> */}
                { isLoading ? <div className="bg-slate-600 animate-pulse h-[210px] w-[210px] border-8 border-white"></div> : 
                    <img className="object-cover h-[210px] w-[210px] border-8 border-white" 
                    src={userPhoto} alt='profile-pic' />
                }
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
  )
}

export default Resume2