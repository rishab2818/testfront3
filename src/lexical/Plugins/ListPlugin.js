import React from "react";
import { ListOl, ListUl } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { getSelectedBtnProps } from "../utils";

export default function ListPlugin({ blockType }) {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <Button
        variant="outline-dark"
        aria-label="Add Ordered list"
        size="sm"
        onClick={() => {
          if (blockType === "ol") {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }
        }}
        {...getSelectedBtnProps(blockType === "ol")}
      >
        <ListOl />
      </Button>
      <Button
        variant="outline-dark"
        aria-label="Add Unordered List"
         size="sm"
        onClick={() => {
          if (blockType === "ul") {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }
        }}
        {...getSelectedBtnProps(blockType === "ul")}
      >
        <ListUl />
      </Button>
    </>
  );
}
