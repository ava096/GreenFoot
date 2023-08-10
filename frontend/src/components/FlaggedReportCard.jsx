import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

function FlaggedReportCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return <div>FlaggedReportCard</div>;
}

export default FlaggedReportCard;
