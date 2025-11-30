import { useState } from "react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { PaymentSuccess } from "@/components/PaymentSuccess";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CheckoutPageProps {
  planId: string;
  planName: string;
  amount: number;
  billingPeriod: "monthly" | "yearly";
  onBack: () => void;
  onComplete: () => void;
}

export function CheckoutPage({
  planId,
  planName,
  amount,
  billingPeriod,
  onBack,
  onComplete,
}: CheckoutPageProps) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId] = useState(`TXN${Date.now()}`);

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <PaymentSuccess
          planName={planName}
          amount={amount}
          transactionId={transactionId}
          onDashboard={onComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="container mx-auto py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          वापस जाएं
        </Button>

        <CheckoutForm
          planId={planId}
          planName={planName}
          amount={amount}
          billingPeriod={billingPeriod}
          onSuccess={() => setPaymentSuccess(true)}
          onCancel={onBack}
        />
      </div>
    </div>
  );
}
