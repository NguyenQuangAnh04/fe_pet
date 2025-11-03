import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    description: string;
    category: string;
    icon: string;
}

const PetCareBlogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlog] = useState<BlogPost[]>([]);

    useEffect(() => {
        const blogData: BlogPost[] = [
            {
                id: 1,
                slug: "cach-chon-do-an-phu-hop-cho-thu-cung",
                title: "Cách chọn đồ ăn phù hợp",
                description:
                    "Chọn đồ ăn có đầy đủ chất dinh dưỡng, phù hợp với tuổi và tình trạng sức khỏe của thú cưng để đảm bảo sức khỏe tối ưu.",
                category: "Dinh dưỡng",
                icon: "🥗",
            },
            {
                id: 2,
                slug: "dau-hieu-thu-cung-bi-benh",
                title: "Dấu hiệu thú cưng bị bệnh",
                description:
                    "Chú ý đến những dấu hiệu bất thường như mất ăn, tiêu chảy, thay đổi hành vi. Nếu phát hiện, hãy đưa thú cưng đi khám ngay.",
                category: "Sức khỏe",
                icon: "🩺",
            },
            {
                id: 3,
                slug: "meo-huan-luyen-thu-cung-hieu-qua",
                title: "Mẹo huấn luyện hiệu quả",
                description:
                    "Sử dụng phương pháp tích cực, nhất quán và kiên nhẫn. Tập huấn luyện trong khoảng thời gian ngắn nhưng thường xuyên mỗi ngày.",
                category: "Huấn luyện",
                icon: "🎾",
            },
        ];
        setBlog(blogData);
    }, []);

    return (
        <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg my-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        📚 Blog & Mẹo Chăm Thú Cưng
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Những bài viết hữu ích từ các chuyên gia để giúp bạn chăm sóc thú
                        cưng tốt nhất
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {blogs.map((blog) => (
                        <article
                            key={blog.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-4xl">{blog.icon}</span>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                    {blog.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {blog.title}
                            </h3>

                            <p className="text-gray-600 text-sm flex-grow mb-4">
                                {blog.description}
                            </p>

                            <button
                                onClick={() => navigate(`/blog/${blog.slug}`)}
                                className="mt-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 w-full transform hover:scale-105 hover:shadow-md active:scale-95"
                            >
                                Đọc thêm →
                            </button>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <button
                        onClick={() => navigate("/blog")}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 text-lg transform hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                        Xem tất cả bài viết →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PetCareBlogs;
