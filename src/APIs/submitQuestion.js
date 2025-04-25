// src/api/submitQuestion.js
import { submitQnA } from "../EndPoint/api";
export const submitQuestion = async ({
  subject,
  title,
  value,
  category,
  privacy,
  isAnonymous,
  user,
  groupId,
  addAnswer,
}) => {
  const userId = user._id;
  const authorName = isAnonymous ? "Anonymous" : user.name;

  const questionData = {
    user: userId,
    title,
    type: parseInt(category) || 4, // 4: general
    subject: [parseInt(subject)],
    tags: [],
    isPrivate: privacy === "private",
    groupId: groupId,
  };

  let requestBody = { question: questionData };

  if (addAnswer && value && value.trim()) {
    const answerData = {
      userId: userId,
      author: authorName,
      content: value,
      tags: [],
      isPrivate: privacy === "private",
    };
    requestBody.answer = answerData;
  }
  console.log(requestBody);
  return await submitQnA(requestBody);
};
