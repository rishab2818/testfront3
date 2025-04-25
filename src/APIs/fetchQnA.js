import {
  getUnansweredAPI,
  getPopularUnansweredAPI,
  getNewlyAnsweredAPI,
  getTrendingAPI,
  getEngagingAPI,
  getBookmarkedAnswersAPI,
  getUserQnAAPI,
} from "../EndPoint/api";

// 🔥 This function fetches QnA based on subject, sort, page
export const fetchQnA = async (subjectFilter, sort, page, src, userid) => {
  const subject = Number(subjectFilter);
  const type = page;
  try {
    let response;
    if (src === 1) {
      const data = await getBookmarkedAnswersAPI(userid, subject, type);
      console.log(data, "this is data");
      return data || [];
    }
    if (src === 2) {
      const data = await getUserQnAAPI(userid, subject, type);
      return data || [];
    }
    if (sort === "unanswered") {
      response = await getUnansweredAPI({
        subject: Number(subjectFilter),
        type: page,
      });
      return response || [];
    }

    if (sort === "popularUnanswered") {
      response = await getPopularUnansweredAPI({
        subject: Number(subjectFilter),
        type: page,
      });
      return response || [];
    }

    if (sort === "newlyAnswered") {
      response = await getNewlyAnsweredAPI(subject, type);
      return response;
    }

    if (sort === "trending") {
      response = await getTrendingAPI(subject, type);
      return response;
    }

    if (sort === "engaging") {
      const response = await getEngagingAPI(subject, type);
      return response;
    }

    return []; // default fallback
  } catch (error) {
    console.error("fetchQnA error:", error);
    return [];
  }
};
