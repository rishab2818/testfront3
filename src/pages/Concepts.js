import React from "react";
import ContentFeed from "../components/general-content/ContentFeed";

const Concepts = ({ src, userId }) => {
  const page = 1;
  return <ContentFeed page={page} src={src} userId={userId} />;
};

export default Concepts;
