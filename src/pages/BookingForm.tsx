import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    petName: "",
    petType: "dog",
    service: "",
    date: "",
    time: "",
    note: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking data:", formData);
    alert("Đặt lịch thành công! Chúng tôi sẽ liên hệ lại.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-pink-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl grid md:grid-cols-2 w-full max-w-4xl overflow-hidden">
        
        {/* Left: Image + text */}
        <div className="bg-pink-100 flex flex-col items-center justify-center p-6">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png" 
            alt="pet care"
            className="w-40 h-40 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Đặt lịch khám & dịch vụ cho thú cưng
          </h2>
          <p className="text-gray-500 mt-2 text-center">
            Chăm sóc chó mèo tận tâm – dễ dàng đặt lịch online
          </p>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-600">Họ tên chủ nuôi</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Tên thú cưng</label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-600">Loại</label>
              <select
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="dog">Chó</option>
                <option value="cat">Mèo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Dịch vụ</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">-- Chọn dịch vụ --</option>
              <option value="exam">Khám tổng quát</option>
              <option value="vaccine">Tiêm phòng</option>
              <option value="spa">Tắm spa</option>
              <option value="surgery">Triệt sản</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Ngày</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Giờ</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Ghi chú</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Đặt lịch
          </button>
        </form>
      </div>
    </div>
  );
}
