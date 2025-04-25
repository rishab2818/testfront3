import React, { useRef, useState } from "react";
import { ImageFill } from "react-bootstrap-icons";
import { Button, Form } from "react-bootstrap";
import Modal from "../Components/Modal";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";

export default function ImagePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const [file, setFile] = useState();
  const inputRef = useRef(null);
  const [editor] = useLexicalComposerContext();
  
  const onAddImage = () => {
    let src = "";
    if (url) src = url;
    if (file) src = URL.createObjectURL(file);
    editor.update(() => {
      const node = $createImageNode({ src, altText: "Dummy text" });
      $insertNodes([node]);
    });
    setFile(undefined);
    setURL("");
    setIsOpen(false);
  };
  
  return (
    <div>
      <Button
        aria-label="Add Image"
        variant="outline-dark"
        size="sm"
        className="p-1"
        onClick={() => setIsOpen(true)}
      >
        <ImageFill />
      </Button>
      
      <Form.Control
        type="file"
        ref={inputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFile(file);
          }
          e.target.files = null;
        }}
      />
      
      {isOpen && (
        <Modal
          title="Add Image"
          onClose={() => setIsOpen(false)}
          footer={
            <Button
              variant="secondary"
              disabled={!url && !file}
              onClick={onAddImage}
            >
              Add Image
            </Button>
          }
          isOpen={isOpen}
        >
          <Form.Control
            value={url}
            onChange={(e) => setURL(e.target.value)}
            placeholder="Add Image URL"
            className="mb-3"
          />
          
          {/*<Button
            variant="secondary"
            onClick={() => inputRef?.current?.click()}
          >
            {file ? file.name : "Upload Image"}
          </Button> */}
        </Modal>
      )}
    </div>
  );
}