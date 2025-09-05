
import api from "./axiosClient";

//Order
export function getOrderStatusCount() {
  return api.get("/dashboard/orders/status-count");
}

export function getOrderTotalRevenue() {
  return api.get("/dashboard/orders/totalRevenue");
}

export function getOrderDailyRevenue() {
  return api.get("/dashboard/revenue/daily");
}

export function getOrderMonthlyRevenue(year: number) {
  return api.get(`/dashboard/revenue/month?year=${year}`);
}


export function getTopProduct() {
  return api.get("/dashboard/product/top-selling");

}

//Appointment
export function getAppointTotalRevenue() {
  return api.get("/dashboardApp/appoint/totalRevenue");
}

export function getAppointStatusCount() {
  return api.get("/dashboardApp/appoint/status-count");
}

export function getAppointDailyRevenue() {
  return api.get("/dashboardApp/revenue/daily");
}

export function getAppointMonthlyRevenue(year : number) {
  return api.get(`/dashboardApp/revenue/month?year=${year}`);
}

export function getTopExam() {
  return api.get("/dashboardApp/exam/top-selling");

}