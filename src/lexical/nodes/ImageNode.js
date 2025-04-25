import {
    DecoratorNode,
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    LexicalNode,
    NodeKey,
  } from "lexical";
  
  export const $createImageNode = ({
    altText,
    height,
    maxWidth = 400,
    src,
    width,
  }) => {
    return new ImageNode({ altText, height, maxWidth, src, width });
  };
  
  const convertImageElement = (domNode) => {
    if (domNode instanceof HTMLImageElement) {
      const { src, alt } = domNode;
      const node = $createImageNode({ src, altText: alt });
      return { node };
    }
    return null;
  };
  
  export class ImageNode extends DecoratorNode {
    constructor({ src, altText, maxWidth, width, height, key }) {
      super(key);
      this.__altText = altText;
      this.__width = width || "inherit";
      this.__height = height || "inherit";
      this.__maxWidth = maxWidth;
      this.__src = src;
    }
  
    static getType() {
      return "image";
    }
  
    static clone(_node) {
      return new ImageNode({
        altText: _node.__altText,
        src: _node.__src,
        height: _node.__height,
        width: _node.__width,
        maxWidth: _node.__maxWidth,
      });
    }
  
    decorate() {
      return (
        <img
          src={this.__src}
          alt={this.__altText}
          style={{
            width: this.__width,
            height: this.__height,
            maxWidth: this.__maxWidth,
          }}
        />
      );
    }
  
    createDOM() {
      const span = document.createElement("span");
      return span;
    }
  
    exportDOM() {
      const image = document.createElement("img");
      image.setAttribute("src", this.__src);
      image.setAttribute("alt", this.__altText);
  
      return { element: image };
    }
  
    static importDOM() {
      return {
        img: (node) => {
          return { conversion: convertImageElement, priority: 0 };
        },
      };
    }
  }
  