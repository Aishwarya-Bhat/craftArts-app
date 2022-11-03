import React, { useState, useEffect } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const pageStyles = {
    displayCenter: 
    {display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    flexDirection: "column"
},
    paddingHeading: { paddingTop: "20px" }
}
export default function Checkout({ cart, order, onCaptureCheckout, errorMsg, refreshCart }) {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [step, setStep] = useState(1);
    const [shipmentData, setShipmentData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const navigate = useNavigate();

    
    const nextStep = (values) => {
        setStep(step + 1);
        setShipmentData(values);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    const timeOut = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }

    useEffect(() => {
        const generateToken = async () => {
            try {
                const toaken = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                setCheckoutToken(toaken);
            }
            catch (error) {
                console.log("Genrate token Error:", error);
                navigate("/");
            }
        }
        generateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    let Confirmation = () => order.customer ?
        (
            <div style={pageStyles.displayCenter}>
                <h4>Thanks for your Puarchase {order.customer.firstName} {order.customer.lastName}!!</h4>
                <hr />
                <div>Order Ref: {order.customer_reference}</div>
                <br />
                <Link to="/"> <Button>Back to Home</Button></Link>
            </div>
        )
        : isFinished ? (
            <div style={pageStyles.displayCenter}>
                <h4>Thanks for your Puarchase !!</h4>
                <hr />
                <Link to="/"> <Button onClick={refreshCart}>Back to Home</Button></Link>
            </div>
        ) :
            (
                <Spinner animation="border" variant="info" />
            )

    if (errorMsg) {
        <>
            <Alert key='danger' variant='danger'>
                Error: {errorMsg}
            </Alert>
            <br />
            <Link to="/"> <Button>Back to Home</Button></Link>
        </>
    }

    return (
        <>
            <h2 style={pageStyles.paddingHeading}>Checkout</h2>
            {(() => {
                switch (step) {
                    case 1:
                        return checkoutToken && <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} />
                    case 2:
                        return <PaymentForm shipmentData={shipmentData} checkoutToken={checkoutToken} prevStep={prevStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeOut={timeOut} />
                    case 3: return <Confirmation />
                    default:
                        return null
                }
            })()}
        </>
    );
}
