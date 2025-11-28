"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { useCartStore } from "../_stores/cartStore";
import { formatNaira } from "@/app/_utils/helpers";
import Button from "@/app/_components/Button";
import Spinner from "@/app/_components/Spinner";
import Container from "@/app/_components/Container";
import Link from "next/link";
import API from "../_lib/axios";
import { GenericAPIResponse } from "../_types/api";
import { Order } from "../_types/order";

type VerificationStatus = "verifying" | "success" | "failed";

export default function PaymentVerifyPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const transactionId = searchParams.get("transaction_id");
  const txRef = searchParams.get("tx_ref");
  const txStatus = searchParams.get("status");

  useEffect(() => {
    const verifyPayment = async () => {
      // Get query parameters from Flutterwave redirect

      // Check if payment was cancelled
      if (txStatus === "cancelled") {
        setStatus("failed");
        setErrorMessage("Payment was cancelled. Please try again.");
        return;
      }

      if (!transactionId || !txRef) {
        setStatus("failed");
        setErrorMessage("Invalid payment reference. Please contact support.");
        return;
      }

      try {
        const response = await API.get<GenericAPIResponse<Order>>(
          `/orders/verify-order`,
          {
            params: {
              tx_ref: txRef,
              transaction_id: transactionId,
            },
          }
        );
        const data = response.data.data;

        if (response.status === 200 && response.data.status === "success") {
          setStatus("success");
          if (data) setOrderDetails(data);
          // Clear cart after successful payment
          useCartStore.getState().clearCart();
        } else {
          setStatus("failed");
          setErrorMessage(
            response.data.message ||
              "Payment verification failed. Please contact support."
          );
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus("failed");
        setErrorMessage(
          "An error occurred while verifying your payment. Please contact support."
        );
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <Container className="py-12 lg:py-16">
      <div className="max-w-2xl mx-auto">
        {status === "verifying" && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <Spinner size={48} color="#121212" />
            </div>
            <h1 className="text-2xl font-medium mb-3">Verifying Payment</h1>
            <p className="text-[#3b3b3b]">
              Please wait while we confirm your payment...
            </p>
          </div>
        )}

        {status === "success" && orderDetails && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <BsCheckCircle className="text-green-600" size={40} />
              </div>
            </div>
            <h1 className="text-3xl font-medium mb-3">Payment Successful!</h1>
            <p className="text-[#3b3b3b] mb-8">
              Thank you for your order. We've received your payment and will
              process your order shortly.
            </p>

            <div className="bg-gray-50 p-6 mb-8 text-left rounded-xs">
              <h2 className="text-lg font-medium mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#3b3b3b]">Reference ID</span>
                  <span className="font-medium">
                    {orderDetails.ref.split("-")[1]}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#3b3b3b]">Payment Reference</span>
                  <span className="font-medium">{transactionId}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-grey">
                  <span className="text-[#3b3b3b]">Total Amount</span>
                  <span className="font-medium text-lg">
                    {formatNaira(orderDetails.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                <BsXCircle className="text-red-600" size={40} />
              </div>
            </div>
            <h1 className="text-3xl font-medium mb-3">Payment Failed</h1>
            <p className="text-[#3b3b3b] mb-8 max-w-md mx-auto">
              {errorMessage ||
                "We couldn't process your payment. Please try again or contact support."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/checkout">
                <Button size="lg" className="w-full sm:w-auto">
                  Try Again
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" color="white" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>

            <p className="text-sm text-[#3b3b3b] mt-8">
              If you continue to experience issues, please{" "}
              <Link href="/contact" className="link--underline">
                contact our support team
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}
