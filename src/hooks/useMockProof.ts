import { useEffect, useState } from "react";

function randomOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function randomQR() {
  return `SV-${Math.random().toString(36).slice(2, 10)}`;
}

export function useMockProof(refreshKey: number) {
  const [otp, setOtp] = useState(randomOTP());
  const [qrValue, setQrValue] = useState(randomQR());

  useEffect(() => {
    setOtp(randomOTP());
    setQrValue(randomQR());
  }, [refreshKey]);

  return { otp, qrValue };
}
