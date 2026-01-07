import api from "./api2";

/*
  GET ALL MODULES
*/
export const getModules = async () => {
  const response = await api.get("/modules/");
  return response.data.data ?? response.data;
};

/*
  CREATE MODULE
*/
export const createModule = async (formData) => {
  const response = await api.post("/modules/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  UPDATE MODULE
*/
export const updateModule = async (id, formData) => {
  const response = await api.patch(`/modules/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  DELETE MODULE
*/
export const deleteModule = async (id) => {
  await api.delete(`/modules/${id}/`);
};
