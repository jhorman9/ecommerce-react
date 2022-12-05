import axios from 'axios';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const submit = (data) => {
        console.log(data);
        axios.post('https://e-commerce-api.academlo.tech/api/v1/users/login/', data) //para registrar a la apis
        .then(res => 
            {
                navigate("/")
                console.log(res)
                localStorage.setItem("token", res.data.data.token) //guarda una key
            })
        .catch(error => {
            if (error.response?.status === 404) {
                // 404
                alert("Credenciales incorrectas");
              } else {
                console.log(error.response?.data);
              }
        })
    }

    return (
        <>
        <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email" placeholder="Enter email" {...register("email")} />
                <Form.Text 
                className="text-muted"
                
                >
                We'll never share your email with anyone else.
                </Form.Text>    
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password" 
                {...register("password")}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
             Submit
            </Button>
            <Link to={`/signup`}>
              <p className='registerUser'>If you do not have an account, register here</p>
            </Link>
         </Form>
         </>
    );
};

export default Login;