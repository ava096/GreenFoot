import React from "react";
import { Alert } from "react-bootstrap";

function AlertMessage({ show, variant, message, onClose }) {
  if (!show) return null;

  const variantClass =
    variant === "custom-amber" ? "alert-custom-amber" : `alert-${variant}`;

  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
}

export default AlertMessage;
