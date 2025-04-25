import React from "react";
import {
  ArrowClockwise,
  ArrowCounterclockwise,
  Code,
  Highlighter,
  Justify,
  JustifyLeft,
  JustifyRight,
  Subscript,
  Superscript,
  TextCenter,
  TypeBold,
  TypeItalic,
  TypeStrikethrough,
  TypeUnderline,
} from "react-bootstrap-icons";

// Rich Text Actions Enum (Converted to Object for JS)
export const RichTextAction = {
  Bold: "bold",
  Italics: "italics",
  Underline: "underline",
  Strikethrough: "strikethrough",
  Superscript: "superscript",
  Subscript: "subscript",
  Highlight: "highlight",
  Code: "code",
  LeftAlign: "leftAlign",
  CenterAlign: "centerAlign",
  RightAlign: "rightAlign",
  JustifyAlign: "justifyAlign",
  Divider: "divider",
  Undo: "undo",
  Redo: "redo",
};

// Rich Text Options Array
export const RICH_TEXT_OPTIONS = [
  { id: RichTextAction.Bold, icon: <TypeBold />, label: "Bold" },
  { id: RichTextAction.Italics, icon: <TypeItalic />, label: "Italics" },
  { id: RichTextAction.Underline, icon: <TypeUnderline />, label: "Underline" },
  { id: RichTextAction.Divider, type: "divider" }, // Divider
  {
    id: RichTextAction.Highlight,
    icon: <Highlighter />,
    label: "Highlight",
  },
  {
    id: RichTextAction.Strikethrough,
    icon: <TypeStrikethrough />,
    label: "Strikethrough",
  },
  {
    id: RichTextAction.Superscript,
    icon: <Superscript />,
    label: "Superscript",
  },
  {
    id: RichTextAction.Subscript,
    icon: <Subscript />,
    label: "Subscript",
  },
  {
    id: RichTextAction.Code,
    icon: <Code />,
    label: "Code",
  },
  { id: RichTextAction.Divider, type: "divider" }, // Divider
  {
    id: RichTextAction.LeftAlign,
    icon: <JustifyLeft />,
    label: "Align Left",
  },
  {
    id: RichTextAction.CenterAlign,
    icon: <TextCenter />,
    label: "Align Center",
  },
  {
    id: RichTextAction.RightAlign,
    icon: <JustifyRight />,
    label: "Align Right",
  },
  {
    id: RichTextAction.JustifyAlign,
    icon: <Justify />,
    label: "Align Justify",
  },
  { id: RichTextAction.Divider, type: "divider" }, // Divider
  {
    id: RichTextAction.Undo,
    icon: <ArrowCounterclockwise />,
    label: "Undo",
  },
  {
    id: RichTextAction.Redo,
    icon: <ArrowClockwise />,
    label: "Redo",
  },
];

// Constants
export const LOW_PRIORITY = 1;
export const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
