import React, { useState, useEffect, useRef } from "react";
import { BsCheckCircle, BsClock, BsPersonCircle } from "react-icons/bs";
import useAddAppointment from "../../hook/appointment/useAddAppointment";
import { useQueryExamination } from "../../hook/examination/useExamination";
import { type AppointmentDTO } from "../../types/appointment";
import { formatPrice } from "../../utils/format";
import { findAllVetFreeTime } from "../../api/veterinarianService";
import type { VeterinarianDTO } from "../../types/veterinarian";

// Các khung giờ làm việc
const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export default function AppointmentForm() {
  const { mutateAsync: mutateAddAppointment } = useAddAppointment();
  const { data } = useQueryExamination();

  const [isBooked, setIsBooked] = useState(false);

  const [formData, setFormData] = useState<AppointmentDTO>({
    id: 0,
    ownerName: "",
    phoneNumber: "",
    email: "",
    petName: "",
    start: "",
    end: "",
    petType: "",
    age: 0,
    petGender: "",
    appointmentDay: "",
    appointmentTime: "",
    totalPrice: 0,
    examination: [],
  });

  const [selectedVet, setSelectedVet] = useState<number>();
  const [selectedVetName, setSelectedVetName] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  // State cho time slots
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [slotVets, setSlotVets] = useState<VeterinarianDTO[]>([]);
  const [loadingSlot, setLoadingSlot] = useState<string | null>(null);
  const [timeSlotCache, setTimeSlotCache] = useState<
    Record<string, VeterinarianDTO[]>
  >({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChangeInput = (
    field: keyof AppointmentDTO,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fetch bác sĩ rảnh khi click vào khung giờ
  const handleSlotClick = async (slot: string) => {
    if (!formData.appointmentDay) {
      alert("Vui lòng chọn ngày trước");
      return;
    }

    // Nếu đang mở slot này thì đóng
    if (activeSlot === slot) {
      setActiveSlot(null);
      return;
    }

    // Kiểm tra cache
    const cacheKey = `${formData.appointmentDay}_${slot}`;
    if (timeSlotCache[cacheKey]) {
      setSlotVets(timeSlotCache[cacheKey]);
      setActiveSlot(slot);
      return;
    }

    // Fetch API
    setLoadingSlot(slot);
    try {
      const dateTime = `${formData.appointmentDay}T${slot}:00`;
      const res = await findAllVetFreeTime(dateTime);
      const vets = res.data || [];
      setSlotVets(vets);
      setTimeSlotCache((prev) => ({ ...prev, [cacheKey]: vets }));
      setActiveSlot(slot);
    } catch (error) {
      console.error("Error fetching vets:", error);
      setSlotVets([]);
    } finally {
      setLoadingSlot(null);
    }
  };

  // Chọn bác sĩ từ dropdown
  const handleSelectVet = (vet: VeterinarianDTO, slot: string) => {
    setSelectedVet(vet.id ?? undefined);
    setSelectedVetName(vet.name);
    handleChangeInput("appointmentTime", slot);
    setActiveSlot(null);
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveSlot(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset cache khi đổi ngày
  useEffect(() => {
    setTimeSlotCache({});
    setActiveSlot(null);
    setSelectedVet(undefined);
    setSelectedVetName("");
    handleChangeInput("appointmentTime", "");
  }, [formData.appointmentDay]);

  // Lọc các khung giờ hợp lệ
  const getValidTimeSlots = () => {
    if (!formData.appointmentDay) return TIME_SLOTS;

    const now = new Date();
    const selectedDate = new Date(formData.appointmentDay);
    const isToday = selectedDate.toDateString() === now.toDateString();

    if (!isToday) return TIME_SLOTS;

    return TIME_SLOTS.filter((slot) => {
      const [hours, minutes] = slot.split(":").map(Number);
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hours, minutes, 0, 0);
      return slotTime > now;
    });
  };
  const toggleService = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!selectedServices || selectedServices.length === 0) {
      return alert("Vui lòng chọn dịch vụ.");
    }
    if (!formData.appointmentDay || !formData.appointmentTime) {
      return alert("Vui lòng chọn ngày và giờ.");
    }
    if (!selectedVet) {
      return alert("Vui lòng chọn bác sĩ.");
    }
    if (!formData.petGender || !formData.petType) {
      return alert("Vui lòng chọn giới tính và loại thú cưng.");
    }
    // Validate ngày không được trong quá khứ
    const selectedDate = new Date(formData.appointmentDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset giờ để so sánh chỉ ngày

    if (selectedDate < today) {
      return alert(
        "Không thể đặt lịch cho ngày trong quá khứ. Vui lòng chọn ngày hôm nay hoặc sau này."
      );
    }

    if (!formData.ownerName || !formData.phoneNumber) {
      return alert("Vui lòng nhập tên và số điện thoại.");
    }

    // Validate số điện thoại (10 số, bắt đầu bằng 0)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      return alert(
        "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam (10 số, bắt đầu bằng 0)."
      );
    }

    // Validate email nếu có nhập
    if (formData.email && formData.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return alert(
          "Email không hợp lệ. Vui lòng nhập đúng định dạng email (ví dụ: example@gmail.com)."
        );
      }
    }
    const appointmentTimeForBackend =
      formData.appointmentTime.length === 5
        ? formData.appointmentTime + ":00"
        : formData.appointmentTime;

    // Tạo start từ ngày + giờ đã chọn (format: 2025-12-01T08:00:00)
    const start = `${formData.appointmentDay}T${appointmentTimeForBackend}`;

    const selectedExams = selectedServices.map((id) => ({
      id,
    })) as unknown as any[];
    const newFormData = {
      ...formData,
      start,
      appointmentTime: appointmentTimeForBackend,
      examination: selectedExams,
    } as unknown as AppointmentDTO;
    await mutateAddAppointment({
      vetId: selectedVet || 0,
      newAppoint: newFormData,
    });
    console.log(appointmentTimeForBackend);
    setIsBooked(false); // reset form nếu muốn
    setFormData({
      id: 0,
      ownerName: "",
      phoneNumber: "",
      email: "",
      petName: "",
      petType: "",
      age: 0,
      petGender: "",
      appointmentDay: "",
      start: "",
      end: "",
      appointmentTime: "",
      totalPrice: 0,
      examination: [],
    });
    setSelectedServices([]);
    setSelectedVet(undefined);
    console.log(start);
    setSelectedVetName("");
  };

  return (
    <section className="py-12 " id="service">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-6">
          Đặt lịch thăm khám!
        </h2>

        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex items-center gap-3 font-bold">
            <p
              className={`w-12 h-12 rounded-full ${
                !isBooked ? "bg-yellow-600 text-black" : "bg-black text-white"
              } flex items-center justify-center`}
            >
              1
            </p>
            <p>Thú cưng</p>
          </div>
          <div className="flex items-center gap-3 font-bold">
            <p
              className={`w-12 h-12 rounded-full ${
                isBooked
                  ? "bg-yellow-600 text-black"
                  : "border border-black text-black"
              } flex items-center justify-center`}
            >
              2
            </p>
            <p>Bạn</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow"
        >
          {!isBooked ? (
            <div className="space-y-6">
              {/* Chọn Pet */}
              <div className="space-y-2">
                <label className="font-semibold">Pet *</label>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="pet"
                      checked={formData.petType === "DOG"}
                      onChange={() => handleChangeInput("petType", "DOG")}
                    />
                    <span>Chó</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="pet"
                      checked={formData.petType === "CAT"}
                      onChange={() => handleChangeInput("petType", "CAT")}
                    />
                    <span>Mèo</span>
                  </label>
                </div>
              </div>

              {/* Chọn dịch vụ */}
              <div className="space-y-2">
                <label className="font-semibold">Quan tâm đến</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {data?.content
                    .filter((s) => s.active)
                    .map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id ?? 0)}
                        className={`flex items-center gap-3 p-3 rounded-lg border border-gray-400 transition ${
                          selectedServices.includes(s.id ?? 0)
                            ? "bg-yellow-50 border-yellow-300"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <input
                          readOnly
                          type="checkbox"
                          className="w-4 h-4"
                          checked={selectedServices.includes(s.id ?? 0)}
                        />
                        <div className="text-sm text-gray-800">
                          {s.name} ({formatPrice(s.price)})
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Chọn ngày */}
              <div className="space-y-2">
                <label className="font-semibold">Chọn ngày khám *</label>
                <input
                  className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.appointmentDay}
                  onChange={(e) =>
                    handleChangeInput("appointmentDay", e.target.value)
                  }
                />
              </div>

              {/* Chọn khung giờ - Grid với dropdown bác sĩ */}
              {formData.appointmentDay && (
                <div className="space-y-3">
                  <label className="font-semibold flex items-center gap-2">
                    <BsClock className="text-yellow-600" />
                    Chọn giờ khám *{" "}
                    <span className="text-sm font-normal text-gray-500">
                      (Click để xem bác sĩ rảnh)
                    </span>
                  </label>
                  <div
                    className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2"
                    ref={dropdownRef}
                  >
                    {getValidTimeSlots().map((slot) => {
                      const isSelected = formData.appointmentTime === slot;
                      const isActive = activeSlot === slot;
                      const isLoading = loadingSlot === slot;

                      return (
                        <div key={slot} className="relative">
                          <button
                            type="button"
                            onClick={() => handleSlotClick(slot)}
                            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium
                              ${
                                isSelected
                                  ? "bg-yellow-500 border-yellow-600 text-white shadow-lg"
                                  : isActive
                                  ? "bg-yellow-100 border-yellow-400"
                                  : "bg-white border-gray-200 hover:border-yellow-400 hover:bg-yellow-50"
                              }`}
                          >
                            {isLoading ? (
                              <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            ) : (
                              slot
                            )}
                          </button>

                          {/* Dropdown danh sách bác sĩ */}
                          {isActive && !isLoading && (
                            <div className="absolute z-50 top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 animate-fadeIn">
                              {slotVets.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                                  Không có bác sĩ rảnh
                                </div>
                              ) : (
                                <>
                                  <div className="px-3 py-2 text-xs text-gray-500 border-b">
                                    Bác sĩ rảnh lúc {slot}
                                  </div>
                                  {slotVets.map((vet) => (
                                    <button
                                      key={vet.id}
                                      type="button"
                                      onClick={() => handleSelectVet(vet, slot)}
                                      className="w-full px-3 py-2 text-left text-sm hover:bg-yellow-50 flex items-center gap-2 transition"
                                    >
                                      <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-medium text-xs">
                                        {vet.name?.charAt(0).toUpperCase()}
                                      </div>
                                      <span>{vet.name}</span>
                                    </button>
                                  ))}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Hiển thị lựa chọn đã chọn */}
                  {formData.appointmentTime && selectedVetName && (
                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex items-center gap-3">
                      <BsPersonCircle className="text-yellow-600 text-xl" />
                      <div>
                        <span className="font-medium">Đã chọn:</span>{" "}
                        <span className="text-yellow-700">
                          {formData.appointmentTime}
                        </span>{" "}
                        với{" "}
                        <span className="text-yellow-700 font-medium">
                          {selectedVetName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVet(undefined);
                          setSelectedVetName("");
                          handleChangeInput("appointmentTime", "");
                        }}
                        className="ml-auto text-gray-500 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Thông tin thú cưng */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium">Tên thú cưng</label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg"
                    value={formData.petName}
                    onChange={(e) =>
                      handleChangeInput("petName", e.target.value)
                    }
                    placeholder="Ví dụ: Mèo Mimi"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tuổi</label>
                  <input
                    type="number"
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg"
                    value={formData.age}
                    onChange={(e) =>
                      handleChangeInput("age", Number(e.target.value))
                    }
                    placeholder="Ví dụ: 2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Giới tính</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg focus:ring-0 focus:outline-none"
                    value={formData.petGender}
                    onChange={(e) =>
                      handleChangeInput("petGender", e.target.value)
                    }
                  >
                    <option value="">Chọn giới tính</option>
                    <option value={"MALE"}>Đực</option>
                    <option value={"FEMALE"}>Cái</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            // Step 2: Thông tin người đặt
            <div className="flex flex-col gap-4">
              <label htmlFor="">Tên</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg"
                value={formData.ownerName}
                onChange={(e) => handleChangeInput("ownerName", e.target.value)}
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg"
                    value={formData.email}
                    onChange={(e) => handleChangeInput("email", e.target.value)}
                    placeholder="example@gmail.com"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="">Số điện thoại *</label>
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleChangeInput("phoneNumber", e.target.value)
                    }
                    placeholder="0987654321"
                    required
                  />
                </div>
              </div>
              <label htmlFor="">Ghi chú</label>
              <textarea
                rows={4}
                className="w-full focus:ring-0 focus:outline-none mt-1 px-3 py-2 border border-gray-400 rounded-lg"
                value={formData.note || ""}
                onChange={(e) =>
                  handleChangeInput(
                    "note" as keyof AppointmentDTO,
                    e.target.value
                  )
                }
              />
            </div>
          )}

          <div className="text-center">
            {!isBooked ? (
              <button
                type="button"
                onClick={() => {
                  // validate step 1 trước khi chuyển
                  if (!formData.petType || !formData.petName) {
                    return alert("Vui lòng điền đầy đủ thông tin thú cưng.");
                  }
                  if (!selectedServices || selectedServices.length === 0) {
                    return alert("Vui lòng chọn dịch vụ.");
                  }
                  if (!formData.appointmentDay || !formData.appointmentTime) {
                    return alert("Vui lòng chọn ngày và giờ khám.");
                  }
                  if (!selectedVet) {
                    return alert("Vui lòng chọn bác sĩ.");
                  }
                  setIsBooked(true);
                }}
                className="inline-flex items-center gap-3 bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600"
              >
                <BsCheckCircle /> Bắt đầu đặt lịch
              </button>
            ) : (
              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={() => setIsBooked(false)}
                  className="bg-yellow-500 text-black text-xl px-8 py-3 rounded-4xl font-semibold hover:bg-yellow-600"
                >
                  Trước
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-black text-xl px-8 py-3 rounded-4xl font-semibold hover:bg-yellow-600"
                >
                  Gửi
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
