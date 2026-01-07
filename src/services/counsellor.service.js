import api from "./api3";

/*
  GET ALL COUNSELLORS
*/
export const getCounsellor = async () => {
  const response = await api.get("/counsellors/");
  return response.data.data;
};

/*
  CREATE COUNSELLOR
*/
export const createCounsellor = async (data) => {
  const payload = {
    full_name: data.full_name,
    mobile: data.mobile,
    email: data.email,

    // ✅ REQUIRED BACKEND FIELDS
    school: 69,
    role: "counsellor",
    language_known: data.language_known || "hindi",
  };

  console.log("FINAL PAYLOAD 👉", payload);

  const response = await api.post("/counsellors/", payload);
  return response.data;
};

/*
  UPDATE COUNSELLOR
*/
export const updateCounsellor = async (id, data) => {
  const payload = {
    full_name: data.full_name,
    mobile: data.mobile,
    email: data.email,
    language_known: data.language_known,
  };

  const response = await api.patch(`/counsellors/${id}/`, payload);
  return response.data;
};

/*
  DELETE COUNSELLOR
*/
export const deleteCounsellor = async (id) => {
  await api.delete(`/counsellors/${id}/`);
};
