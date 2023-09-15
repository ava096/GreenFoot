import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import UpdateTreeForm from "../components/UpdateTreeForm";

function UpdateTree() {
  //get id of report that is being updated
  const { id } = useParams();

  return (
    <Container className="displayContainer">
      <Row>
        <Col>
          <div className="pageTitle">
            <h1>Update a Record</h1>
          </div>
          <div className="pageText">
            <p>
              If you spot an error in a report, or if there is simply some
              information that you wish to change, please submit any ammendments
              through this form!
            </p>
          </div>
          <UpdateTreeForm id={id} />
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateTree;
