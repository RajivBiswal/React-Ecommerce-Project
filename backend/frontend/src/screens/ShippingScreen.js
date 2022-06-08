import {useState} from 'react';
import {Form, Button, ProgressBar} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';


const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart //destrucuring cart value

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [state, setState] = useState(shippingAddress.state);
    const [pincode, setPincode] = useState(shippingAddress.pincode);
    const [landmark, setLandmark] = useState(shippingAddress.landmark);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, state, pincode, landmark}))
        history.push('/payment')
    }
    
    
    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <ProgressBar variant='success' now={25} />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                {/* ADDRESS */}
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* CITY */}
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* STATE */}
                <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter State'
                        value={state ? state : ''}
                        onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* PINCODE */}
                <Form.Group controlId='pincode'>
                    <Form.Label>PIN Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter PIN'
                        value={pincode ? pincode : ''}
                        onChange={(e) => setPincode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* LAND MARK */}
                <Form.Group controlId='landmark'>
                    <Form.Label>Landmark(Optional)</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Landmark'
                        value={landmark ? landmark : ''}
                        onChange={(e) => setLandmark(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
            </FormContainer>
    )
}

export default ShippingScreen;