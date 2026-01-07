import api from "./api2";

export const getCategories = async () => {
  const response = await api.get("/category/");
  return response.data.data ?? response.data;
};

export const createCategory = async (formData) => {
  const response = await api.post("/category/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateCategory = async (id, formData) => {
  const response = await api.patch(`/category/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteCategory = async (id) => {
  await api.delete(`/category/${id}/`);
};
