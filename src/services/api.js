// import axios from "axios";
 
// const api = axios.create({
//   baseURL: "http://adminapi.hayatplus.online", // ← replace
// });
 
// export default api;



import axios from "axios";

/*
  This file creates ONE axios object
  which we will use everywhere in the app
*/

const api = axios.create({
  baseURL: "http://adminapi.hayatplus.online/", // backend URL
});

export default api;
