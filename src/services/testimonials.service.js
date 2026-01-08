// import api from "./api2";

// /*
//   GET ALL FAQS
//   backend response = { status, data: [] }
// */
// export const getTest = async () => {
//   const response = await api.get("/testimonials/");
//   return response.data.data; // 👈 ARRAY
// };

// /*
//   CREATE FAQ
// */
// export const createTest = async (testData) => {
//   const response = await api.post("/testimonials/", testData);
//   return response.data;
// };

// /*
//   UPDATE FAQ
// */
// export const updateTest = async (id, testData) => {
//   const response = await api.patch(`/testimonials/${id}/`, testData);
//   return response.data;
// };

// /*
//   DELETE FAQ
// */
// export const deleteTest = async (id) => {
//   await api.delete(`/testimonials/${id}/`);
// };


import api from "./api2";

/*
  GET ALL TESTIMONIALS
*/
export const getTest = async () => {
  const response = await api.get("/testimonials/");
  return response.data.data ?? response.data; // ✅ THIS LINE FIXES IT
};



/*
  CREATE TESTIMONIAL
*/
export const createTest = async (testData) => {
  const fd = new FormData();

  fd.append("name", testData.name);
  fd.append("review", testData.review);
  fd.append("rating", testData.rating);
  fd.append("category_id", testData.category); // 🔥 FIX HERE
  fd.append("image", testData.image);          // 🔥 image ALWAYS send

  const response = await api.post("/testimonials/", fd);
  return response.data;
};

/*
  UPDATE TESTIMONIAL
*/
export const updateTest = async (id, testData) => {
  const fd = new FormData();

  fd.append("name", testData.name);
  fd.append("review", testData.review);
  fd.append("rating", testData.rating);
  fd.append("category_id", testData.category); // 🔥 FIX HERE
  if (testData.image) fd.append("image", testData.image);

  const response = await api.patch(`/testimonials/${id}/`, fd);
  return response.data;
};

/*
  DELETE TESTIMONIAL
*/
export const deleteTest = async (id) => {
  await api.delete(`/testimonials/${id}/`);
};
