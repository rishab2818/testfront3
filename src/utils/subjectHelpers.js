// src/utils/subjectHelpers.js
import { UPSC_SUBJECTS } from "../constants/constants";

export const getSubjectDetails = (id) => {
  return UPSC_SUBJECTS.find((subject) => subject.id === id);
};
