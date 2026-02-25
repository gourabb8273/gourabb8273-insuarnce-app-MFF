self.onmessage = (event) => {
  const { policyId, paidAmount } = event.data || {};

  // simulate some processing work
  const start = Date.now();
  while (Date.now() - start < 600) {
    // busy wait to emulate heavy computation
  }

  const receipt = {
    policyId,
    paidAmount,
    paidAt: new Date().toISOString(),
    txnId: "TXN-" + Math.random().toString(16).slice(2).toUpperCase(),
  };

  self.postMessage({ receipt });
};

