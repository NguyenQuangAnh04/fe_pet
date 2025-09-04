
import api from "./axiosClient";

export function getOrderStatusCount() {
  return api.get("/dashboard/orders/status-count");
}

export function getAppointStatusCount() {
  return api.get("/dashboardApp/appoint/status-count");
}

export function getOrderTotalRevenue() {
  return api.get("/dashboard/orders/totalRevenue");
}

export function getAppointTotalRevenue() {
  return api.get("/dashboardApp/appoint/totalRevenue");
}

