import React from 'react';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useFormik } from "formik";
import Review from './Review';
import { Button, Card, Form } from 'react-bootstrap';

const stripePromise = loadStripe('pk_test_51LxGHZH4POsR5fDJYW9alcsTp7tM8BddkVVxESkU94KrT5EFg9lvXvQEOWKlMyEHy8jJfDXl7eR47T10w364mMWs00s1kPJnBh');

const pageStyles = {
  fullCard: { padding: "20px", margin: "2% 10%" },
  paymentButtons: { display: "flex", justifyContent: "space-between" },
};
const PaymentForm = ({shipmentData, checkoutToken, prevStep, onCaptureCheckout, nextStep, timeOut}) => {

    const formik = useFormik({
        onSubmit: values => {
        }
    });

const handlePay = async (e,elements, stripe) => {
    e.preventDefault();
    if(!stripe || !elements) return;

    const cardElement =  elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});
    if(error) {
        console.log("Error in handlePay...........:", error);
    }
    else {
        const orderData = {
            line_items: checkoutToken.line_items,
            customer: {firstname: shipmentData.firstName, lastname: shipmentData.lastName, email:shipmentData.email},
            shipping: {
                name: 'Primary',
                street: shipmentData.address,
                town_city: shipmentData.city,
                county_state: shipmentData.subDivision,
                postal_zip_code: shipmentData.zip,
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
        timeOut();
        nextStep();
    }


}
  return (
    <> <h6>Payment Form </h6>
    <Card style={pageStyles.fullCard}>
    <Review checkoutToken={checkoutToken}/>
    <hr class="hr hr-blurry" />
    <h6>Payment Method</h6>
    <Elements stripe={stripePromise}>
        <ElementsConsumer>
            {({elements, stripe}) => (
                <Form onSubmit={formik.handleSubmit}>
                    <CardElement />
                    <br /><br />
                    <div style={pageStyles.paymentButtons}>
                        <Button variant="primary" onClick={prevStep}>Back</Button>
                        <Button type="submit" variant="primary" disabled={!stripe} onClick={(e) => handlePay(e,elements, stripe)}>Pay {checkoutToken.total.formatted_with_symbol}</Button>
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