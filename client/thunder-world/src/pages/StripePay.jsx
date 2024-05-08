import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

const StripePay = ({ grandTotal, clearCart }) => {
  const priceForStripe = grandTotal * 100;
  const publishableKey = "pk_test_51OlDNLSBX6XtUqrlF6qXhGVxmGNBa9KSmIUfzW8NRXHgoqgt5ZqOQGOtSHXGa6FpQ0vjp9QYc5z8KUKNGweVy3or002p99CLh5"; 
  const navigate = useNavigate();

  const onToken = (token) => {
    console.log(token);
    alert("Payment is successful! Your order has been placed.");
    // clearCart();
    navigate('/ordered');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Payment"
      billingAddress
      shippingAddress
      image="https://picsum.photos/200/300"
      description={`Your total is $${grandTotal}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripePay;




