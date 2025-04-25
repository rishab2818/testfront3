import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { RichTextEditor } from "./RichTextEditor";

const Write = () => {
  const [value, setValue] = useState("");

  const handleSave = () => {
    console.log("Saved content:", value);
  };

  return (
    <Container>
      <RichTextEditor
        placeholder="Write Post"
        name="post"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <Button variant="primary" onClick={handleSave} style={{ marginTop: "10px" }}>
        Save
      </Button>
      <h1>Notes</h1>
    </Container>
  );
};

export default Write;