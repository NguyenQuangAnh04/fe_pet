import { useMemo, useState } from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
  category: "medical" | "grooming" | "training" | "boarding";
}

type ServiceCategory = "all" | "medical" | "grooming" | "training" | "boarding";

type ScheduledItem = {
  serviceId: number;
  date: string; // yyyy-mm-dd
  time: string; // hh:mm
};

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("all");
  // selected services with their chosen date/time
  const [scheduled, setScheduled] = useState<ScheduledItem[]>([]);
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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

  const today = new Date().toISOString().split("T")[0];

  const selectedServicesIds = useMemo(() => scheduled.map((s) => s.serviceId), [scheduled]);

  const toggleSelectService = (service: Service) => {
    const exists = scheduled.find((s) => s.serviceId === service.id);
    if (exists) {
      setScheduled((prev) => prev.filter((p) => p.serviceId !== service.id));
    } else {
      // add with default date = today and first time slot
      setScheduled((prev) => [
        ...prev,
        { serviceId: service.id, date: today, time: timeSlots[0] },
      ]);
    }
  };

  const updateScheduled = (serviceId: number, patch: Partial<ScheduledItem>) => {
    setScheduled((prev) => prev.map((s) => (s.serviceId === serviceId ? { ...s, ...patch } : s)));
  };

  const handleConfirmBooking = () => {
    if (!petName || !ownerName || !phone || !email) {
      alert("Vui lòng điền tên thú cưng và thông tin liên hệ (tên, điện thoại, email)");
      return;
    }

    if (scheduled.length === 0) {
      alert("Chưa chọn dịch vụ nào");
      return;
    }

    // Mock API call for multiple bookings
    const summary = scheduled
      .map((s) => {
        const svc = services.find((x) => x.id === s.serviceId);
        return `- ${svc?.name} — ${s.date} ${s.time}`;
      })
      .join("\n");

    alert(`Đặt lịch thành công!\nTên thú cưng: ${petName}\nChủ: ${ownerName}\nSĐT: ${phone}\nEmail: ${email}\n\n${summary}`);

    // reset
    setScheduled([]);
    setPetName("");
    setOwnerName("");
    setPhone("");
    setEmail("");
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

        {/* Services Grid with multi-select */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredServices.map((service) => {
            const checked = selectedServicesIds.includes(service.id);
            return (
              <div
                key={service.id}
                className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${checked ? "ring-2 ring-orange-200" : ""}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-4xl mb-2">{service.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                  <div className="ml-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSelectService(service)}
                        className="w-5 h-5"
                        aria-label={`Chọn dịch vụ ${service.name}`}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Giá:</p>
                    <p className="font-bold text-orange-600">{service.price.toLocaleString()}đ</p>
                  </div>
                  <div className="text-sm text-gray-700">{service.duration}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected scheduling panel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Lịch đã chọn ({scheduled.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên thú cưng *</label>
              <input value={petName} onChange={(e) => setPetName(e.target.value)} className="w-full px-4 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chủ (Họ tên) *</label>
              <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="w-full px-4 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded" />
            </div>
          </div>

          {scheduled.length === 0 ? (
            <p className="text-sm text-gray-500 mt-4">Chưa chọn dịch vụ nào. Tích chọn hộp bên cạnh dịch vụ để thêm.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {scheduled.map((s) => {
                const svc = services.find((x) => x.id === s.serviceId)!;
                return (
                  <div key={s.serviceId} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-3 border rounded">
                    <div>
                      <div className="font-medium">{svc.name}</div>
                      <div className="text-sm text-gray-500">{svc.duration} • {svc.price.toLocaleString()}đ</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="date" value={s.date} min={today} onChange={(e) => updateScheduled(s.serviceId, { date: e.target.value })} className="px-3 py-2 border rounded" />
                      <select value={s.time} onChange={(e) => updateScheduled(s.serviceId, { time: e.target.value })} className="px-3 py-2 border rounded">
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <button type="button" onClick={() => setScheduled((prev) => prev.filter(p => p.serviceId !== s.serviceId))} className="text-sm text-red-500">Bỏ</button>
                    </div>
                  </div>
                );
              })}

              <div className="flex gap-3 mt-4">
                <button onClick={handleConfirmBooking} className="bg-orange-500 text-white px-4 py-2 rounded">Xác nhận đặt lịch</button>
                <button onClick={() => setScheduled([])} className="bg-gray-200 px-4 py-2 rounded">Bỏ chọn hết</button>
              </div>
            </div>
          )}
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

        {/* old single booking modal removed; multi-select UI handles booking */}
      </div>
      <Footer />
    </>
  );
}
