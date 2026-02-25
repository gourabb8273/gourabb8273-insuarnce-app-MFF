import React, { Suspense, useEffect, useState } from "react";

const InsuranceDetails = React.lazy(() => import("insuranceDetails/InsuranceDetailsApp"));
const PremiumPayment = React.lazy(() => import("premiumPayment/PremiumPaymentApp"));

export default function App() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // seed policies if not present
  useEffect(() => {
    const existing = localStorage.getItem("policies");
    if (!existing) {
      localStorage.setItem(
        "policies",
        JSON.stringify([
          { policyId: "P-1001", name: "Asha", plan: "Health Plus", premiumDue: 3200 },
          { policyId: "P-1002", name: "Rahul", plan: "Life Secure", premiumDue: 5100 },
        ])
      );
    }
  }, []);

  return (
    <>
      <header>Insurance Portal (Container)</header>
      <main>
        <div className="card">
          <h3>Selected Policy (shared across MFEs)</h3>
          <pre>{selectedPolicy ? JSON.stringify(selectedPolicy, null, 2) : "None selected yet"}</pre>
        </div>

        <div className="card">
          <h3>MFE: Insurance Details</h3>
          <Suspense fallback={<div>Loading Insurance Details...</div>}>
            <InsuranceDetails onSelectPolicy={setSelectedPolicy} />
          </Suspense>
        </div>

        <div className="card">
          <h3>MFE: Premium Payment</h3>
          <Suspense fallback={<div>Loading Premium Payment...</div>}>
            <PremiumPayment selectedPolicy={selectedPolicy} />
          </Suspense>
        </div>
      </main>
    </>
  );
}