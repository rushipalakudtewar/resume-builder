import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Resume1 = ({dataStore, userPhoto, isLoading}) => {
  return (
    
    <div>
        {/* A4 size width=794px and height=1123px */}
        <div className='flex justify-between items-start p-4 w-full bg-white relative'>
    <div className='bg-blue-500 w-40 h-40 top-0 left-0 absolute'>
    </div>
    
    <div dir='rtl'> 
        <div className='bg-gray-300 w-28 h-48 bottom-2 left-0 rounded-tr-full rounded-br-full absolute'>
        </div>
    </div>
    <div className='w-2/5 p-4 relative text-center'>
             
                <div className='w-full'>
                { isLoading ? <div className="rounded-full bg-gray-300 h-40 w-40 m-12 border-8 border-white"></div> : 
                    <img className="object-cover m-12 w-40 h-40 border-8 border-white rounded-full" 
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
                                <div className='p-1 border-none mx-1 m-1 px-2 pb-1 bg-slate-400 shadow-md rounded-md text-white' key={index}>                            
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
  )
}

export default Resume1