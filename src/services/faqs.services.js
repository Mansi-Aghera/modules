import api from "./api2";

/*
  GET ALL FAQS
  backend response = { status, data: [] }
*/
export const getFaqs = async () => {
  const response = await api.get("/faqs/");
  return response.data.data; // 👈 ARRAY
};

/*
  CREATE FAQ
*/
export const createFaq = async (faqData) => {
  const response = await api.post("/faqs/", faqData);
  return response.data;
};

/*
  UPDATE FAQ
*/
export const updateFaq = async (id, faqData) => {
  const response = await api.patch(`/faqs/${id}/`, faqData);
  return response.data;
};

/*
  DELETE FAQ
*/
export const deleteFaq = async (id) => {
  await api.delete(`/faqs/${id}/`);
};
