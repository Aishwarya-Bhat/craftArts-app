import React, { useState, useEffect } from "react";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

export default function Checkout({ cart, order, onCaptureCheckout, errorMsg }) {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [step, setStep] = useState(1);
    const [shipmentData, setShipmentData] = useState({});

    const nextStep = (values) => {
        setStep(step+1);
        setShipmentData(values);
    }

    const prevStep = () => {
        setStep(step -1);
    }
    useEffect(() => {

        const generateToken = async () => {
            try {
                const toaken = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                // console.log(toaken);
                setCheckoutToken(toaken);
            }
            catch (error) {

            }
        }

        generateToken();
    }, [cart])
console.log("All shippment data:", shipmentData);
    return (
        // <>
        // {checkoutToken && <AddressForm checkoutToken={checkoutToken}/>}
        // {/* <AddressForm checkoutToken={checkoutToken}/> */}
        // </>
        <>
         <h2 style={{paddingTop:"20px"}}>Checkout</h2>
        {(() => {
        switch (step) {
          case 1 :
            return checkoutToken && <AddressForm checkoutToken={checkoutToken} nextStep={nextStep}/>
          case 2:
            return <PaymentForm shipmentData={shipmentData} checkoutToken={checkoutToken} prevStep={prevStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>
            case 3: return <div>Order is comfirmed</div>
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