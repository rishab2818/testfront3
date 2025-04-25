import React, { useState } from "react";
import { Table } from "react-bootstrap-icons";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import Modal from "../Components/Modal";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTableNodeWithDimensions } from "@lexical/table";
import { $insertNodeToNearestRoot } from "@lexical/utils";

export default function TablePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();
  const [editor] = useLexicalComposerContext();

  const onAddTable = () => {
    if (!rows || !columns) return;
    editor.update(() => {
      const tableNode = $createTableNodeWithDimensions(rows, columns, true);
      $insertNodeToNearestRoot(tableNode);
    });
    setRows(undefined);
    setColumns(undefined);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Modal
          title="Add Table"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <Button
              variant="secondary"
              onClick={onAddTable}
              disabled={!rows || !columns}
            >
              Add
            </Button>
          }
        >
          <InputGroup className="mb-3">
            <InputGroup.Text>Rows</InputGroup.Text>
            <FormControl
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              placeholder="Rows"
              autoFocus
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Columns</InputGroup.Text>
            <FormControl
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              placeholder="Columns"
            />
          </InputGroup>
        </Modal>
      )}
      <Button
        variant="outline-dark"
             size="sm"
        aria-label="Add Table"
        onClick={() => setIsOpen(true)}
      >
        <Table />
      </Button>
    </>
  );
}
