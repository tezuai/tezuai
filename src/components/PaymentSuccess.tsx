import { CheckCircle, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentSuccessProps {
  planName: string;
  amount: number;
  transactionId: string;
  onDashboard: () => void;
}

export function PaymentSuccess({
  planName,
  amount,
  transactionId,
  onDashboard,
}: PaymentSuccessProps) {
  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">भुगतान सफल!</CardTitle>
          <CardDescription>
            आपका {planName} प्लान सक्रिय हो गया है
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">प्लान:</span>
              <span className="font-medium">{planName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">राशि:</span>
              <span className="font-medium">₹{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">लेनदेन ID:</span>
              <span className="font-mono text-sm">{transactionId}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={onDashboard} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              डैशबोर्ड पर जाएं
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              रसीद डाउनलोड करें
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            एक पुष्टिकरण ईमेल आपके पंजीकृत ईमेल पते पर भेजा गया है
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
