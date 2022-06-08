import {useState} from 'react';
import {Form, Button, ProgressBar, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';

import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';


const PaymentScreen = ({history}) => {
    ///////////////////////Declaration//////////////////////////////////
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart //destrucuring cart value

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('COD')


    /////////////////////Logic///////////////////////////////////////

    if(!shippingAddress.address) {
        history.push('/shipping')
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))   
        history.push('/placeorder')

        }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <ProgressBar variant='success' now={50} />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal'
                            id='paypal'
                            name='paymentMethod'
                            onChange= {()=> setPaymentMethod('PayPal')}
                        >
                        </Form.Check>
                        <Form.Check
                            type='radio'
                            label='Cash On Delivery'
                            id='cod'
                            checked
                            name='paymentMethod'
                            onChange= {(e)=> setPaymentMethod(e.target.value)}
                        >
                        </Form.Check> 
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;