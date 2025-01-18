import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentForm = ({ record, setPayrolls, setSelectedRecord }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const handlePay = async () => {
    try {
      if (!stripe || !elements) {
        return;
      }

      // Create payment intent
      const { data } = await axiosSecure.post("/pay-with-bank", {
        amount: record.salary,
        email: record.email,
        name: record.name
      });

      if (!data?.clientSecret) {
        throw new Error("Failed to get payment intent");
      }

      // Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: record.name,
              email: record.email
            },
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        // Update payroll record
        await axiosSecure.put(`/payroll/${record._id}`, {
          paymentDate: new Date().toISOString(),
          transactionId: paymentIntent.id,
        });

        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Transaction ID: ${paymentIntent.id}`,
        });

        setPayrolls(prev => 
          prev.map(item => 
            item._id === record._id 
              ? { ...item, paymentDate: new Date().toISOString(), isPaid: true }
              : item
          )
        );
        setSelectedRecord(null);
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message
      });
    }
  };

  return (
    <div className="p-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button 
        className="btn btn-primary mt-4"
        onClick={handlePay}
        disabled={!stripe}
      >
        Pay ${record?.salary}
      </button>
    </div>
  );
};

export default PaymentForm;