import {
    DecoratorNode,
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    LexicalNode,
    NodeKey,
  } from "lexical";
  
  export const $createYoutubeNode = ({ id }) => {
    return new YoutubeNode({ id });
  };
  
  const ID_ATTR = "data-lexical-youtube";
  
  const convertYoutubeElement = (domNode) => {
    const id = domNode?.getAttribute(ID_ATTR);
    if (!id) return null;
    const node = $createYoutubeNode({ id });
    return { node };
  };
  
  const HEIGHT = "315px";
  const WIDTH = "560px";
  const getYoutubeLink = (id) => `https://www.youtube-nocookie.com/embed/${id}`;
  
  export class YoutubeNode extends DecoratorNode {
    constructor({ id, key }) {
      super(key);
      this.__id = id;
    }
  
    static getType() {
      return "youtube";
    }
  
    static clone(_node) {
      return new YoutubeNode({
        id: _node.__id,
      });
    }
  
    decorate() {
      return (
        <iframe height={HEIGHT} width={WIDTH} src={getYoutubeLink(this.__id)} />
      );
    }
  
    createDOM() {
      const div = document.createElement("div");
      return div;
    }
  
    exportDOM() {
      const iframe = document.createElement("iframe");
      iframe.setAttribute(ID_ATTR, this.__id);
      iframe.setAttribute("height", HEIGHT);
      iframe.setAttribute("width", WIDTH);
      iframe.setAttribute("src", getYoutubeLink(this.__id));
  
      return { element: iframe };
    }
  
    static importDOM() {
      return {
        iframe: (node) => {
          return { conversion: convertYoutubeElement, priority: 0 };
        },
      };
    }
  }