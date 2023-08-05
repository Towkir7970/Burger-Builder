import { Formik } from 'formik';
import React from "react";

class Auth extends React.Component{
    render(){
        return(
            <div>
                <Formik initialValues={
                    {
                        email: "",
                        password: "",
                        passwordConfirm: ""
                    }
                }
                onSubmit={(values)=>{
                    console.log(values)
                }}
                
                validate={(values)=>{
                    const errors = {};
                    if(!values.email){
                        errors.email = 'Required';
                    }
                    if(!values.password){
                        errors.password = 'Required';
                    }
                    if(!values.passwordConfirm){
                        errors.passwordConfirm='Required';
                    }else if(values.password !== values.passwordConfirm){
                        errors.passwordConfirm='Passwords did not match';
                    }

                    return errors;
                }}
                >
                
                {({values, handleChange, handleSubmit, errors})=>(
                <div style={{
                    border: "1px grey solid",
                    padding: "15px",
                    borderRadius: "7px"
                }}>
                    <form onSubmit={handleSubmit}>
                        <input value={values.email} name="email" placeholder="Enter your mail" className="form-control" onChange={handleChange} />
                        {errors.email}
                        <br />
                        <input value={values.password} name="password" placeholder="Enter your password" className="form-control" onChange={handleChange} />
                        {errors.password}
                        <br />
                        <input value={values.passwordConfirm} name="passwordConfirm" placeholder="Confirm Password" className="form-control" onChange={handleChange} />
                        {errors.passwordConfirm}
                        <br />
                        <button type='submit' className='btn btn-success'>Sign Up</button>
                    </form>
                </div>)}
                </Formik>
            </div>
        );
    }
}

export default Auth;