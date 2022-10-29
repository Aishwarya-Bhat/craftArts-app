import React from 'react';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useFormik } from "formik";
import Review from './Review';
import { Button, Card, Form } from 'react-bootstrap';

const stripePromise = loadStripe('pk_test_51LxGHZH4POsR5fDJYW9alcsTp7tM8BddkVVxESkU94KrT5EFg9lvXvQEOWKlMyEHy8jJfDXl7eR47T10w364mMWs00s1kPJnBh');

const PaymentForm = ({shipmentData, checkoutToken, prevStep, onCaptureCheckout, nextStep}) => {
    console.log("In paymentform Shipment data", shipmentData);

    const formik = useFormik({
        onSubmit: values => {
            // console.log("All values:", values)
            // alert(JSON.stringify(values, null, 2));
            // nextStep(values);

            // setFormState(values);
        }
    });

const handlePay = async (elements, stripe) => {
    console.log("Inside handlePay", elements, stripe);
    if(!stripe || !elements) return;

    const cardElmnt =  elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElmnt});

    if(error) {
        console.log(error);
    }
    else {
        const orderData = {
            line_items: checkoutToken.line_items,
            customer: {firstname: shipmentData.firstName, lastname: shipmentData.lastName, email:shipmentData.email},
            shipping: {
                name: 'Primary',
                // street: shipmentData.address,
                // town_city: shipmentData.city,
                county_state: shipmentData.subDivision,
                // postal_zip_code: shipmentData.zip,
                country: shipmentData.country,
            },
            fulfillemnt: {shipping_method: shipmentData.option},
            payment: {
                gateway: 'stripe',
                stripe: {
                    payment_method_id: paymentMethod.id
                }
            }
        }
        onCaptureCheckout(checkoutToken.id, orderData);
        nextStep();
    }


}
  return (
    <> <h4>Payment Form </h4>
    <Card style={{ padding: "20px", margin: "2% 10%" }}>
    <Review checkoutToken={checkoutToken}/>
    <hr class="hr hr-blurry" />
    <h6>Payment Method</h6>
    <Elements stripe={stripePromise}>
        <ElementsConsumer>
            {({elements, stripe}) => (
                <Form onSubmit={formik.handleSubmit}>
                    <CardElement />
                    <br /><br />
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant="primary" onClick={prevStep}>Back</Button>
                        <Button type="submit" variant="primary" disabled={!stripe} onClick={() => handlePay(elements, stripe)}>Pay {checkoutToken.total.formatted_with_symbol}</Button>
                    </div>
                </Form>
            )}
        </ElementsConsumer>

    </Elements>
    </Card>
   </>
  )
}

export default PaymentForm