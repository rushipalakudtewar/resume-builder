// SharedPage.js
import React, { useEffect, useState } from 'react';
import { auth1} from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { signInWithCustomToken } from 'firebase/auth';

const SharedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token } = useParams(); 
  useEffect(() => {
    const verifyToken = async () => {
    if (!token) {
            console.error('No token found in the URL');
            return;
        }
    console.log(token)
      try {
        await signInWithCustomToken(auth1,token);

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication failed:', error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div>
      {isAuthenticated ? (
        <p>User is authenticated.</p>
      ) : (
        <p>User is not authenticated.</p>
      )}
      <h1>Heloo</h1>
    </div>
  );
};

export default SharedPage;
