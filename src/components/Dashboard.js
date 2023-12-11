import React from 'react'
import { signOut } from 'firebase/auth';
import { auth1 } from '../config/firebase';
import CreateResume from './CreateResume';

const Dashboard = () => {
    const logout = () => {
        signOut(auth1).then(() => {
            alert("logout successful");
          }).catch((error) => {
            console.log(error);
          });
        }
  return (
    <div>
        <button onClick={()=>{logout()}} className='m-14 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-md py-2 px-4 sm:px-6 lg:px-8'>Logout</button>        
        <div className='w-[793px] h-[1722px] mb-20'>
          <CreateResume/>
        </div>
    </div>
  )
}

export default Dashboard;