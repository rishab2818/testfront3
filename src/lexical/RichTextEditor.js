// RichTextEditor.js
import { Container } from "react-bootstrap";
import React, { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { css } from "@emotion/css";
import { ToolbarPlugin } from "./Plugins";
import CustomOnChangePlugin from "./Plugins/CustomOnChangePlugin";
import { theme } from "./theme";
import { ListNode, ListItemNode } from "@lexical/list";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ImageNode } from "./nodes/ImageNode";
import { YoutubeNode } from "./nodes/YoutubeNode";

const RichTextEditor = React.memo(function RichTextEditor({
  value,
  onChange,
  placeholder,
  name,
}) {
  const initialConfig = useMemo(
    () => ({
      namespace: name,
      theme,
      onError: () => {},
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        CodeNode,
        CodeHighlightNode,
        ImageNode,
        YoutubeNode,
      ],
    }),
    [name]
  );

  const editorWrapperStyle = {
    maxWidth: "100%",
    overflowX: "hidden",
    padding: "0 5px",
  };

  return (
    <div style={editorWrapperStyle}>
      <LexicalComposer initialConfig={initialConfig}>
        <div style={{ position: "relative", zIndex: 10 }}>
          <ToolbarPlugin />
        </div>
        <div style={{ position: "relative", minHeight: 200 }}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={css({
                  minHeight: "200px",
                  fontSize: "16px", // Slightly larger for better mobile readability
                  padding: "12px",
                  marginTop: "20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #dee2e6",
                  borderRadius: "12px", // More iPhone-like roundness
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)", // Softer and lifted shadow
                  overflow: "auto",
                  outline: "none",
                  resize: "vertical",
                  width: "100%",
                  boxSizing: "border-box",
                  lineHeight: "1.6",
                  WebkitOverflowScrolling: "touch", // for smooth scrolling on iOS
                })}
              />
            }
            placeholder={
              <div
                className={css({
                  position: "absolute",
                  top: 16,
                  left: 18,
                  color: "#adb5bd", // iOS-style placeholder
                  pointerEvents: "none",
                  fontSize: "15px",
                  fontStyle: "italic",
                })}
              >
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <AutoFocusPlugin />
        <HistoryPlugin />
        <ListPlugin />
        <CustomOnChangePlugin value={value} onChange={onChange} />
      </LexicalComposer>
    </div>
  );
});

export default RichTextEditor;
