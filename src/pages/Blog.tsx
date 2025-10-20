import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

interface BlogPost {
    id: number;
    title: string;
    description: string;
    fullContent: string;
    category: string;
    icon: string;
    date: string;
    author: string;
    image: string;
    readTime: string;
}

const BlogPage = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const blogData: BlogPost[] = [
            {
                id: 1,
                title: "Cách chọn đồ ăn phù hợp",
                description:
                    "Chọn đồ ăn có đầy đủ chất dinh dưỡng, phù hợp với tuổi và tình trạng sức khỏe của thú cưng.",
                fullContent: `Việc chọn lựa đồ ăn phù hợp là một trong những yếu tố quan trọng nhất để đảm bảo sức khỏe tối ưu cho thú cưng của bạn.

## Các tiêu chí cần xem xét:

**1. Tuổi của thú cưng**
- Thức ăn cho puppies (dưới 1 tuổi) có hàm lượng calorie và protein cao hơn
- Thức ăn cho chó trưởng thành (1-7 tuổi) cân bằng các chất dinh dưỡng
- Thức ăn cho chó già (trên 7 tuổi) ít chất béo hơn, dễ tiêu hóa

**2. Kích thước cơ thể**
- Chó nhỏ cần lượng calo cao hơn so với kích thước cơ thể
- Chó lớn cần thức ăn được thiết kế để giúp xương khỏe mạnh
- Chó siêu lớn cần các thành phần hỗ trợ khớp

**3. Tình trạng sức khỏe**
- Chó bị dị ứng cần thức ăn không chứa các chất gây dị ứng
- Chó béo phì cần thức ăn ít chất béo, nhiều chất xơ
- Chó có vấn đề tiêu hóa cần thức ăn dễ tiêu

**4. Chất lượng thành phần**
- Tìm thức ăn có thịt thực tế là thành phần chính
- Tránh thức ăn có quá nhiều chất bảo quản nhân tạo
- Chọn thức ăn chứa axit béo Omega-3 và Omega-6

## Các loại thức ăn phổ biến:

**Thức ăn khô (Dry Food)**
- Lợi: tiết kiệm, bảo quản lâu, tốt cho răng
- Nhược: cần nước uống đủ

**Thức ăn ướt (Wet Food)**
- Lợi: dễ ăn, có độ ẩm cao, ngon miệng
- Nhược: đắt hơn, hỏng nhanh sau khi mở

**Thức ăn tươi (Fresh Food)**
- Lợi: dinh dưỡng cao nhất, tự nhiên
- Nhược: giá cao, bảo quản khó khăn

## Lời khuyên từ chuyên gia:

- Luôn chuyển từ từ từ loại thức ăn cũ sang mới (trộn dần trong 7-10 ngày)
- Tham khảo ý kiến bác sĩ thú y trước khi thay đổi chế độ ăn
- Cung cấp nước sạch mỗi lúc
- Không cho thú cưng ăn thức ăn con người`,
                category: "Dinh dưỡng",
                icon: "🥗",
                date: "20/10/2025",
                author: "Bác sĩ Nguyễn Thị Hoa",
                image:
                    "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800&h=400&fit=crop",
                readTime: "5 phút",
            },
            {
                id: 2,
                title: "Dấu hiệu thú cưng bị bệnh",
                description:
                    "Chú ý đến những dấu hiệu bất thường như mất ăn, tiêu chảy, thay đổi hành vi.",
                fullContent: `Nhận biết sớm các dấu hiệu bệnh tật ở thú cưng là chìa khóa để điều trị kịp thời và hiệu quả.

## Dấu hiệu cảnh báo chung:

**Thay đổi trong ăn uống**
- Mất ngon miệng hoặc ăn ít hơn bình thường
- Uống nước quá nhiều (có thể là dấu hiệu của bệnh tiểu đường)
- Từ chối ăn loại thức ăn yêu thích

**Vấn đề tiêu hóa**
- Tiêu chảy kéo dài (trên 2-3 ngày)
- Nôn buồn hoặc nôn thường xuyên
- Táo bón
- Phân có máu hoặc có mùi lạ

**Thay đổi hành vi**
- Trở nên yếu ớt, thiếu năng lượng
- Ẩn dật hoặc tránh tương tác
- Tăng cảm xúc, lo âu
- Thay đổi trong giấc ngủ (ngủ quá nhiều hoặc quá ít)

**Vấn đề về da và lông**
- Gãi quá nhiều hoặc liếm lông
- Rụng lông bất thường
- Nổi mẩn hoặc viêm da
- Mùi cơ thể lạ

**Các triệu chứng khác**
- Ho hoặc hắt xì kéo dài
- Khó thở
- Tăng cân hoặc giảm cân nhanh
- Chảy máu từ mũi, miệng, hay động vật cút

## Bệnh phổ biến ở thú cưng:

**Viêm tai**
- Cấn tai, rêu trong tai
- Mùi tệ từ tai
- Lắc đầu thường xuyên

**Bệnh tumorPhút hiểu**
- Sưng các hạch lymph
- Vết sưng hoặc khối lõm không giải thích được
- Khó nuốt hoặc ăn chậm

**Bệnh tim**
- Ho, đặc biệt khi nằm
- Khó thở
- Mệt mỏi quá mức

**Nhiễm trùng niệu đạo**
- Buồn tiểu thường xuyên
- Khó thở khi đi tiểu
- Nước tiểu có máu

## Khi nào cần đến bác sĩ thú y:

⚠️ **Ngay lập tức (Khẩn cấp):**
- Chảy máu
- Khó thở
- Mất ý thức
- Co giật
- Bụng căng hoặc đau đớn
- Không thể đi tiểu hoặc đại tiện

⏰ **Trong 24 giờ:**
- Nôn hoặc tiêu chảy kéo dài
- Mất ăn hoặc thay đổi hành vi đáng kể
- Sưng mặt hoặc môi

📋 **Kiểm tra định kỳ:**
- Thay đổi nhỏ hoặc tạm thời
- Tham khảo ý kiến bác sĩ`,
                category: "Sức khỏe",
                icon: "🩺",
                date: "18/10/2025",
                author: "Bác sĩ Trần Minh Tuấn",
                image:
                    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
                readTime: "7 phút",
            },
            {
                id: 3,
                title: "Mẹo huấn luyện hiệu quả",
                description:
                    "Sử dụng phương pháp tích cực, nhất quán và kiên nhẫn. Tập huấn luyện trong khoảng thời gian ngắn nhưng thường xuyên.",
                fullContent: `Huấn luyện thú cưng không chỉ để dạy những kỹ năng mà còn để xây dựng mối quan hệ tin tưởng.

## Nguyên tắc cơ bản của huấn luyện tích cực:

**1. Sử dụng phần thưởng**
- Chọn phần thưởng yêu thích của thú cưng (thức ăn, đồ chơi, lời khen)
- Trao phần thưởng ngay lập tức sau khi thú cưng thực hiện hành động đúng
- Phần thưởng phải có giá trị đủ lớn để kích thích

**2. Tính nhất quán**
- Luôn sử dụng cùng một lệnh cho cùng một hành động
- Tất cả mọi người trong gia đình phải sử dụng cùng quy tắc
- Áp dụng nhất quán hàng ngày

**3. Kiên nhẫn và tích cực**
- Không bao giờ phạt hoặc chỉ trích thú cưng
- Hãy coi những lỗi là cơ hội học tập
- Luôn giữ tâm trạng tích cực

## Kỹ năng cơ bản để dạy:

**"Ngồi" (Sit)**
- Bước 1: Cầm phần thưởng gần mũi thú cưng
- Bước 2: Chuyển phần thưởng lên phía trên đầu từ từ
- Bước 3: Thú cưng sẽ ngồi để theo dõi phần thưởng
- Bước 4: Nói "Ngồi" khi thú cưng ngồi, sau đó cho phần thưởng

**"Nằm" (Down)**
- Bước 1: Bắt đầu với thú cưng ở tư thế ngồi
- Bước 2: Cầm phần thưởng gần mũi, sau đó kéo xuống đất
- Bước 3: Thú cưng sẽ nằm xuống để theo dõi
- Bước 4: Nói "Nằm" và cho phần thưởng

**"Đến đây" (Come)**
- Bước 1: Bắt đầu trong một khoảng không gian nhỏ
- Bước 2: Cầm phần thưởng, gọi thú cưng theo tên
- Bước 3: Nói "Đến đây" khi thú cưng tiến tới
- Bước 4: Cho phần thưởng ngay lập tức

## Lịch trình huấn luyện lý tưởng:

**Độ tuổi 8-12 tuần:**
- Từng buổi 5-10 phút
- Tập 3-5 lần mỗi ngày
- Chỉ tập những kỹ năng rất cơ bản

**Độ tuổi 3-6 tháng:**
- Từng buổi 10-15 phút
- Tập 2-3 lần mỗi ngày
- Bắt đầu tập những lệnh phức tạp hơn

**Độ tuổi trên 6 tháng:**
- Từng buổi 15-30 phút
- Tập 1-2 lần mỗi ngày
- Ôn tập và nâng cao kỹ năng

## Mẹo để thành công:

✅ **Làm thế nào:**
- Tập trong một môi trường yên tĩnh, ít phiền nhiễu
- Tập trước bữa ăn khi thú cưng đói hơn
- Kết thúc buổi tập khi thú cưng vẫn còn hứng thú
- Sử dụng nhiều loại phần thưởng khác nhau

❌ **Tránh những điều này:**
- Đừng tập khi thú cưng mệt mỏi
- Đừng quấy rầy thú cưng trong quá trình tập
- Đừng lặp lại lệnh nhiều lần nếu thú cưng không nghe
- Đừng áp dụng áp lực hoặc bạo lực

## Xử lý các vấn đề phổ biến:

**Thú cưng không nghe lệnh**
- Thử lại vào lúc khác
- Kiểm tra xem phần thưởng có đủ hấp dẫn không
- Giảm mức độ khó

**Thú cưng nháy mắt hoặc cáu kỉnh**
- Có thể buổi tập quá dài
- Thủ cưng có thể bị lo âu
- Hãy tập ít thường xuyên hơn nhưng kéo dài hơn`,
                category: "Huấn luyện",
                icon: "🎾",
                date: "16/10/2025",
                author: "Huấn luyện viên Phạm Hương",
                image:
                    "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=800&h=400&fit=crop",
                readTime: "8 phút",
            },
            {
                id: 4,
                title: "Cách chăm sóc lông thú cưng",
                description:
                    "Bí quyết giữ lông chó mèo luôn sáng bóng và khỏe mạnh qua việc tắm rửa và chải lông định kỳ.",
                fullContent: `Chăm sóc lông là một phần quan trọng của việc giữ thú cưng luôn khỏe mạnh và đẹp đẽ.

## Tần suất tắm rửa:

**Chó:**
- Chó ngắn lông: 4-6 tuần một lần
- Chó dài lông: 4-8 tuần một lần
- Chó có da nhạy cảm: 8-12 tuần một lần

**Mèo:**
- Mèo lông ngắn: 1-2 tháng một lần
- Mèo lông dài: 3-4 tuần một lần
- Mèo nhạy cảm: theo hướng dẫn bác sĩ

## Các sản phẩm cần thiết:

- Dầu gội chuyên dụng cho thú cưng
- Dầu xả (nếu lông dài)
- Khăn lau mềm
- Bàn chải lông
- Lược chải
- Kéo cắt móng (nếu cần)

## Quy trình tắm rửa đúng cách:

1. Chuẩn bị nước ấm (không quá nóng)
2. Làm ẩm toàn bộ cơ thể
3. Thoa dầu gội và massage nhẹ
4. Rửa sạch bằng nước
5. Lau khô bằng khăn
6. Chải lông khi còn ẩm
7. Sấy khô hoàn toàn (nếu có sấy)`,
                category: "Chăm sóc",
                icon: "💇",
                date: "14/10/2025",
                author: "Bác sĩ Nguyễn Thị Hoa",
                image:
                    "https://images.unsplash.com/photo-1601758228658-3befa6c83ee7?w=800&h=400&fit=crop",
                readTime: "4 phút",
            },
            {
                id: 5,
                title: "Vận động và tập thể dục cho thú cưng",
                description:
                    "Lượng vận động cần thiết hàng ngày để thú cưng luôn khỏe mạnh và vui vẻ.",
                fullContent: `Tập thể dục đều đặn là cách tốt nhất để giữ thú cưng khỏe mạnh, hạnh phúc và tránh béo phì.

## Nhu cầu vận động theo giống loài:

**Chó:**
- Chó năng lượng cao (Husky, Border Collie): 1-2 giờ mỗi ngày
- Chó năng lượng trung bình (Labrador, Beagle): 30-60 phút mỗi ngày
- Chó năng lượng thấp (Bulldog, Pug): 15-30 phút mỗi ngày

**Mèo:**
- Mèo trong nhà: 10-15 phút chơi tương tác, 2-3 lần mỗi ngày
- Mèo ngoài trời: tự chúng sẽ vận động

## Các hoạt động vui nhộn:

- Chạy trên bãi cỏ
- Chơi bóng hoặc đĩa
- Bơi lội (thích hợp)
- Chơi tương tác với đồ chơi
- Dạo bộ
- Chơi với những thú cưng khác`,
                category: "Sức khỏe",
                icon: "⚽",
                date: "12/10/2025",
                author: "Huấn luyện viên Phạm Hương",
                image:
                    "https://images.unsplash.com/photo-1633722715463-d30628cbc5f0?w=800&h=400&fit=crop",
                readTime: "5 phút",
            },
        ];
        setBlogs(blogData);
    }, []);

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            📚 Blog & Mẹo Chăm Thú Cưng
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Những bài viết hữu ích từ các chuyên gia để giúp bạn chăm sóc thú
                            cưng tốt nhất
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-gray-700 placeholder-gray-500"
                        />
                    </div>

                    {/* Blog Posts */}
                    {selectedBlog ? (
                        // Blog Detail View
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            {/* Back Button */}
                            <button
                                onClick={() => {
                                    setSelectedBlog(null);
                                    setSearchTerm("");
                                }}
                                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold mb-6"
                            >
                                <ChevronRight className="rotate-180" size={20} />
                                Quay lại
                            </button>

                            {/* Blog Image */}
                            <img
                                src={selectedBlog.image}
                                alt={selectedBlog.title}
                                className="w-full h-96 object-cover rounded-lg mb-8"
                            />

                            {/* Blog Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6 text-sm">
                                <span className="font-semibold text-gray-900">
                                    {selectedBlog.icon} {selectedBlog.category}
                                </span>
                                <span>•</span>
                                <span>{selectedBlog.date}</span>
                                <span>•</span>
                                <span>Tác giả: {selectedBlog.author}</span>
                                <span>•</span>
                                <span>{selectedBlog.readTime}</span>
                            </div>

                            {/* Blog Title */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                                {selectedBlog.title}
                            </h1>

                            {/* Blog Content */}
                            <div className="prose prose-lg max-w-none mb-8">
                                {selectedBlog.fullContent.split("\n").map((paragraph, idx) => {
                                    if (paragraph.startsWith("##")) {
                                        return (
                                            <h2
                                                key={idx}
                                                className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                                            >
                                                {paragraph.replace("## ", "")}
                                            </h2>
                                        );
                                    }
                                    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                                        return (
                                            <p
                                                key={idx}
                                                className="font-semibold text-gray-800 mt-3 mb-2"
                                            >
                                                {paragraph.replace(/\*\*/g, "")}
                                            </p>
                                        );
                                    }
                                    if (paragraph.startsWith("- ")) {
                                        return (
                                            <li key={idx} className="text-gray-700 ml-4">
                                                {paragraph.replace("- ", "")}
                                            </li>
                                        );
                                    }
                                    if (paragraph.startsWith("✅") || paragraph.startsWith("❌") || paragraph.startsWith("⚠️") || paragraph.startsWith("⏰") || paragraph.startsWith("📋")) {
                                        return (
                                            <p key={idx} className="font-semibold text-gray-800 mt-3">
                                                {paragraph}
                                            </p>
                                        );
                                    }
                                    if (paragraph.trim()) {
                                        return (
                                            <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                                                {paragraph}
                                            </p>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Related Articles */}
                            <div className="mt-12 pt-8 border-t-2 border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    📖 Bài viết liên quan
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {blogs
                                        .filter((b) => b.id !== selectedBlog.id)
                                        .slice(0, 3)
                                        .map((blog) => (
                                            <button
                                                key={blog.id}
                                                onClick={() => setSelectedBlog(blog)}
                                                className="text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-all duration-200"
                                            >
                                                <p className="font-semibold text-gray-900 mb-2">
                                                    {blog.title}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {blog.category} • {blog.readTime}
                                                </p>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Blog List View
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog) => (
                                    <article
                                        key={blog.id}
                                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group"
                                        onClick={() => setSelectedBlog(blog)}
                                    >
                                        {/* Image */}
                                        <div className="relative overflow-hidden h-48">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                {blog.category}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <span className="text-3xl">{blog.icon}</span>
                                                <span className="text-xs text-gray-500">
                                                    {blog.readTime}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                {blog.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                <span className="text-xs text-gray-500">
                                                    {blog.date}
                                                </span>
                                                <button className="text-blue-500 hover:text-blue-600 font-semibold text-sm flex items-center gap-1">
                                                    Đọc thêm
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        Không tìm thấy bài viết nào. Hãy thử tìm kiếm khác!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;
