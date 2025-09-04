import { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
  category: "medical" | "grooming" | "training" | "boarding";
}

interface BookingForm {
  serviceId: number;
  petName: string;
  petType: "dog" | "cat" | "other";
  petAge: string;
  ownerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  notes: string;
}

type ServiceCategory = "all" | "medical" | "grooming" | "training" | "boarding";

export default function Services() {
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory>("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    serviceId: 0,
    petName: "",
    petType: "dog",
    petAge: "",
    ownerName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  const services: Service[] = [
    // Medical Services
    {
      id: 1,
      name: "Khám sức khỏe tổng quát",
      description:
        "Khám sức khỏe định kỳ, kiểm tra các chỉ số cơ bản của thú cưng",
      price: 200000,
      duration: "30-45 phút",
      icon: "🏥",
      category: "medical",
    },
    {
      id: 2,
      name: "Tiêm vaccine",
      description:
        "Tiêm vaccine phòng bệnh cho chó mèo theo lịch trình khuyến nghị",
      price: 150000,
      duration: "15-20 phút",
      icon: "💉",
      category: "medical",
    },
    {
      id: 3,
      name: "Khám chuyên khoa",
      description:
        "Khám và điều trị các bệnh lý chuyên sâu về da, tiêu hóa, tim mạch",
      price: 350000,
      duration: "45-60 phút",
      icon: "🔬",
      category: "medical",
    },
    {
      id: 4,
      name: "Xét nghiệm máu",
      description: "Xét nghiệm các chỉ số máu, chức năng gan thận, hormone",
      price: 300000,
      duration: "20-30 phút",
      icon: "🩸",
      category: "medical",
    },
    // Grooming Services
    {
      id: 5,
      name: "Tắm rửa cơ bản",
      description: "Tắm, sấy khô, cắt móng, vệ sinh tai cho thú cưng",
      price: 120000,
      duration: "60-90 phút",
      icon: "🛁",
      category: "grooming",
    },
    {
      id: 6,
      name: "Cắt tỉa lông chuyên nghiệp",
      description: "Cắt tỉa lông theo phong cách, tạo kiểu cho thú cưng",
      price: 180000,
      duration: "90-120 phút",
      icon: "✂️",
      category: "grooming",
    },
    {
      id: 7,
      name: "Spa thư giãn",
      description: "Massage, đắp mặt nạ, chăm sóc da lông toàn diện",
      price: 250000,
      duration: "120-150 phút",
      icon: "🧴",
      category: "grooming",
    },
    // Training Services
    {
      id: 8,
      name: "Huấn luyện cơ bản",
      description: "Dạy các lệnh cơ bản: ngồi, nằm, đến, ở lại",
      price: 400000,
      duration: "60 phút/buổi",
      icon: "🎯",
      category: "training",
    },
    {
      id: 9,
      name: "Huấn luyện nâng cao",
      description: "Dạy kỹ năng phức tạp, sửa thói quen xấu",
      price: 600000,
      duration: "90 phút/buổi",
      icon: "🏆",
      category: "training",
    },
    // Boarding Services
    {
      id: 10,
      name: "Gửi thú cưng theo ngày",
      description: "Chăm sóc thú cưng trong ngày khi chủ đi làm",
      price: 100000,
      duration: "8-10 giờ",
      icon: "🏠",
      category: "boarding",
    },
  ];

  const categories = [
    { id: "all" as ServiceCategory, label: "Tất cả dịch vụ", icon: "🐾" },
    { id: "medical" as ServiceCategory, label: "Y tế thú y", icon: "🏥" },
    { id: "grooming" as ServiceCategory, label: "Spa & Grooming", icon: "✨" },
    { id: "training" as ServiceCategory, label: "Huấn luyện", icon: "🎓" },
    { id: "boarding" as ServiceCategory, label: "Gửi thú cưng", icon: "🏠" },
  ];

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setBookingForm((prev) => ({ ...prev, serviceId: service.id }));
    setShowBookingModal(true);
  };

  const handleBookingFormChange = (field: keyof BookingForm, value: string) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const requiredFields: (keyof BookingForm)[] = [
      "petName",
      "ownerName",
      "phone",
      "email",
      "date",
      "time",
    ];
    const missingFields = requiredFields.filter((field) => !bookingForm[field]);

    if (missingFields.length > 0) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Mock API call
    alert(
      `Đặt lịch thành công!\nDịch vụ: ${selectedService?.name}\nNgày: ${bookingForm.date}\nGiờ: ${bookingForm.time}\nChúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.`
    );

    // Reset form
    setShowBookingModal(false);
    setBookingForm({
      serviceId: 0,
      petName: "",
      petType: "dog",
      petAge: "",
      ownerName: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
        {/* Hero Section */}
        <div className="text-center mb-12 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dịch vụ chăm sóc thú cưng
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp dịch vụ chăm sóc thú cưng toàn diện với đội ngũ
            bác sĩ thú y và chuyên viên có kinh nghiệm, trang thiết bị hiện đại.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${selectedCategory === category.id
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-orange-300"
                  }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Giá dịch vụ:</span>
                  <span className="font-bold text-orange-600">
                    {service.price.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Thời gian:</span>
                  <span className="text-sm text-gray-700">
                    {service.duration}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleBookService(service)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Đặt lịch ngay
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">
              📞 Liên hệ khẩn cấp
            </h3>
            <p className="text-blue-800 text-sm mb-2">
              Hotline 24/7: <strong>0123-456-789</strong>
            </p>
            <p className="text-blue-800 text-sm">
              Hỗ trợ khẩn cấp cho thú cưng mọi lúc
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">
              🏥 Đội ngũ chuyên nghiệp
            </h3>
            <p className="text-green-800 text-sm mb-2">
              Bác sĩ thú y có bằng cấp
            </p>
            <p className="text-green-800 text-sm">
              Kinh nghiệm hơn 10 năm chăm sóc thú cưng
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3">
              🎯 Cam kết chất lượng
            </h3>
            <p className="text-purple-800 text-sm mb-2">Bảo hành dịch vụ</p>
            <p className="text-purple-800 text-sm">
              Hỗ trợ sau điều trị miễn phí
            </p>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Đặt lịch: {selectedService.name}
                  </h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Đóng modal"
                    aria-label="Đóng modal đặt lịch"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  {/* Pet Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Thông tin thú cưng
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tên thú cưng <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={bookingForm.petName}
                          onChange={(e) =>
                            handleBookingFormChange("petName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Tên thú cưng"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loại thú cưng <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={bookingForm.petType}
                          onChange={(e) =>
                            handleBookingFormChange("petType", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          title="Chọn loại thú cưng"
                          aria-label="Loại thú cưng"
                          required
                        >
                          <option value="dog">Chó</option>
                          <option value="cat">Mèo</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tuổi thú cưng
                          </label>
                          <input
                            type="text"
                            value={bookingForm.petAge}
                            onChange={(e) =>
                              handleBookingFormChange("petAge", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Ví dụ: 2 tuổi, 6 tháng"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Giới tính
                          </label>
                          <select
                            value={bookingForm.petGender}
                            onChange={(e) =>
                              handleBookingFormChange("petGender", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            title="Chọn giới tính thú cưng"
                            aria-label="Giới tính thú cưng"
                            required
                          >
                            <option value="male">Đực</option>
                            <option value="female">Cái</option>
                            <option value="unknown">Không rõ</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Owner Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Thông tin chủ sở hữu
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={bookingForm.ownerName}
                          onChange={(e) =>
                            handleBookingFormChange("ownerName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Họ và tên"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={bookingForm.phone}
                          onChange={(e) =>
                            handleBookingFormChange("phone", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Số điện thoại"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={bookingForm.email}
                          onChange={(e) =>
                            handleBookingFormChange("email", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Appointment Time */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Thời gian hẹn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ngày hẹn <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={bookingForm.date}
                          onChange={(e) =>
                            handleBookingFormChange("date", e.target.value)
                          }
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          title="Chọn ngày hẹn"
                          aria-label="Ngày hẹn"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giờ hẹn <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={bookingForm.time}
                          onChange={(e) =>
                            handleBookingFormChange("time", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          title="Chọn giờ hẹn"
                          aria-label="Giờ hẹn"
                          required
                        >
                          <option value="">Chọn giờ</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ghi chú
                    </label>
                    <textarea
                      value={bookingForm.notes}
                      onChange={(e) =>
                        handleBookingFormChange("notes", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      rows={3}
                      placeholder="Mô tả triệu chứng, yêu cầu đặc biệt..."
                    />
                  </div>

                  {/* Service Summary */}
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-900 mb-2">
                      Tóm tắt dịch vụ:
                    </h4>
                    <div className="space-y-1 text-sm text-orange-800">
                      <p>
                        <strong>Dịch vụ:</strong> {selectedService.name}
                      </p>
                      <p>
                        <strong>Thời gian:</strong> {selectedService.duration}
                      </p>
                      <p>
                        <strong>Giá:</strong>{" "}
                        {selectedService.price.toLocaleString()}đ
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Xác nhận đặt lịch
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
