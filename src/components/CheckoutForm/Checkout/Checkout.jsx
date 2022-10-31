import React, { useState, useEffect } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

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
                // console.log(toaken);
                setCheckoutToken(toaken);
            }
            catch (error) {
                console.log("Genretae token Error:", error);
                navigate("/");
            }
        }
        generateToken();
    }, [cart]);

    let Confirmation = () => order.customer ?
        (
            <>
                <h4>Thanks for your Puarchase {order.customer.firstName} {order.customer.lastName}!!</h4>
                <hr />
                <div>Order Ref: {order.customer_reference}</div>
                <br />
                <Link to="/"> <Button>Back to Home</Button></Link>
            </>
        )
        : isFinished ? (
            <>
                <h4>Thanks for your Puarchase !!</h4>
                <hr />
                <Link to="/"> <Button onClick={refreshCart}>Back to Home</Button></Link>
            </>
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

    console.log("All shippment data:", shipmentData);
    return (
        // <>
        // {checkoutToken && <AddressForm checkoutToken={checkoutToken}/>}
        // {/* <AddressForm checkoutToken={checkoutToken}/> */}
        // </>
        <>
            <h2 style={{ paddingTop: "20px" }}>Checkout</h2>
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


// const Checkout = () => {
//   return (
//     <div>Checkout</div>
//   )
// }

// export default Checkout