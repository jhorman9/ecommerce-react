import React, { useEffect } from 'react';
import { Button, CardGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartThunk, checkOutCartThunk } from '../store/slice/cart.slice';

const Cart = ({show, handleClose, }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(cartThunk())
    }, [])

    console.log(cart)

    return (
        <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {
                                cart.map(cart => (
                                    <div key={cart.id}>
                                        <h4>{cart.title}</h4>
                                        <h6>${cart.price}</h6>
                                    </div>
                                    
                                ))
                            }
                        <Button onClick={() => dispatch(checkOutCartThunk())}>CheckOut</Button>
                        </Offcanvas.Body>
            </Offcanvas>
    );
};

export default Cart;