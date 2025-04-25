import React from "react";
import ContentFeed from "../components/general-content/ContentFeed";

const Notes = ({ src, userId }) => {
  const page = 3;
  return <ContentFeed page={page} src={src} userId={userId} />;
};

export default Notes;
