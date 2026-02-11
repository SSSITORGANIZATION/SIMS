import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

export default function CameraCapture({ onCapture, onClose }) {
  const webcamRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");

  // give camera a moment to start
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSwitchCamera = () => {
    setFacingMode(prev => prev === "environment" ? "user" : "environment");
  };

  const capturePhoto = async () => {
    if (!webcamRef.current) return;

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      const blob = await fetch(imageSrc).then(res => res.blob());
      const pngFile = new File([blob], "captured.png", { type: "image/png" });

      onCapture(pngFile, URL.createObjectURL(pngFile));
      onClose();
    } catch (error) {
      console.error("Camera capture error:", error);
      setHasError(true);
    }
  };


  return (
    <div className="modal-content p-3">
      <div className="d-flex justify-content-between">
        <h5 className="fw-bold">Capture Photo</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>

      {hasError ? (
        <div className="text-center p-4">
          <p className="text-danger">Camera access failed. Please check permissions.</p>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/png"
            screenshotQuality={1}
            videoConstraints={{
              facingMode: facingMode,
              width: { ideal: 640 },
              height: { ideal: 480 },
            }}
            onUserMedia={() => setHasError(false)}
            onUserMediaError={() => setHasError(true)}
            className="w-100 rounded-3"
          />

          <div className="text-center mt-3">
            <button
              className="btn btn-primary me-2"
              onClick={capturePhoto}
              disabled={!isReady}
            >
              {isReady ? "Capture" : "Starting camera..."}
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={handleSwitchCamera}
              disabled={!isReady}
            >
              Switch Camera
            </button>
          </div>
        </>
      )}
    </div>
  );
}
