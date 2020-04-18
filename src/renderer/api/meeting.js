import axios from "axios";

const baseURL = "https://meeting.gugud.com/api/checkin";
//创建一个axios实例
const ajax = axios.create({
  baseURL: baseURL,
  timeout: 30000
});

ajax.defaults.headers["Content-Type"] = "application/json";

// 添加一个请求拦截器
// 添加请求拦截器
ajax.interceptors.request.use(function(config) {
  return config;
});

// 添加响应拦截器
ajax.interceptors.response.use(
  function (response) {
      return response;
  }, 
  function (error) {
      // util.error(error.response.data);
      return Promise.reject(error);
  }
);

//获取所有岗位
export const login = (loginForm) => {
  return ajax.post("/meeting/api/login", loginForm);
};

//签到
export const checkin = (checkinForm) => {
  return ajax.post("/meeting/api/idcards", checkinForm);
};

