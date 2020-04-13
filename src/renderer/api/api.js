import axios from "axios";

const baseURL = "";
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

// 只返回res_body数据
ajax.interceptors.response.use(
  res => {
    // 判断返回的数据是否正常
    return res;
  },
  err => {
    console.log(err);
  }
);

// //获取所有岗位
// export const getStationDutys = (stationId) => {
//   return ajax.get("/dutys?stationId=" + stationId);
// };

