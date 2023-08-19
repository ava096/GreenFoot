import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReport } from "../features/reports/reportSlice";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function UserReportCard({ report }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get user info
  const { user } = useSelector((state) => state.auth);

  //To decide if user should see the X button
  let showDelete = false;

  if (user && (user.userRole === "admin" || report.user === user._id)) {
    showDelete = true;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{report.reportTreeType}</Card.Title>
          <Card.Text>
            Created : {new Date(report.createdAt).toLocaleString("en-US")}
          </Card.Text>
          <Button
            variant="success"
            onClick={() => navigate(`/viewReport/${report._id}`)}
          >
            See Report
          </Button>

          {showDelete && (
            <button
              variant="success"
              className="close"
              onClick={() => dispatch(deleteReport(report._id))}
            >
              X
            </button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default UserReportCard;
