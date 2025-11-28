import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import useAddAppointment from "../../hook/appointment/useAddAppointment";
import { useQueryExamination } from "../../hook/examination/useExamination";
import { type AppointmentDTO } from "../../types/appointment";
import { formatPrice } from "../../utils/format";
import { useQueryFreeTime } from "../../hook/veterinarian/useQueryFreeTime";

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
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const handleChangeInput = (
    field: keyof AppointmentDTO,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const getDateTime = () => {
    if (!formData.appointmentDay || !formData.appointmentTime) return null;

    return `${formData.appointmentDay}T${formData.appointmentTime}:00`; // "2025-11-26T16:30:00"
  };

  const { data: vetFreeTimeData } = useQueryFreeTime(getDateTime() || "");
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
    const selectedExams = selectedServices.map((id) => ({
      id,
    })) as unknown as any[];
    const newFormData = {
      ...formData,
      appointmentTime: appointmentTimeForBackend,
      examination: selectedExams,
    } as unknown as AppointmentDTO;
    await mutateAddAppointment({
      vetId: selectedVet || 0,
      newAppoint: newFormData,
    });
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

              {/* Ngày, giờ, bác sĩ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium">Ngày</label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.appointmentDay}
                    onChange={(e) =>
                      handleChangeInput("appointmentDay", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Giờ</label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={(e) =>
                      handleChangeInput("appointmentTime", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Bác sĩ</label>
                  <select
                    value={selectedVet || ""}
                    onChange={(e) => setSelectedVet(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg focus:ring-0 focus:outline-none"
                  >
                    <option value="">Chọn bác sĩ</option>
                    {vetFreeTimeData?.map((vet) => (
                      <option key={String(vet.id)} value={vet.id ?? ""}>
                        {vet.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

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
