import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Assuming you have Yup for validation
import { addDoc, collection } from 'firebase/firestore'; // Adjust this based on your Firebase setup
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { auth1, db1 } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const SignUp = () => {
    const navigate= useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Call your signup function here (e.g., Firebase authentication)
        await createUserWithEmailAndPassword(auth1,values.email, values.password);

        // Add a new user document and get its ID.
        const docRef = await addDoc(collection(db1, 'users'),  {
            email: values.email,
            personalDetails: {
                firstName: "",
                lastName: "",
                homeLocation: "",
                phoneNumber: "",
            },
            personalSummary: {
                summary: "",
            },
            profilePhoto: "",
            careerHistory: [],
            education: [],
            licenceCertificate: [],
            skills: [],
            languages: [],
            resumes: [],
            availability: "",
            preferredWorkTypes: [],
            preferredLocations: [],
            rightToWork: "",
            salaryExpectation: {
                salary: 0,
                rate: "",
            },
            categoryInterested: "",
            subCategoryInterested: "",
        });

          // ... (other user details)

          // 2. Store the new user document ID in localStorage.
          console.log('New document ID:', docRef.id);
          localStorage.setItem('userId', docRef.id);
          toast.success('Registration successful')
        //   toast.success('Registration successful!', {
        //     position: 'top-right',
        //     autoClose: 3000,
        //   });
          navigate('/login');
        } catch(error) {
          toast.error('Error in signup', error.message);
        //   toast.error('Registration failed. Please try again.', {
        //     position: 'top-right',
        //     autoClose: 3000,
        //   });
        }
      }
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Sign Up</h1>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs">{formik.errors.password}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-xs">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          <p className='cursor-pointer' onClick={()=>navigate('/')}>Already registered Sign In now</p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
