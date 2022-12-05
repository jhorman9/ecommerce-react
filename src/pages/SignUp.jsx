import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUpThunk } from '../store/slice/cart.slice';

const SignUp = () => {

    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const submit = (data) => {
        dispatch(signUpThunk(data))
        navigate('/login')
    }

    return (
    <Form onSubmit={handleSubmit(submit)}>
      <Form.Group className="mb-3">
        <Form.Label className="pt-3">First name</Form.Label>
        <Form.Control {...register('firstName')} type="text" placeholder="Enter name" />

        <Form.Label className="pt-3" >Last name</Form.Label>
        <Form.Control {...register('lastName')}  type="text" placeholder="Enter name" />

        <Form.Label className="pt-3">Email address</Form.Label>
        <Form.Control {...register('email')}  type="email" placeholder="Enter address" />

        <Form.Label className="pt-3">Password</Form.Label>
        <Form.Control {...register('password')} type="password" placeholder="Enter password" />

        <Form.Label className="pt-3">Phone</Form.Label>
        <Form.Control {...register('phone')} type="text" placeholder="Enter name" />

        <Form.Label className="pt-3">Role</Form.Label>
        <Form.Control {...register('role')} type="text" placeholder="Enter name" />

      </Form.Group>

      <Button variant="primary" type="submit">Submit</Button>
    </Form>
    );
};

export default SignUp;