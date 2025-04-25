import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Container, Button, Form, Card } from "react-bootstrap";
import SubjectDropdown from "../components/EditorComponents/SubjectDropdown";
import CategorySelector from "../components/EditorComponents/CategorySelector";
import PrivacySelector from "../components/EditorComponents/PrivacySelector";
import AnonymousCheckbox from "../components/EditorComponents/AnonymousCheckbox";
import AddAnswerToggle from "../components/EditorComponents/AddAnswerToggle";
import RichTextEditor from "../lexical/RichTextEditor";
import { submitQuestion } from "../APIs/submitQuestion";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
} from "../utils/toast";

const AskContent = () => {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { user } = useContext(AuthContext);
  const [addAnswer, setAddAnswer] = useState(false);
  const isOnlyHtmlTags = (content) => {
    const htmlTagsRegex = /<([a-z][\s\S]*?)>/gi;
    const cleanedContent = content.replace(htmlTagsRegex, "");
    return cleanedContent.trim() === ""; // If only HTML tags, return true
  };
  const handleSubmit = async () => {
    if (!user) {
      showErrorToast("Please log in first!");
      return;
    }
    if (!subject) {
      showErrorToast("Please Add Subject!");
      return;
    }
    if (!title) {
      showErrorToast("Please Add Title!");
      return;
    }
    if (!category) {
      showErrorToast("Please Select Relevant Category!");
      return;
    }
    if (addAnswer && isOnlyHtmlTags(value)) {
      showErrorToast("Please add content to the answer!");
      return;
    }
    let groupId = null;
    const { success, data, error } = await submitQuestion({
      subject,
      title,
      value,
      category,
      privacy,
      isAnonymous,
      user,
      groupId,
      addAnswer,
    });

    if (success) {
      showSuccessToast("Post submitted successfully!");
    } else {
      showErrorToast(error || "Something went wrong!");
    }
  };

  return (
    <Container fluid className="py-4 d-flex justify-content-center">
      <Card
        className="p-4 w-100 shadow rounded-4 bg-white"
        style={{ maxWidth: "1000px" }}
      >
        <h2 className="mb-4 fs-4 fw-semibold text-dark text-center">
          Add Post
        </h2>

        <div className="mb-3">
          <SubjectDropdown value={subject} onChange={setSubject} />
        </div>

        <div className="mb-3">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control rounded-3 shadow-sm p-3"
          />
        </div>
        <div className="mb-4">
          <AddAnswerToggle value={addAnswer} onChange={setAddAnswer} />
        </div>
        {addAnswer && (
          <div className="mb-4">
            <RichTextEditor
              placeholder="Add Content here..."
              name="post"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>
        )}

        <div className="mb-4">
          <CategorySelector value={category} onChange={setCategory} />
        </div>

        <div className="mb-4">
          <PrivacySelector value={privacy} onChange={setPrivacy} />
        </div>

        <div className="mb-4">
          <AnonymousCheckbox value={isAnonymous} onChange={setIsAnonymous} />
        </div>

        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            className="px-5 py-2 rounded-3 shadow-sm fw-semibold"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default AskContent;
