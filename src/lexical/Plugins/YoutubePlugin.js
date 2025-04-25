import React, { useState } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Youtube } from "react-bootstrap-icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createYoutubeNode } from "../nodes/YoutubeNode";
import { $insertNodes } from "lexical";

export default function YoutubePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const [editor] = useLexicalComposerContext();

  const onEmbed = () => {
    if (!url) return;
    const match =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);
    const id = match && match?.[2]?.length === 11 ? match?.[2] : null;
    if (!id) return;
    editor.update(() => {
      const node = $createYoutubeNode({ id });
      $insertNodes([node]);
    });
    setURL("");
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        variant="outline-dark"
        aria-label="Embed Youtube Video"
        size="sm"
        onClick={() => setIsOpen(true)}
        style={{ color: "red", padding: "4px" }}
      >
        <Youtube />
      </Button>

      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Embed Youtube Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <FormControl
              value={url}
              onChange={(e) => setURL(e.target.value)}
              placeholder="Add Youtube URL"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={onEmbed}
            disabled={!url}
          >
            Embed
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}