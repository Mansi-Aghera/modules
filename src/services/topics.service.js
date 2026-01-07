import api from "./api2";

/*
  GET ALL TOPICS (GROUPED BY MODULE)
*/
export const getTopics = async () => {
  const response = await api.get("/topics/");
  return response.data.data ?? response.data;
};

/*
  CREATE TOPIC
*/
export const createTopic = async (formData) => {
  const response = await api.post("/topics/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  UPDATE TOPIC
*/
export const updateTopic = async (id, formData) => {
  const response = await api.patch(`/topics/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  DELETE TOPIC
*/
export const deleteTopic = async (id) => {
  await api.delete(`/topics/${id}/`);
};
