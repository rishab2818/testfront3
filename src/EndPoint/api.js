const BASE_URL = "https://testback2-szuz.onrender.com/api";

export const submitQnA = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/qna/add-with-answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error("Submit Error:", error);
    return { success: false, error: error.message };
  }
};

// 🔵 API to get unanswered questions
export const getUnansweredAPI = async (payload) => {
  const response = await fetch(`${BASE_URL}/main/unanswered`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await response.json();
};

// 🔵 API to get popular unanswered
export const getPopularUnansweredAPI = async (payload) => {
  const response = await fetch(`${BASE_URL}/main/unanswered-stats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await response.json();
};

// 🔵 API to get newly answered
export const getNewlyAnsweredAPI = async (subject, type) => {
  const url = `${BASE_URL}/main/new-answered-no-ratings?subject=${subject}&type=${type}`;
  const response = await fetch(url);
  return await response.json();
};

// 🔵 API to get trending
export const getTrendingAPI = async (subject, type) => {
  const url = `${BASE_URL}/main/trending?subject=${subject}&type=${type}`;
  const response = await fetch(url);
  return await response.json();
};

export const getEngagingAPI = async (subject, type) => {
  // Construct the URL directly with subject and type as query parameters
  const url = `${BASE_URL}/main/engagingQnA?subject=${subject}&type=${type}`;

  // Fetching the data from the API with the query parameters directly in the URL
  const response = await fetch(url);
  return await response.json();
};

// 🔵 API to get bookmarked answers
export const getBookmarkedAnswersAPI = async (userId, subject, type) => {
  const url = `${BASE_URL}/ans/users/${userId}/bookmarks?subject=${subject}&type=${type}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
// 🔵 API to get bookmarked answers
export const getUserQnAAPI = async (userId, subject, type) => {
  const url = `${BASE_URL}/ans/users/${userId}/questions?subject=${subject}&type=${type}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
