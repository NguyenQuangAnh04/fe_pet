import React, { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { BiSearch } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import api from "../api/axiosClient";
import { toast } from "react-toastify";
import type { AppointmentDTO } from "../types/appointment";
import axios from "axios";

export default function Appoinments() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Vui lòng nhập số điện thoại!");
      return;
    }
    if (!/^[0-9]{10,11}$/.test(phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }
    const phone = phoneNumber.trim();
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/appointment/check-phone",
        {
          params: { phone },
        }
      );
      setAppointments(res.data || []);
      if (!res.data || res.data.length === 0) {
        toast.info("Không tìm thấy lịch hẹn nào!");
      }
    } catch (error) {
      toast.error("Không thể tra cứu lịch hẹn!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?")) {
      return;
    }

    try {
      await api.put(`/appointment/update/${id}`, {
        appointStatus: "CANCELLED",
      });
      toast.success("Hủy lịch hẹn thành công!");
      // Refresh data
      handleSearch();
    } catch (error) {
      toast.error("Không thể hủy lịch hẹn!");
      console.error(error);
    }
  };

  const getStatusText = (status?: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "Chờ xác nhận",
      CONFIRMED: "Đã xác nhận",
      IN_QUEUE: "Đang chờ",
      IN_PROGRESS: "Đang khám",
      COMPLETED: "Hoàn thành",
      CANCELLED: "Đã hủy",
    };
    return status ? statusMap[status] || status : "N/A";
  };

  const getStatusColor = (status?: string) => {
    const colorMap: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-green-100 text-green-800",
      IN_QUEUE: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-purple-100 text-purple-800",
      COMPLETED: "bg-gray-100 text-gray-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return status
      ? colorMap[status] || "bg-gray-100 text-gray-800"
      : "bg-gray-100 text-gray-800";
  };

  const canEdit = (status?: string) => {
    return status === "PENDING" || !status;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Tra cứu lịch hẹn khám
          </h1>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Nhập số điện thoại để tra cứu"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <BiSearch size={20} />
                  {loading ? "Đang tìm..." : "Tra cứu"}
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {appointments.length > 0 && (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Mã lịch hẹn: #{appointment.id}
                      </h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                          appointment.appointStatus
                        )}`}
                      >
                        {getStatusText(appointment.appointStatus)}
                      </span>
                    </div>
                    {/* {canEdit(appointment.appointStatus) && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 transition-colors"
                      >
                        <FaTimes /> Hủy lịch hẹn
                      </button>
                    )} */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Tên chủ thú cưng</p>
                      <p className="font-medium text-gray-800">
                        {appointment.ownerName}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="font-medium text-gray-800">
                        {appointment.phoneNumber}
                      </p>
                    </div> */}
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-800">
                        {appointment.email}
                      </p>
                    </div>
                    {appointment.petName && (
                      <div>
                        <p className="text-sm text-gray-600">Tên thú cưng</p>
                        <p className="font-medium text-gray-800">
                          {appointment.petName}
                        </p>
                      </div>
                    )}
                    {appointment.petType && (
                      <div>
                        <p className="text-sm text-gray-600">Loại thú cưng</p>
                        <p className="font-medium text-gray-800">
                          {appointment.petType === "CAT"
                            ? "Mèo"
                            : appointment.petType === "DOG"
                            ? "Chó"
                            : "Khác"}
                        </p>
                      </div>
                    )}
                    {/* <div>
                      <p className="text-sm text-gray-600">Tuổi</p>
                      <p className="font-medium text-gray-800">
                        {appointment.age} tuổi
                      </p>
                    </div> */}
                    {/* <div>
                      <p className="text-sm text-gray-600">Giới tính</p>
                      <p className="font-medium text-gray-800">
                        {appointment.petGender === "MALE" ? "Đực" : "Cái"}
                      </p>
                    </div> */}
                    <div>
                      <p className="text-sm text-gray-600">Bác sĩ thú y</p>
                      <p className="font-medium text-gray-800">
                        {appointment.veterinarian?.name || "Chưa phân công"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Thời gian bắt đầu</p>
                      <p className="font-medium text-gray-800">
                        {new Date(appointment.start).toLocaleString("vi-VN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Thời gian kết thúc
                      </p>
                      <p className="font-medium text-gray-800">
                        {new Date(appointment.end).toLocaleString("vi-VN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tổng chi phí</p>
                      <p className="font-medium text-green-600">
                        {appointment.totalPrice?.toLocaleString("vi-VN")} đ
                      </p>
                    </div>
                    {appointment.note && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Ghi chú</p>
                        <p className="font-medium text-gray-800">
                          {appointment.note}
                        </p>
                      </div>
                    )}
                    {appointment.examination &&
                      appointment.examination.length > 0 && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-600 mb-2">
                            Dịch vụ khám
                          </p>
                          <div className="space-y-2">
                            {appointment.examination.map((exam) => (
                              <div
                                key={exam.id}
                                className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"
                              >
                                <div>
                                  <p className="font-medium text-blue-900">
                                    {exam.name}
                                  </p>
                                  {exam.description && (
                                    <p className="text-sm text-blue-700 mt-1">
                                      {exam.description}
                                    </p>
                                  )}
                                </div>
                                <p className="font-semibold text-blue-900">
                                  {exam.price?.toLocaleString("vi-VN")} đ
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
