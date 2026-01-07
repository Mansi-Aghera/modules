import api from "./api2";

/*
  GET ALL ARTICLES
*/
export const getArticles = async () => {
  const response = await api.get("/articles/");
  return response.data.data ?? response.data;
};

/*
  CREATE ARTICLE
*/
export const createArticle = async (formData) => {
  const response = await api.post("/articles/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  UPDATE ARTICLE
*/
export const updateArticle = async (id, formData) => {
  const response = await api.patch(`/articles/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  DELETE ARTICLE
*/
export const deleteArticle = async (id) => {
  await api.delete(`/articles/${id}/`);
};
