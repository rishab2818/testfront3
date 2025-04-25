import React from "react";
import ContentFeed from "../components/general-content/ContentFeed";

const Mains = ({ src, userId }) => {
  const page = 2;
  return <ContentFeed page={page} src={src} userId={userId} />;
};

export default Mains;
