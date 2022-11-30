import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slice/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchasesThunk());
      }, []);

      const purchases = useSelector(state => state.purchases)

      console.log(purchases)

    return (
        <div>
            <h1 className='mb-5'>Purchases</h1>
            {
                    purchases.map(purchase => (
                        <div key={purchase.id}>
                            {
                            purchase.cart.products.map(product => (
                                <div key={product.title}>
                                    <Link to={`/detail/${product.id}`}>
                                        <Container>
                                            <Row className='justify-content-center align-self-center h-auto pb-5'>
                                                <Col>
                                                    <h3><b>brand: {product.brand}</b></h3>
                                                    <h3><b>Product: </b>{product.title}</h3>
                                                    <h3><b>Price: </b>${product.price}</h3>
                                                    <h3><b>Purchase Date: </b>{product.createdAt}</h3>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Link>
                                </div>
                            ))
                            }
                        </div>
                    ))
                }

        </div>
    );
};

export default Purchases;