import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductsDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant";


const ProductEditScreen = ({ match, history }) => {

  const dispatch = useDispatch();

  const productId = match.params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  //from store.js
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;//destucturing the value we need

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;


  useEffect(() => {

    if(successUpdate){
      dispatch({type: PRODUCT_UPDATE_RESET})
      history.push('/admin/productlist')
      
    }else{
      if(!product.name || product._id !== Number(productId)){
        dispatch(listProductsDetails(productId))
    }else{
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
    }
    }

  }, [product, dispatch, productId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    //update product
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }))
  };

  const uploadFileHandler  = async (e) => {
    //getting the file from the event form frontend
    const file = e.target.files[0] 

    //create a formdata function & add file to the function
    //remeber the key value like image & product_id that used in views are same
    const formData = new FormData()
    formData.append('image', file)
    formData.append('product_id', productId)

    setUploading(true)

    try{
      const config = {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      }
      const {data} = await axios.post('/api/products/upload/', formData, config)

      setImage(data)
      setUploading(false)

    }catch(error){
      setUploading(false)
    }
  }

  return (
    <div>
        <Link to="/admin/productlist">Go Back</Link>

      <FormContainer>
        <h1>EDIT PRODUCTS</h1>

        {/* this loader & error message is occoured while triggering updateProduct */}
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {/* this loader & error message is occoured while triggering userDetails */}
        {loading ? (
          <Loader/>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price} //state
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Set Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.File
                id= 'image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              >
              </Form.File>
              {uploading && <Loader/>}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="countInStock">
              <Form.Label>Stocks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number of Products Available In Stocks"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
