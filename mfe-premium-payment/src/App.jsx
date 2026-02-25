import React, { useEffect, useState } from "react";
import PremiumPaymentApp from "./PremiumPaymentApp";

export default function App() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    // allow standalone testing: pick first policy if present
    const data = JSON.parse(localStorage.getItem("policies") || "[]");
    if (data.length > 0) setSelectedPolicy(data[0]);
  }, []);

  return (
    <div>
      <h2>Premium Payment MFE (Standalone)</h2>
      <PremiumPaymentApp selectedPolicy={selectedPolicy} />
    </div>
  );
}