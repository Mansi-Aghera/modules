import api from "./api2";

/*
  GET ALL COURSES
*/
export const getCourses = async () => {
  const response = await api.get("/course/");
  return response.data.data ?? response.data;
};

/*
  CREATE COURSE
*/
export const createCourse = async (formData) => {
  const response = await api.post("/course/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  UPDATE COURSE
*/
export const updateCourse = async (id, formData) => {
  const response = await api.patch(`/course/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  DELETE COURSE
*/
export const deleteCourse = async (id) => {
  await api.delete(`/course/${id}/`);
};
