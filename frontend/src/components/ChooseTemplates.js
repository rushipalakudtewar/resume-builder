import React, { useState,useEffect} from 'react';
import {doc,getDoc} from "firebase/firestore";
import { auth1, db1 } from '../config/firebase';
import { Link, useNavigate} from 'react-router-dom';
import Img1 from "../img/template1.png";
import Img2 from "../img/template2.jpg";
import Img3 from "../img/template3.png";
import Icon1 from "../img/curriculum.png";
import Icon2 from "../img/applicant.png";
import Icon3 from "../img/exit.png";
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { IoMdArrowBack } from "react-icons/io";


const ChooseTemplates = () => {
    const [dataStore,setDataStore] = useState({}) 
    const [percentStatus, setPercentStatus] = useState(0);
    const [emptyFields, setEmptyFields] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
	const countFields = (data) => {
		return Object.keys(data || {}).length;
	};

	const countEmptyFields = (data) => {
		return Object.keys(data || {}).reduce((count, key) => {
			const value = data[key];
			if (typeof value === "object" && Object.keys(value).length === 0) {
				return count + 1; // Count empty objects as one field
			} else if (!value) {
				return count + 1; // Count empty or falsy values as one field
			} else {
				return count;
			}
		}, 0);
	};

    function calculatePercentage(part, whole) {
		if (isNaN(part) || isNaN(whole) || whole === 0) {
			// Handle invalid input
			return "Invalid input";
		}

		return Math.ceil((part / whole) * 100);
	}

	const getEmptyFields = (userData) => {
		const emptyF = [];
		for (const key in userData) {
			if (
				userData.hasOwnProperty(key) &&
				(userData[key] === null ||
					userData[key] === undefined ||
					(Array.isArray(userData[key]) && userData[key].length === 0))
			) {
				emptyF.push(key);
			}
		}
		return emptyF;
	};

       const logout = async() => {
        await signOut(auth1).then(() => {
            localStorage.removeItem('userId')
            toast.success("logout successful");
            navigate('/')
          }).catch((error) => {
            toast.error("Failed to logout",error)
          });
        }

  
    const getUserDetails = async() =>{
        const userId = localStorage.getItem("userId");
        try {
            setIsLoading(true)
            console.log(`loading ${isLoading}`);
            const userRef = doc(db1, "users", userId);
            const docSnap = await getDoc(userRef);
            
            if (docSnap.exists()) {
                  const userData = docSnap.data();
                  console.log("User is ",userData);  
                  const numberOfFields = countFields(userData);
                    const numOfEmptyFields = countEmptyFields(userData);
                    setDataStore(userData)
                    // console.log(`Number of fields in userData: ${numberOfFields}`);
                    // console.log(`Number of Empty fields in userData: ${numOfEmptyFields}`);
                    const emptyF = getEmptyFields(userData);
                    // console.log("Empty fields are", emptyF);
                    setEmptyFields(emptyF);
                    const percentage = calculatePercentage(
                        numberOfFields - numOfEmptyFields,
                        numberOfFields
                        );
                        console.log("percentage is", percentage);
                        setPercentStatus(percentage);
                        setIsLoading(false);
                } else {
                    console.log("No such document!");
               }
            } catch (error) {
               console.error(error);
          }  
    }
    console.log(dataStore.profilePhoto);
  
    useEffect(()=>{
        getUserDetails()
    },[])
    return (
    <div className='flex justify-evenly items-center h-screen px-5 bg-slate-50'>
        <div className='w-1/4 bg-gradient-to-b from-cyan-500 to-blue-500 text-white h-[600px] rounded-md shadow-lg'>
            <div className='mt-6 mx-20'>
                { isLoading ? <div className="rounded-full animate-pulse bg-slate-700 w-[170px] h-[170px]"></div> :
                 <img src={ dataStore?.profilePhoto ? dataStore?.profilePhoto : `https://api.dicebear.com/5.x/initials/svg?seed=${dataStore?.personalDetails?.firstName} ${dataStore?.personalDetails?.lastName}`} alt='profile' className='rounded-full w-[170px] h-[170px] shadow-md shadow-zinc-200'/>
                 }
            </div>
            <div className='mt-4 text-center mb-5'>
                <p className='font-bold text-2xl capitalize'>{dataStore?.personalDetails?.firstName} {dataStore?.personalDetails?.lastName}</p>
                <p className='font-semibold text-lg capitalize'>Software Developer</p>
                <p className='text-md capitalize'>{dataStore?.personalDetails?.homeLocation}</p>
            </div>
            <hr className='bg-slate-300 m-2 mx-16'/>
            <div className='mt-8 flex-col ml-10'>
                <ul>
                    <li className='w-48 mt-2 text-lg p-1 cursor-pointer flex items-center transition-transform transform hover:scale-105' onClick={logout}>
                    <span className='bg-slate-200 rounded-full shadow-md p-1 shadow-slate-400 mr-2'>
                        <img src={Icon1} className='w-7 h-7 p-1' />
                    </span>
                    Resume
                    </li>
                    <li className='w-48 mt-2 text-lg p-1 cursor-pointer flex items-center transition-transform transform hover:scale-105' onClick={logout}>
                    <span className='bg-slate-200 rounded-full shadow-md p-1 shadow-slate-400 mr-2'>
                        <img src={Icon2} className='w-7 h-7 p-1' />
                    </span>
                    Digital Templates
                    </li>
                    <li className='w-48 mt-2 text-lg p-1 cursor-pointer flex items-center transition-transform transform hover:scale-105' onClick={logout}>
                    <span className='bg-slate-200 rounded-full shadow-md p-1 shadow-slate-400 mr-2'>
                        <img src={Icon3} className='w-7 h-7 p-1' />
                    </span>
                    Logout
                    </li>
                </ul>
            </div>
        </div>
        <div className='w-3/4  h-[600px] ml-4 shadow-2xl'>
            <div className='bg-gradient-to-b from-cyan-500 to-blue-500 h-32 m-2 mx-8 rounded-md shadow-lg'> 
               <div className='flex justify-between items-start'>
               <p className='ml-5 mt-3 cursor-pointer flex items-center text-white rounded-full shadow-sm  hover:shadow-slate-300 p-1 shadow-slate-100 mr-2 transition-transform transform hover:scale-105' onClick={()=>navigate('/')}><IoMdArrowBack className='text-3xl '/></p> 
            <div className='flex justify-end items-center'>
                <div className='mr-7'>
                    <p className='text-4xl text-white font-bold'>Way to go!</p>
                </div>
                {/* <!-- Circular Progress --> */}
                <div className="float-right mr-10 mt-2 relative h-28 w-28">
                    <svg className="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                        {/* Background Circle */}
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-white" strokeWidth="2"></circle>
                        {/* Progress Circle inside a group with rotation */}
                        <g className="origin-center -rotate-90 transform">
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-cyan-700" strokeWidth="2" strokeDasharray="100" style={{ strokeDashoffset: percentStatus }} ></circle>
                        </g>
                    </svg>
                    {/* Percentage Text */}
                    <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-transform hover:scale-105">
                        <span className="text-center text-2xl font-bold text-gray-800 dark:text-white ">{percentStatus}%</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <h1 className='text-center text-slate-700 font-bold text-5xl'>Choose The Templates</h1>
            <div className='flex justify-evenly items-center mt-10'>
                <div className='flex flex-col hover:text-blue-600'>
                    <Link to='/template1'>
                            <img
                                src={Img1}
                                className='w-56 h-72 shadow-2xl transition-all duration-700 hover:scale-110'
                                alt="template1"
                            />
                    </Link>
                    <h4 className='mt-5 font-semibold text-center text-xl '>Fresher</h4> 
                </div>
                <div className='flex flex-col hover:text-blue-600'>
                    <Link to='/template2'><img src={Img2} className='w-56 h-72 shadow-2xl transition-all duration-700 hover:scale-110' alt="template1"/></Link>
                    <h4 className='mt-5 font-semibold text-center text-xl '>Mid-level</h4>
                </div>
                <div className='flex flex-col hover:text-blue-600'>
                    <Link to='/template3'><img src={Img3} className='w-56 h-72 shadow-2xl transition-all duration-700 hover:scale-110' alt="template1"/></Link>
                    <h4 className='mt-5 font-semibold text-center text-xl '>Experienced</h4>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ChooseTemplates