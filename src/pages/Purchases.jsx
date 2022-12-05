import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slice/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchasesThunk());
      }, []);

      const purchases = useSelector(state => state.purchases)

    return (
        <div>
            <h1 className='mb-5'>Purchases</h1>
            {
                    purchases.map(purchase => (
                        <div className='products-purchases' key={purchase.id}>
                            {
                            purchase.cart.products.map(product => (
                                <div key={product.title}>
                                    <Link to={`/detail/${product.id}`}>
                                        <Container>
                                            <Card border="dark" style={{ width: '100%' }}>
                                                <Card.Header>
                                                    {product.productsInCart?.createdAt}
                                                </Card.Header>
                                                <Card.Body>
                                                        <Row>
                                                            <Col>
                                                                {product.title}
                                                            </Col>
                                                            <Col>
                                                                <p className='quantity-productInCart'>
                                                                    {product.productsInCart?.quantity}
                                                                </p>
                                                            </Col>
                                                            <Col>
                                                                <p>
                                                                    Total: ${product.productsInCart?.quantity * product.price}
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                </Card.Body>
                                            </Card>
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