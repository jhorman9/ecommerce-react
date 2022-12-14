
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { checkOutCartThunk, createCartThunk } from '../store/slice/cart.slice';
import { getProductsThunk } from '../store/slice/products.slice';

const ProductsDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const productsList = useSelector(state => state.products);

    const productDetail = productsList.find(product => product.id === +id)
    const relatedProduct = productsList.filter(related => related?.category.id == productDetail?.category.id && related.id !== productDetail.id)


    const [counter, setCounter] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const next = () => {
        setCounter(counter + 1);
    };
    const prev = () => {
        setCounter(counter - 1);
    };


    const addCart = () => {
        const productToCart = {
            id: productDetail.id, //id del producto
            quantity: quantity //cantidad del producto
        }
        dispatch(createCartThunk(productToCart)) //despachamos
        setQuantity(1)
    }

    const counterIncrement = () => {
        setQuantity(quantity+1)
    }

    const counterDecrement = () => {
        setQuantity(quantity-1)
        if(quantity <= 0) {
            setQuantity(0)
        }
    }

    return (
        <div className='container'>
                    <Row>
                    <Col lg className='detail--img'>
                        <button className='btn-detail' onClick={prev} disabled={counter == 0}><i className="fa-solid fa-chevron-left "></i></button>
                        <Card.Img
                            variant="top"
                            src={productDetail?.productImgs[counter]}
                            style={{ height: 290, objectFit: 'contain'}}
                        />
                        <button className='btn-detail' onClick={next} disabled={counter == 2}><i className="fa-solid fa-chevron-right"></i></button>
                    </Col>
                    <Col lg className='detail--description'>
                        <h2>{productDetail?.title}</h2>
                        <p>{productDetail?.description}</p>
                        <span>Price</span>
                        <span>{productDetail?.price}</span>
                        <Button className="btn--car__detail" onClick={addCart}>
                            <span>ADD TO CART  </span><i className="fa-solid fa-cart-arrow-down"></i>
                        </Button>
                        <div className='quantity'>
                            <div className="counter-quantity">
                                <button onClick={counterDecrement}>-</button>
                                <input type="text" 
                                    onChange={(e) => setQuantity(e.target.value)}
                                    value={quantity}
                                    />
                                <button onClick={counterIncrement}>+</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            <ul className='related--product'>
                <h4>Related products</h4>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {relatedProduct.map(related => (
                        <Col key={related.id}>
                            <Card>
                                <Link to={`/detail/${related.id}`}>
                                    <Card.Img
                                        key={related.id}
                                        variant="top"
                                        src={related.productImgs[0]}
                                        style={{ height: 210, objectFit: 'contain', padding: 30 }}
                                    />
                                    <div className="line"></div>
                                    <Card.Body>
                                        <div className="info--card">
                                            <Card.Title><h2 style={{ fontSize: 13 }}>{related.title}</h2></Card.Title>
                                            <div className="p">
                                                <Card.Text>
                                                    <span style={{ color: 'rgb(106, 104, 104' }}>Price</span>
                                                </Card.Text>
                                                <Card.Text>
                                                    <span style={{ fontSize: 14 }}>{related.price}</span>
                                                </Card.Text>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </ul>
        </div>


    );
};

export default ProductsDetail;