/* Initialize Axios for Vue 3 CRUD HTTP Client:
https://www.bezkoder.com/axios-request/ 
*/

//https://mockapi.io/docs

import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8080/api",
  baseURL: "https://6142febec8700e00178d0064.mockapi.io",
  headers: {
    "Content-type": "application/json"
  }
});


