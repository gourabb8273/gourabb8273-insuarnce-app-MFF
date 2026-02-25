import React, { useEffect, useState } from "react";

export default function InsuranceDetailsApp({ onSelectPolicy }) {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("policies") || "[]");
    setPolicies(data);
  }, []);

  return (
    <div>
      <p>Pick a policy to share with Container / Payment MFE:</p>
      {policies.length === 0 ? (
        <div>No policies found in localStorage.</div>
      ) : (
        <ul>
          {policies.map((p) => (
            <li key={p.policyId} className="policy-row">
              <span className="policy-id">{p.policyId}</span>
              <span className="policy-name">{p.name}</span>
              <span className="policy-plan">{p.plan}</span>
              <span className="policy-due">₹{p.premiumDue}</span>
              <button onClick={() => onSelectPolicy?.(p)}>Select</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}