import { Button, Form } from "react-bootstrap";
import React, { useEffect } from "react";
import { CodeSquare } from "react-bootstrap-icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  registerCodeHighlighting,
  $createCodeNode,
  getCodeLanguages,
  $isCodeNode,
} from "@lexical/code";
import { $getNodeByKey, $getSelection, $isRangeSelection } from "lexical";
import { $wrapNodes } from "@lexical/selection";

const languages = getCodeLanguages();

export default function CodeBlockPlugin({
  codeLanguage,
  blockType,
  selectedElementKey,
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    registerCodeHighlighting(editor);
  }, [editor]);

  const onAddCodeBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createCodeNode());
      }
    });
  };

  const onLanguageChange = (e) => {
    const language = e.target.value;
    editor.update(() => {
      if (!selectedElementKey) return;
      const node = $getNodeByKey(selectedElementKey);
      if ($isCodeNode(node)) {
        node.setLanguage(language);
      }
    });
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <Button variant="light" size="sm" onClick={onAddCodeBlock}>
        <CodeSquare />
      </Button>
      {blockType && (
        <Form.Select size="sm" value={codeLanguage} onChange={onLanguageChange}>
          {languages.map((language) => (
            <option key={language} value={language}>{language}</option>
          ))}
        </Form.Select>
      )}
    </div>
  );
}