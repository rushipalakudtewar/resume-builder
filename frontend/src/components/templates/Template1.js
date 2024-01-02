import React, { useEffect, useRef, useState } from 'react'
import { db1, storage1 } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, uploadBytes,ref } from 'firebase/storage';
import { Link, useNavigate } from 'react-router-dom';
import ShareModel from '../ShareModel';
import { IoMdArrowBack } from 'react-icons/io';
import Resume1 from './resume-preview/Resume1';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { v4 } from 'uuid';
import toast from 'react-hot-toast';
import Spinner from './spinner/Spinner';

const Template1 = () => {
    const [dataStore,setDataStore] = useState({})
    const navigate = useNavigate();
    const templateRef = useRef(null);
    const [userPhoto, setUserPhoto] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false)
    const [isProcessing,setIsProcessing] = useState(false)

    const getUserDetails = async() =>{
        const userId = localStorage.getItem("userId");
        try {
            setIsLoading(true)
             const userRef = doc(db1, "users", userId);
             const docSnap = await getDoc(userRef);
             if (docSnap.exists()) {
                  const userData = docSnap.data();
                  console.log("User is ",userData);
                  setDataStore(userData)
                  const imageRef = ref(storage1, userData.profilePhoto);
                  const imageURL = await getDownloadURL(imageRef);
        
                  // Fetch the image through your Node.js server
                  fetch(
                    `http://localhost:4001/fetch-image?url=${encodeURIComponent(
                      imageURL
                    )}`
                  )
                    .then((res) => res.blob())
                    .then((blob) => {
                      const reader = new FileReader();
                      reader.onloadend = function () {
                        const base64data = reader.result;
                        setUserPhoto(base64data);
                        setIsLoading(false)
                      };
                      reader.readAsDataURL(blob);

                    });
                    
                } 
                 else {
                    console.log("No such document!");
               }
          } catch (error) {
               console.error(error);
          } 
    }
    const handleGeneratePdf = async() =>{
      const input = templateRef.current;
        try {
            setIsProcessing(true)
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
              orientation: "portrait",
              unit: "px",
              format: "a4",
            });
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, width, height);

            // Convert the PDF to a Blob and store it in Firebase
            const pdfBlob = pdf.output("blob");
            console.log("pdf blob is", pdfBlob);
            console.log("storage1 is ", storage1);
            const filePath = `newgenerated/${'resume' + v4()}.pdf`;
            const storageRef = ref(storage1, filePath);
            await uploadBytes(storageRef, pdfBlob);
            const downloadURL = await getDownloadURL(storageRef);
            console.log("pdfBlob available at url:", downloadURL);
            setDownloadLink(downloadURL)
            setIsProcessing(false)
            toast.success('PDF saved successfully')
        } catch (error) {
          toast.error('Failed to save PDF')
          console.log("error generating pdf", error);
        }

    }

const closeModal = () => {
    setModalOpen(false);
  };

useEffect(()=>{
    getUserDetails()
},[])

    
    return (
    <>
    <div className='flex justify-between items-center relative mx-0 md:mx-64 my-0 md:my-10 '>
        <div>
            <button onClick={()=>navigate('/choosetemplates')} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 shadow-md flex items-center'><IoMdArrowBack className='mr-2'/>Back</button>
        </div>
        <div className='mr-14'>
            <button onClick={handleGeneratePdf} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mr-2'>Save as PDF</button>
            {isProcessing && <Spinner/>}
     
            {downloadLink && <Link to={downloadLink} target="_blank">
              <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 shadow-md mr-2'>Download</button> 
              </Link>
              }
            {downloadLink && <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 shadow-md mr-2' onClick={()=>{setModalOpen(true)}}>Share</button>}
            <ShareModel isOpen={isModalOpen} onClose={closeModal} copiedUrl={downloadLink} />
        </div>
    </div>
    <div className="mx-0 md:mx-60 my-0 md:my-10 bg-gray-200 p-4 m-2 w-[793px] border-gray-800 shadow-lg rounded-md">
    <div ref={templateRef}>
        <Resume1 dataStore={dataStore} userPhoto={userPhoto} isLoading={isLoading} isProcessing={isProcessing}/>
    </div>
    </div>
    </>
  )
}

export default Template1