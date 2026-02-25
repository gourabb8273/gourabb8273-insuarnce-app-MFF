import React, { useEffect, useState } from "react";
import InsuranceDetailsApp from "./InsuranceDetailsApp";

export default function App() {
  const [selected, setSelected] = useState(null);

  // seed policies if not present (so MFE works alone)
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
    <div>
      <h2>Insurance Details MFE (Standalone)</h2>
      <InsuranceDetailsApp onSelectPolicy={setSelected} />
      <h4>Selected (local view)</h4>
      <pre>{selected ? JSON.stringify(selected, null, 2) : "None"}</pre>
    </div>
  );
}