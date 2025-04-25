import axios from "axios";
const test = "http://localhost:5000";
const prod = "https://testback2-szuz.onrender.com";
const API_BASE_URL = prod;

export const verifyTokenAPI = (token) => {
  return axios.post(
    `${API_BASE_URL}/auth/google/token`,
    { token },
    { withCredentials: true }
  );
};

export const createPostWithAnswer = async (payload) => {
  const token = localStorage.getItem("token"); // Get JWT token from local storage

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Attach token in headers
      "Content-Type": "application/json",
    },
  };

  return await axios.post(
    `${API_BASE_URL}/answers/create-with-answer`,
    payload,
    config
  );
};

// ✅ Corrected Answer Submission API Route
export const submitAnswerAPI = async (payload) => {
  const token = localStorage.getItem("token"); // Get JWT token from local storage

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Attach token in headers
      "Content-Type": "application/json",
    },
  };

  return await axios.post(`${API_BASE_URL}/answers/add`, payload, config);
};

export const fetchQuestionsAPI = async (mode) => {
  try {
    const category = mode === "question" ? "upsc" : "news"; // ✅ Dynamic category selection
    const response = await axios.get(
      `${API_BASE_URL}/posts/${category}/top-answers`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch questions"
    );
  }
};
export const fetchFollowerQuestionsAPI = async (mode, userId) => {
  try {
    const category = mode === "question" ? "upsc" : "news"; // ✅ Determine type dynamically
    const response = await axios.get(
      `${API_BASE_URL}/posts/following/${userId}/${category}` // Updated API call with type
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch follower questions"
    );
  }
};

// ✅ Fetch question details (with answers)
export const fetchQuestionDetailsAPI = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}/details`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch question details"
    );
  }
};

export const fetchRelatedQuestionsAPI = async (mode) => {
  try {
    const category = mode === "question" ? "upsc" : "news";
    const response = await axios.get(
      `${API_BASE_URL}/posts/${category}/top-answers`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch related questions"
    );
  }
};

export const rateAnswerAPI = async (answerId, rating) => {
  const token = localStorage.getItem("token"); // ✅ Get token from local storage

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Attach token in headers
      "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ Include credentials for session handling
  };

  const response = await axios.post(
    `${API_BASE_URL}/answers/${answerId}/rate`,
    { rating },
    config
  );

  return response.data;
};

export const likeAnswerAPI = async (answerId, _id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const response = await axios.post(
    `${API_BASE_URL}/answers/${answerId}/like`,
    { _id }, // ✅ Include googleId in the request body
    config
  );

  return response.data;
};

export const fetchAuthorAnswersAPI = async (userId, includePrivate) => {
  const response = await axios.get(
    `${API_BASE_URL}/answers/answers?userId=${userId}&includePrivate=${includePrivate}`
  );
  return response.data;
};

export const fetchAuthorProfileAPI = async (googleId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/profile/${googleId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch profile data"
    );
  }
};

export const reviewAnswerAPI = async (question, answer) => {
  const token = localStorage.getItem("token"); // ✅ Get token from local storage

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Attach token in headers
      "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ Include credentials for session handling
  };

  const response = await axios.post(
    `${API_BASE_URL}/api/ai/review-answer`, // ✅ Correct API endpoint
    { question, answer }, // ✅ Matches backend body structure
    config
  );

  return response.data.reviewedAnswer;
};

export const fetchProfileAPI = async (googleId) => {
  return axios.get(`${API_BASE_URL}/profile/user/${googleId}`);
};

export const updateProfileAPI = async (googleId, profileData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  return axios.put(
    `${API_BASE_URL}/profile/user/update/${googleId}`,
    profileData,
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
};

export const fetchProfilebyId = async (userId) => {
  return axios.get(`${API_BASE_URL}/profile/userId/${userId}`);
};

export const toggleFollowAPI = async (authorId, userId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  return axios.post(
    `${API_BASE_URL}/profile/${authorId}/toggleFollow`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
};

export const deleteAnswerAPI = async (answerId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    const response = await axios.delete(`${API_BASE_URL}/answers/${answerId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting answer");
  }
};

export const fetchGroupQuestionDetailsAPI = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/posts/${id}/groupdetails`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch question details"
    );
  }
};

export const toggleBookmarkAPI = async (userId, answerId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  return axios.post(
    `${API_BASE_URL}/bookmarks/toggle`, // Adjust based on your backend route
    { userId, answerId },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
};

export const getBookmarksAPI = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  return axios.get(`${API_BASE_URL}/bookmarks/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
};
export const submitRatingAPI = async (answerId, ratings) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/ratings/${answerId}`,
      ratings,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to submit rating.");
  }
};

export const addPrelimsQuestion = async (newQuestion) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/prelims/create-question`,
      newQuestion
    );
    if (response.status === 201) {
      return { success: true, message: "Question submitted successfully!" };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error submitting question. Please try again.",
    };
  }
};

export const fetchPrelimsQuestions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prelims/getall-question`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      success: false,
      message: "Error fetching questions. Please try again.",
    };
  }
};
export const voteQuestion = async (userId, questionId, option) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/prelims/vote-question`, {
      userId,
      questionId,
      option,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error voting:", error);
    return {
      success: false,
      message: "Error voting. Please try again.",
    };
  }
};

export const fetchTopUsersOfMonth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/points/top-users`);
    const data = await response.json();
    return data.topUsers || [];
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};

export const fetchUserPoints = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/points/user/${userId}`);
    const data = await response.json();

    return data.points || 0;
  } catch (error) {
    console.error("Error fetching user points:", error);
    return 0;
  }
};
export const fetchPublicUpscPosts = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/posts/getPublicUpscPosts`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching public UPSC posts:", error);
    return [];
  }
};

// Fetch UPSC Questions with the Newest Answer
export const fetchUpscQuestionsWithNewestAnswer = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/getQuesWNewestAns`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching UPSC questions with newest answer:", error);
    return [];
  }
};

// Fetch Trending Q&A
export const fetchTrendingQnA = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/getTrendingQnA`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trending Q&A:", error);
    return [];
  }
};

export const likePrelimsQuestion = async (userId, questionId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/prelims/like-question`, {
      userId,
      questionId,
    });
    return response.data; // Use backend's response directly
  } catch (error) {
    console.error("Error liking question:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Unknown error occurred",
    };
  }
};

export const addPrelimsAnswer = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/prelims/addAnswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit answer");
  }

  return response.json();
};
export const getPrelimsDetails = async (questionId) => {
  const response = await fetch(
    `${API_BASE_URL}/prelims/prelimsqna/${questionId}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch prelims details");
  }

  return response.json();
};
export const fetchPrelimsData = async (userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/prelims/getuser-qna/${userId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching prelims data:", err);
    return null; // Return null or an empty array to handle errors gracefully
  }
};
