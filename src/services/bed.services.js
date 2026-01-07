// // src/services/bed.services.js
// import api from "./api.js";

// const BED_BASE = "/bed";

// export const getBeds = async () => {
//   let allResults = [];
//   let page = 1;
//   let hasNext = true;

//   while (hasNext) {
//     const response = await api.get(`/bed/?page=${page}`);
//     const data = response.data;

//     if (Array.isArray(data.data)) {
//       allResults = [...allResults, ...data.data];
//     }

//     hasNext = data.next !== null; // Django pagination
//     page++;
//   }
//   return allResults;
// };

// export const createBed = async (bedData) => {
//   const response = await api.post(`${BED_BASE}/`, bedData);
//   return response.data;
// };

// export const updateBed = async (id, bedData) => {
//   const response = await api.patch(`${BED_BASE}/${id}/`, bedData);
//   return response.data;
// };

// export const deleteBed = async (id) => {
//   await api.delete(`${BED_BASE}/${id}/`);
//   return true;
// };



import api from "./api";

/*
  GET ALL BEDS (with pagination support)
*/
export const getBeds = async () => {
  let allBeds = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await api.get(`/bed/?page=${page}`);
    const data = response.data;

    if (Array.isArray(data.data)) {
      allBeds = allBeds.concat(data.data);
    }

    hasNextPage = data.next !== null;
    page++;
  }

  return allBeds;
};

/*
  CREATE NEW BED
*/
export const createBed = async (bedData) => {
  const response = await api.post("/bed/", bedData);
  return response.data;
};

/*
  UPDATE BED
*/
export const updateBed = async (id, bedData) => {
  const response = await api.patch(`/bed/${id}/`, bedData);
  return response.data;
};

/*
  DELETE BED
*/
export const deleteBed = async (id) => {
  await api.delete(`/bed/${id}/`);
};
