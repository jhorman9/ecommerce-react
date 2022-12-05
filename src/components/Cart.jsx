import React, { useEffect, useState } from 'react';
import { Button, Card, CardGroup, Col, Offcanvas, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartThunk, checkOutCartThunk, deleteProductThunk } from '../store/slice/cart.slice';

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(cartThunk())
    }, [])
  
    const [ totalPrice, setTotalPrice ] = useState(0);
 
    useEffect(() => {
     let total = 0;
     cart.forEach(product => {
         total += product.price * product.productsInCart.quantity;
     })
     setTotalPrice(total)
    }, [cart])

    return (
        <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Cart</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {
                                cart.map(cart => (
                                    <div key={cart.id}>
                                        <div>
                                            <Card className='mb-4 py-2'  style={{ width: '100%' }}>
                                                <Row >
                                                    <Col>
                                                        <h4 style={{ marginLeft: '7px' }}>{cart.title}</h4>
                                                        <h6 style={{ marginLeft: '7px' }}>${cart.price}</h6>
                                                    </Col>     
                                                    <Col className='cart--product__quantity'>
                                                        <p>{cart.productsInCart.quantity}</p>
                                                        <Row>
                                                            <div className='cart--product__delete'>
                                                                <i onClick={() => dispatch(deleteProductThunk(cart.id))} className="fa-solid fa-trash"></i>
                                                            </div>    
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </div>
                                    </div>
                                ))
                            }
                                        <div className="total--cart">
                                            <p>Total: ${totalPrice}</p>
                                        </div>
                        <Button onClick={() => dispatch(checkOutCartThunk())}>Check Out</Button>
                        </Offcanvas.Body>
            </Offcanvas>
    );
};

export default Cart;