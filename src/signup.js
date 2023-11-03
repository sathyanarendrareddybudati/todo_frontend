import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const initialValues = {
    name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    phone_number: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', values);
      const { token, msg } = response.data;
      console.log('Response:', response); 
      console.log('Token:', token);
      console.log('Registration Message:', msg);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>User Signup</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
        <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="phone_number">Phone Number</label>
            <Field type="text" id="phone_number" name="phone_number" />
            <ErrorMessage name="phone_number" component="div" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <div>
            <label htmlFor="confirm_password">Confirm Password</label>
            <Field type="password" id="confirm_password" name="confirm_password" />
            <ErrorMessage name="confirm_password" component="div" />
          </div>
          
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
export default SignupForm;