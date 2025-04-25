import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import SubjectDropdown from "../components/EditorComponents/SubjectDropdown";
import PrivacySelector from "../components/EditorComponents/PrivacySelector";
import AnonymousCheckbox from "../components/EditorComponents/AnonymousCheckbox";
import "animate.css";

const AskPrelims = () => {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [privacy, setPrivacy] = useState("public");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value.replace(/\n/g, "<br>"));
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value.replace(/\n/g, "<br>");
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    const formData = {
      subject,
      title,
      options,
      privacy,
      isAnonymous,
    };
    console.log("Prelims Poll Submitted:", formData);
  };

  return (
    <Container fluid className="p-4" style={{ maxWidth: "720px" }}>
      <Card
        className="shadow-sm p-4 p-lg-5 animate__animated animate__fadeInUp"
        style={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
      >
        <h2
          className="mb-4 text-center"
          style={{ fontWeight: "600", color: "#343a40", marginTop: "-10px" }}
        >
          Add Prelims Question
        </h2>

        <Row className="mb-3">
          <Col md={6} sm={12}>
            <SubjectDropdown value={subject} onChange={setSubject} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter Question Title..."
              value={title.replace(/<br>/g, "\n")}
              onChange={handleTitleChange}
              style={{
                minHeight: "60px",
                maxHeight: "300px",
                overflowY: "auto",
                resize: "vertical",
                borderRadius: "14px",
                padding: "14px",
                backgroundColor: "#ffffff",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
                border: "1px solid #e0e0e0",
              }}
            />
          </Col>
        </Row>

        {options.map((option, index) => (
          <Row key={index} className="mb-3">
            <Col md={12}>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder={`Option ${String.fromCharCode(65 + index)}...`}
                value={option.replace(/<br>/g, "\n")}
                onChange={(e) => handleOptionChange(index, e)}
                style={{
                  minHeight: "50px",
                  resize: "vertical",
                  borderRadius: "14px",
                  padding: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
                  border: "1px solid #e0e0e0",
                }}
              />
            </Col>
          </Row>
        ))}

        <Row className="mb-4">
          <Col md={6} sm={12}>
            <PrivacySelector value={privacy} onChange={setPrivacy} />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} sm={12}>
            <AnonymousCheckbox value={isAnonymous} onChange={setIsAnonymous} />
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" size="md" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default AskPrelims;
