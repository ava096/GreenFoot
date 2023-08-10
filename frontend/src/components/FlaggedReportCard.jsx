import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

function FlaggedReportCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Card></Card>
    </>
  );
}

export default FlaggedReportCard;
