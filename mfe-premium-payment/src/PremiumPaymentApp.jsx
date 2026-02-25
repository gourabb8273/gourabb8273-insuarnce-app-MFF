import React, { useEffect, useMemo, useRef, useState } from "react";

export default function PremiumPaymentApp({ selectedPolicy }) {
  const [status, setStatus] = useState("idle");
  const workerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isStandalone = window.location.port === "3002";
    if (!isStandalone) return;

    workerRef.current = new Worker(new URL("./paymentWorker.js", import.meta.url));

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const dueAmount = useMemo(() => selectedPolicy?.premiumDue ?? 0, [selectedPolicy]);

  function payNow() {
    if (!selectedPolicy) return;
    setStatus("processing");

    if (workerRef.current) {
      workerRef.current.onmessage = (event) => {
        const { receipt } = event.data || {};
        if (!receipt) return;

        localStorage.setItem("lastReceipt", JSON.stringify(receipt));
        setStatus("success");
      };

      workerRef.current.postMessage({
        policyId: selectedPolicy.policyId,
        paidAmount: dueAmount,
      });
    } else {
      setTimeout(() => {
        const receipt = {
          policyId: selectedPolicy.policyId,
          paidAmount: dueAmount,
          paidAt: new Date().toISOString(),
          txnId: "TXN-" + Math.random().toString(16).slice(2).toUpperCase(),
        };

        localStorage.setItem("lastReceipt", JSON.stringify(receipt));
        setStatus("success");
      }, 800);
    }
  }

  return (
    <div>
      {!selectedPolicy ? (
        <div>Please select a policy in Insurance Details MFE.</div>
      ) : (
        <>
          <div>
            Paying for: <b>{selectedPolicy.policyId}</b> ({selectedPolicy.name})<br />
            Amount due: <b>₹{dueAmount}</b>
          </div>

          <button onClick={payNow} disabled={status === "processing"} style={{ marginTop: 10 }}>
            {status === "processing" ? "Processing..." : "Pay Now"}
          </button>

          {status === "success" && (
            <>
              <h4>Payment Success </h4>
              <pre>{localStorage.getItem("lastReceipt")}</pre>
            </>
          )}
        </>
      )}
    </div>
  );
}