import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

interface BlogPost {
    id: number;
    slug: string;
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

const BlogDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Mock data - Thay bằng API call thực tế
    const blogPosts: BlogPost[] = [
        {
            id: 1,
            slug: "cach-chon-do-an-phu-hop-cho-thu-cung",
            title: "Cách chọn đồ ăn phù hợp cho thú cưng",
            description:
                "Chọn đồ ăn có đầy đủ chất dinh dưỡng, phù hợp với tuổi và tình trạng sức khỏe của thú cưng để đảm bảo sức khỏe tối ưu.",
            category: "Dinh dưỡng",
            icon: "🥗",
            author: "Dr. Nguyễn Văn A",
            date: "15/01/2024",
            readTime: "5 phút đọc",
            image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
            fullContent: `
## Tại sao việc chọn đồ ăn phù hợp quan trọng?

Dinh dưỡng là yếu tố then chốt ảnh hưởng đến sức khỏe, tuổi thọ và chất lượng cuộc sống của thú cưng. Một chế độ ăn uống cân bằng sẽ giúp:

- **Tăng cường hệ miễn dịch**: Cơ thể khỏe mạnh hơn, chống lại bệnh tật tốt hơn
- **Duy trì cân nặng lý tưởng**: Tránh béo phì hoặc suy dinh dưỡng
- **Da lông bóng mượt**: Dấu hiệu của sức khỏe tốt
- **Tiêu hóa tốt**: Giảm nguy cơ rối loạn tiêu hóa

## Các yếu tố cần xem xét khi chọn thức ăn

### 1. Độ tuổi của thú cưng

**Chó/mèo con (dưới 1 tuổi):**
- Cần nhiều protein (25-30%) và năng lượng để phát triển
- Thức ăn chuyên dụng cho Puppy/Kitten
- Bổ sung DHA cho phát triển não bộ

**Trưởng thành (1-7 tuổi):**
- Protein vừa phải (20-25%)
- Cân bằng năng lượng để duy trì cân nặng
- Thức ăn Adult formula

**Cao tuổi (trên 7 tuổi):**
- Giảm calories, tăng chất xơ
- Bổ sung chất chống oxy hóa
- Hỗ trợ khớp (glucosamine, chondroitin)

### 2. Kích thước giống

**Giống nhỏ (dưới 10kg):**
- Viên nhỏ, dễ nhai
- Năng lượng cao (trao đổi chất nhanh)
- Hỗ trợ răng miệng

**Giống trung bình (10-25kg):**
- Thức ăn cân bằng dinh dưỡng
- Hỗ trợ tiêu hóa

**Giống lớn (trên 25kg):**
- Viên lớn hơn
- Hỗ trợ khớp xương
- Kiểm soát cân nặng

### 3. Tình trạng sức khỏe

**Thú cưng khỏe mạnh:**
- Thức ăn thương mại chất lượng cao
- Đủ protein, chất béo, vitamin, khoáng chất

**Có vấn đề sức khỏe:**
- Béo phì → Thức ăn Low-fat/Weight management
- Dị ứng → Thức ăn Hypoallergenic
- Sỏi thận → Thức ăn Renal/Kidney care
- **Luôn tham khảo ý kiến bác sĩ thú y**

## Cách đọc nhãn thức ăn thú cưng

### Thành phần cần có:

✅ **Protein động vật** (thịt gà, cá, thịt bò) - Thành phần đầu tiên
✅ **Chất béo lành mạnh** (omega-3, omega-6)
✅ **Carbohydrate** (gạo lứt, khoai lang, yến mạch)
✅ **Vitamin & khoáng chất** (A, D, E, calcium, phosphorus)

### Thành phần nên tránh:

❌ By-products (phụ phẩm) không rõ nguồn gốc
❌ Phẩm màu nhân tạo
❌ Chất bảo quản hóa học (BHA, BHT)
❌ Đường, xi-rô ngô

## Lịch trình cho ăn khoa học

### Chó con/Mèo con (2-12 tháng):
- **3-4 bữa/ngày**
- Chia nhỏ khẩu phần
- Ăn đúng giờ

### Trưởng thành:
- **2 bữa/ngày** (sáng + tối)
- Khoảng cách 8-12 giờ
- Định lượng chính xác

### Cao tuổi:
- **2-3 bữa nhỏ/ngày**
- Dễ tiêu hóa hơn
- Tránh ăn quá no

## Kết luận

Việc chọn đồ ăn phù hợp cho thú cưng không chỉ đơn giản là mua một túi thức ăn bất kỳ. Hãy dành thời gian tìm hiểu, đọc nhãn kỹ càng và tham khảo ý kiến bác sĩ thú y để đảm bảo thú cưng của bạn có một chế độ dinh dưỡng tốt nhất!
      `,
        },
        {
            id: 2,
            slug: "dau-hieu-thu-cung-bi-benh",
            title: "Dấu hiệu thú cưng bị bệnh",
            description:
                "Chú ý đến những dấu hiệu bất thường như mất ăn, tiêu chảy, thay đổi hành vi. Nếu phát hiện, hãy đưa thú cưng đi khám ngay.",
            category: "Sức khỏe",
            icon: "🩺",
            author: "Dr. Trần Thị B",
            date: "20/01/2024",
            readTime: "7 phút đọc",
            image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800",
            fullContent: `
## Tại sao cần nhận biết dấu hiệu bệnh sớm?

Thú cưng không thể nói được khi chúng cảm thấy không khỏe. Việc phát hiện sớm các dấu hiệu bệnh tật sẽ giúp:

- **Điều trị kịp thời**: Nhiều bệnh nếu phát hiện sớm sẽ dễ chữa trị hơn
- **Giảm chi phí**: Chi phí điều trị sớm thường thấp hơn giai đoạn muộn
- **Tăng cơ hội hồi phục**: Thời gian điều trị ngắn hơn, hiệu quả cao hơn
- **Giảm đau đớn**: Thú cưng không phải chịu đựng bệnh tật kéo dài

## 10 Dấu hiệu cảnh báo quan trọng

### 1. Thay đổi thói quen ăn uống

🚨 **Dấu hiệu:**
- Mất ăn hoàn toàn hoặc giảm lượng ăn đáng kể
- Ăn nhiều bất thường
- Khó nuốt, ói mửa sau khi ăn

⚠️ **Có thể là:**
- Vấn đề răng miệng
- Nhiễm trùng
- Vấn đề tiêu hóa
- Bệnh nghiêm trọng (ung thư, suy thận)

### 2. Uống nước quá nhiều hoặc quá ít

🚨 **Dấu hiệu:**
- Uống nước liên tục, bồn nước luôn cạn
- Hoàn toàn không uống nước

⚠️ **Có thể là:**
- Tiểu đường
- Suy thận
- Nhiễm trùng đường tiết niệu
- Sốt, mất nước

### 3. Thay đổi trong đi vệ sinh

🚨 **Dấu hiệu:**
- Tiêu chảy kéo dài
- Táo bón
- Phân có máu, nhầy
- Đi tiểu nhiều lần, ít mỗi lần
- Nước tiểu có màu bất thường (đỏ, cam đậm)

⚠️ **Có thể là:**
- Nhiễm trùng đường tiết niệu
- Sỏi thận/bàng quang
- Vấn đề tiêu hóa
- Giun, ký sinh trùng

### 4. Thay đổi về da và lông

🚨 **Dấu hiệu:**
- Ngứa quá mức, gãi liên tục
- Rụng lông bất thường
- Da khô, có vảy
- Mụn, nốt sần, u cục
- Vết thương không lành

⚠️ **Có thể là:**
- Dị ứng
- Nhiễm nấm, vi khuẩn
- Bọ chét, ve
- Vấn đề hormone
- U nang, u bướu

### 5. Khó thở hoặc ho

🚨 **Dấu hiệu:**
- Thở nhanh, hổn hển
- Ho kéo dài
- Tiếng thở khò khè
- Miệng, lưỡi xanh tím

⚠️ **CẤP CỨU NGAY:**
- Bệnh tim
- Viêm phổi
- Suy hô hấp
- Dị vật đường thở

### 6. Thay đổi hành vi

🚨 **Dấu hiệu:**
- Trở nên hung dữ hoặc rụt rè bất thường
- Không vui chơi như thường lệ
- Ngủ nhiều hơn bình thường
- Kêu rên, khóc liên tục

⚠️ **Có thể là:**
- Đau đớn
- Stress, lo âu
- Vấn đề thần kinh
- Bệnh nội khoa

### 7. Vận động bất thường

🚨 **Dấu hiệu:**
- Khập khiễng
- Không thể đứng/đi
- Run, co giật
- Mất thăng bằng

⚠️ **Có thể là:**
- Chấn thương
- Viêm khớp
- Vấn đề cột sống
- Rối loạn thần kinh

### 8. Mắt, tai, mũi bất thường

🚨 **Dấu hiệu:**
- Mắt đỏ, chảy nước mắt
- Tai có mùi hôi, chảy dịch
- Mũi chảy dịch vàng/xanh
- Hắt hơi liên tục

⚠️ **Có thể là:**
- Nhiễm trùng
- Dị ứng
- Cảm lạnh
- Viêm kết mạc

### 9. Sốt hoặc thân nhiệt thấp

🚨 **Nhiệt độ bình thường:**
- Chó: 38-39°C
- Mèo: 38-39.2°C

⚠️ **CẤP CỨU nếu:**
- > 40°C (sốt cao)
- < 37°C (hạ nhiệt)

### 10. Bụng phình to đột ngột

🚨 **Dấu hiệu:**
- Bụng to, căng cứng
- Kèm khó thở, hổn hển

⚠️ **CẤP CỨU NGAY:**
- Giãn dạ dày xoắn vặn (chó)
- Cổ trướng (mèo)
- Tích tụ dịch

## Khi nào cần đến bác sĩ thú y NGAY LẬP TỨC?

🚨 **KHẨN CẤP:**
- Khó thở nghiêm trọng
- Chảy máu không cầm được
- Co giật
- Ngã, chấn thương nặng
- Ngộ độc (ăn phải chất độc)
- Bụng phình to kèm đau đớn
- Nhiệt độ > 40°C hoặc < 37°C
- Không thể đứng/đi
- Miệng, lưỡi xanh tím

## Chuẩn bị khi đi khám

✅ **Mang theo:**
- Sổ tiêm chủng, bệnh án (nếu có)
- Danh sách thuốc đang dùng
- Mẫu phân/nước tiểu (nếu có vấn đề)
- Thức ăn/nước uống quen thuộc

✅ **Ghi chú:**
- Thời gian xuất hiện triệu chứng
- Các thay đổi bất thường
- Thói quen ăn uống, đi vệ sinh

## Phòng bệnh tốt hơn chữa bệnh

✅ **Khám định kỳ:** 6 tháng - 1 năm/lần
✅ **Tiêm phòng đầy đủ:** Theo lịch của bác sĩ
✅ **Tẩy giun:** 3-6 tháng/lần
✅ **Vệ sinh răng:** Đánh răng thường xuyên
✅ **Dinh dưỡng tốt:** Thức ăn chất lượng cao
✅ **Tập thể dục:** Vận động hàng ngày

## Kết luận

Hãy luôn quan sát thú cưng của bạn mỗi ngày. Bất kỳ thay đổi bất thường nào cũng có thể là dấu hiệu cảnh báo. Khi nghi ngờ, hãy liên hệ bác sĩ thú y ngay - "Phòng bệnh hơn chữa bệnh" luôn đúng!
      `,
        },
        {
            id: 3,
            slug: "meo-huan-luyen-thu-cung-hieu-qua",
            title: "Mẹo huấn luyện thú cưng hiệu quả",
            description:
                "Sử dụng phương pháp tích cực, nhất quán và kiên nhẫn. Tập huấn luyện trong khoảng thời gian ngắn nhưng thường xuyên mỗi ngày.",
            category: "Huấn luyện",
            icon: "🎾",
            author: "Huấn luyện viên Lê Văn C",
            date: "25/01/2024",
            readTime: "6 phút đọc",
            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
            fullContent: `
## Nguyên tắc vàng trong huấn luyện thú cưng

Huấn luyện không chỉ giúp thú cưng ngoan ngoãn mà còn tạo ra mối liên kết bền chặt giữa bạn và chúng. Dưới đây là những nguyên tắc cơ bản:

### 1. Tăng cường tích cực (Positive Reinforcement)

**Nguyên tắc:**
- Khen thưởng khi làm đúng
- Bỏ qua/chuyển hướng khi làm sai
- **KHÔNG trừng phạt thể xác**

**Phần thưởng hiệu quả:**
- 🍖 Snack/thức ăn yêu thích
- 🎾 Đồ chơi
- 👏 Khen ngợi bằng lời
- 🤗 Vuốt ve, âu yếm

### 2. Nhất quán (Consistency)

**Quan trọng:**
- Dùng cùng 1 từ lệnh
- Tất cả người trong nhà phải làm giống nhau
- Không thay đổi quy tắc theo tâm trạng

**Ví dụ:**
- ✅ Luôn nói "Ngồi" → Thưởng
- ❌ Hôm nay "Ngồi", mai "Sit", mốt "Ngồi xuống"

### 3. Thời gian ngắn, thường xuyên

**Lịch tập lý tưởng:**
- 5-10 phút/buổi
- 2-3 buổi/ngày
- Nghỉ giữa các buổi

**Lý do:**
- Thú cưng tập trung ngắn
- Tránh mệt mỏi, chán nản
- Dễ nhớ hơn

### 4. Kiên nhẫn & Tích cực

**Tâm thế đúng:**
- Không vội vàng
- Không nóng giận
- Vui vẻ, thoải mái

**Khi thất bại:**
- Phân tích lỗi ở đâu
- Chia nhỏ bài tập
- Thử lại ngày mai

## Các lệnh cơ bản nên dạy

### 1. NGỒI (Sit)

**Cách dạy:**
1. Cầm snack phía trên đầu thú cưng
2. Nói "Ngồi" + Di chuyển tay lên cao
3. Khi ngồi → Thưởng ngay
4. Lặp lại 5-10 lần/ngày

**Ứng dụng:**
- Trước khi cho ăn
- Trước khi ra ngoài
- Khi có khách đến

### 2. NẰM (Down)

**Cách dạy:**
1. Từ tư thế ngồi
2. Đưa snack xuống sàn
3. Nói "Nằm" + Dẫn snack xuống
4. Khi nằm → Thưởng ngay

**Ứng dụng:**
- Yêu cầu bình tĩnh
- Trong nhà hàng/quán cafe
- Khi có người lạ

### 3. Ở YÊN (Stay)

**Cách dạy:**
1. Cho ngồi/nằm
2. Nói "Ở yên" + Tay duỗi ra
3. Lùi 1 bước → Quay lại → Thưởng
4. Tăng dần khoảng cách & thời gian

**Ứng dụng:**
- Khi mở cửa
- Trong thang máy
- Khi chờ đợi

### 4. ĐẾN ĐÂY (Come)

**Cách dạy:**
1. Dùng dây dắt dài
2. Gọi tên + "Đến đây"
3. Kéo nhẹ dây + Khen
4. Khi đến → Thưởng to

**Ứng dụng:**
- Gọi về khi đi dạo
- Tình huống khẩn cấp
- Tăng tương tác

### 5. ĐI BÊN CẠNH (Heel)

**Cách dạy:**
1. Thú cưng ở bên trái
2. Nói "Đi" + Bắt đầu đi
3. Dừng khi kéo dây → Chờ chúng quay lại
4. Tiếp tục khi đi đúng → Thưởng

**Ứng dụng:**
- Đi dạo văn minh
- Qua đường an toàn
- Trong chỗ đông người

## Xử lý hành vi không mong muốn

### 1. Cắn, ngoặm

**Nguyên nhân:**
- Chơi đùa
- Đang mọc răng (chó con)
- Tò mò

**Giải pháp:**
✅ Cho đồ chơi nhai thay thế
✅ Kêu "Ouch!" + Dừng chơi
✅ Chuyển hướng sang hoạt động khác
❌ KHÔNG đánh

### 2. Sủa không ngừng

**Nguyên nhân:**
- Buồn chán
- Muốn thu hút sự chú ý
- Cảnh báo

**Giải pháp:**
✅ Dạy lệnh "Im lặng"
✅ Tập thể dục đủ
✅ Đồ chơi giải trí
❌ KHÔNG la hét lại

### 3. Nhảy lên người

**Nguyên nhân:**
- Vui mừng
- Muốn chào hỏi

**Giải pháp:**
✅ Quay lưng + Bỏ qua khi nhảy
✅ Chỉ chú ý khi 4 chân trên sàn
✅ Dạy "Ngồi" thay vì nhảy
❌ KHÔNG đẩy đi (coi như chơi)

### 4. Phá đồ trong nhà

**Nguyên nhân:**
- Buồn chán
- Thiếu vận động
- Lo âu khi ở nhà 1 mình

**Giải pháp:**
✅ Tập thể dục đầy đủ
✅ Đồ chơi giải trí
✅ Tập quen ở nhà 1 mình từ từ
✅ Chuồng/vùng an toàn
❌ KHÔNG phạt sau khi về nhà

## Lịch trình huấn luyện mẫu

### Tuần 1-2: Làm quen
- Tạo niềm tin
- Dạy tên
- Vui chơi

### Tuần 3-4: Lệnh cơ bản
- Ngồi
- Đến đây

### Tuần 5-6: Nâng cao
- Nằm
- Ở yên

### Tuần 7-8: Hoàn thiện
- Đi bên cạnh
- Kết hợp nhiều lệnh

### Suốt đời: Luyện tập
- Ôn lại hàng ngày
- Thử thách mới
- Duy trì kỹ năng

## Sai lầm thường gặp

❌ **Thiếu kiên nhẫn:** Bỏ cuộc quá sớm
❌ **Không nhất quán:** Đổi luật liên tục
❌ **Kỳ vọng quá cao:** Mong chúng học nhanh như người
❌ **Trừng phạt:** Đánh, la hét → Sợ hãi
❌ **Quá nhiều lệnh cùng lúc:** Gây confusion
❌ **Tập khi đói/mệt:** Hiệu quả kém

## Khi nào cần huấn luyện viên chuyên nghiệp?

✅ **Nên thuê khi:**
- Hành vi hung dữ
- Không tiến bộ sau 2-3 tháng
- Vấn đề nghiêm trọng (cắn người, sợ hãi quá mức)
- Giống đặc biệt (chó nghiệp vụ, chó săn)

## Kết luận

Huấn luyện là một hành trình, không phải đích đến. Hãy kiên nhẫn, vui vẻ và tích cực. Mỗi thú cưng là một cá thể riêng biệt với tốc độ học khác nhau. Điều quan trọng nhất là tạo ra mối quan hệ tin tưởng và yêu thương giữa bạn và thú cưng!

**Chúc bạn huấn luyện thành công! 🐾**
      `,
        },
        {
            id: 4,
            slug: "cach-cham-soc-long-thu-cung",
            title: "Cách chăm sóc lông thú cưng",
            description:
                "Bí quyết giữ lông chó mèo luôn sáng bóng và khỏe mạnh qua việc tắm rửa và chải lông định kỳ.",
            category: "Chăm sóc",
            icon: "✨",
            author: "Chuyên gia grooming Phạm Thị D",
            date: "14/10/2024",
            readTime: "8 phút đọc",
            image: "https://cdn.shopify.com/s/files/1/0624/1746/9697/files/m3_f1d68c02-9051-4239-8af3-16ee0a6e7022_600x600.jpg?v=1684988884",
            fullContent: `
## Tại sao chăm sóc lông quan trọng?

Bộ lông không chỉ là vẻ đẹp bên ngoài mà còn phản ánh sức khỏe tổng thể của thú cưng. Một bộ lông khỏe mạnh sẽ:

- **Bảo vệ da khỏi tác động môi trường**: Chống nắng, chống lạnh, chống vi khuẩn
- **Điều hòa nhiệt độ cơ thể**: Giữ ấm mùa đông, thoáng mát mùa hè
- **Phản ánh sức khỏe**: Lông bóng mượt = cơ thể khỏe mạnh
- **Tăng sự gắn kết**: Thời gian chăm sóc là thời gian tương tác quý giá

## Các loại lông phổ biến

### 1. Lông ngắn (Short coat)

**Đặc điểm:**
- Dài < 3cm
- Gần sát da
- Ít rối, ít rụng

**Giống phổ biến:**
- Chó: Pug, Pitbull, Doberman, Beagle
- Mèo: Mèo Anh lông ngắn, Mèo Xiêm

**Chăm sóc:**
- Chải: 1-2 lần/tuần
- Tắm: 4-6 tuần/lần
- Dụng cụ: Găng tay cao su, lược răng ngắn

### 2. Lông dài (Long coat)

**Đặc điểm:**
- Dài > 5cm
- Mềm mại, mượt
- Dễ rối, dễ bám bụi

**Giống phổ biến:**
- Chó: Golden Retriever, Shih Tzu, Yorkshire Terrier
- Mèo: Mèo Ba Tư, Mèo Ragdoll, Maine Coon

**Chăm sóc:**
- Chải: Hàng ngày
- Tắm: 2-3 tuần/lần
- Dụng cụ: Lược kim loại, bàn chải lông mềm, lược gỡ rối

### 3. Lông xoăn/sóng (Curly coat)

**Đặc điểm:**
- Xoăn, quăn
- Không rụng nhiều
- Cần cắt tỉa thường xuyên

**Giống phổ biến:**
- Chó: Poodle, Bichon Frise, Poodle lai

**Chăm sóc:**
- Chải: 2-3 lần/tuần
- Tắm: 3-4 tuần/lần + cắt tỉa
- Dụng cụ: Lược kim loại, kéo cắt tỉa

### 4. Lông kép (Double coat)

**Đặc điểm:**
- 2 lớp: Lông mượt bên ngoài + Lông tơ bên trong
- Rụng nhiều theo mùa

**Giống phổ biến:**
- Chó: Husky, Corgi, Samoyed, Akita
- Mèo: Mèo Anh lông dài

**Chăm sóc:**
- Chải: Hàng ngày (đặc biệt mùa rụng lông)
- Tắm: 6-8 tuần/lần
- Dụng cụ: Lược gỡ lông tơ (undercoat rake), máy thổi

## Hướng dẫn tắm rửa đúng cách

### Chuẩn bị:

✅ Dầu gội chuyên dụng cho chó/mèo (pH phù hợp)
✅ Dầu xả (nếu cần)
✅ Khăn thấm nước
✅ Máy sấy (điều chỉnh nhiệt độ vừa phải)
✅ Lược, bàn chải
✅ Bông nút tai (tránh nước vào tai)

### Quy trình tắm:

**Bước 1: Chải lông trước khi tắm**
- Gỡ rối, loại bỏ lông chết
- Lông rối khi ướt sẽ khó gỡ hơn

**Bước 2: Làm ướt lông**
- Dùng nước ấm (38-39°C)
- Tránh nước vào mắt, tai, mũi
- Ướt đều từ cổ xuống đuôi

**Bước 3: Bôi dầu gội**
- Lượng vừa đủ
- Xoa đều khắp cơ thể
- Mát-xa nhẹ nhàng
- **Tránh vùng mặt, mắt**

**Bước 4: Rửa sạch**
- Rửa kỹ, không để dư dầu gội
- Dầu gội tồn đọng → ngứa, kích ứng da

**Bước 5: Dầu xả (nếu cần)**
- Chỉ dùng cho lông dài
- Bôi từ giữa thân xuống đuôi
- Tránh vùng rễ lông (dễ bết)
- Để 2-3 phút → Rửa sạch

**Bước 6: Sấy khô**
- Thấm khô bằng khăn
- Sấy từ thấp đến cao
- Nhiệt độ ấm, không nóng
- Chải đồng thời khi sấy
- **Phải sấy khô hoàn toàn** (tránh nấm, mùi hôi)

### Tần suất tắm:

| Loại lông | Tần suất | Lưu ý |
|-----------|----------|-------|
| Lông ngắn | 4-6 tuần | Không tắm quá nhiều |
| Lông dài | 2-3 tuần | Chải trước khi tắm |
| Lông xoăn | 3-4 tuần | Kết hợp cắt tỉa |
| Lông kép | 6-8 tuần | Tắm nhiều → mất lông tơ |

⚠️ **Lưu ý:** Tắm quá nhiều sẽ làm mất dầu tự nhiên, da khô, ngứa

## Kỹ thuật chải lông đúng cách

### Lợi ích của việc chải lông:

✅ Loại bỏ lông chết, tránh búi lông
✅ Phân phối dầu tự nhiên → Lông bóng
✅ Kích thích tuần hoàn máu
✅ Phát hiện sớm vấn đề da (mụn, ve, bọ chét)
✅ Tăng gắn kết với thú cưng

### Dụng cụ chải lông:

**1. Lược răng thưa (Wide-tooth comb)**
- Dùng cho: Gỡ rối ban đầu
- Phù hợp: Lông dài, lông xoăn

**2. Lược răng mịn (Fine-tooth comb)**
- Dùng cho: Chải kỹ, loại bỏ rận
- Phù hợp: Mọi loại lông

**3. Bàn chải lông mềm (Bristle brush)**
- Dùng cho: Phủ bóng, massage
- Phù hợp: Lông ngắn, lông mượt

**4. Lược kim loại (Slicker brush)**
- Dùng cho: Loại lông chết, gỡ rối
- Phù hợp: Lông dài, lông xoăn

**5. Lược gỡ lông tơ (Undercoat rake)**
- Dùng cho: Loại lông tơ thừa
- Phù hợp: Lông kép

**6. Găng tay cao su (Grooming glove)**
- Dùng cho: Massage + loại lông chết
- Phù hợp: Lông ngắn

### Quy trình chải lông:

**Bước 1: Gỡ rối**
- Dùng lược răng thưa
- Chải từ đuôi lông lên gốc
- Nhẹ nhàng, không giật mạnh

**Bước 2: Loại lông chết**
- Dùng lược kim loại hoặc lược gỡ lông tơ
- Chải theo chiều lông
- Chú ý vùng bụng, nách, sau tai

**Bước 3: Chải mịn**
- Dùng lược răng mịn
- Chải đều khắp cơ thể

**Bước 4: Phủ bóng**
- Dùng bàn chải lông mềm
- Chải theo chiều lông
- Phân phối dầu tự nhiên

## Dinh dưỡng cho lông khỏe mạnh

### Các chất cần thiết:

**1. Protein (20-30%)**
- Nguồn: Thịt gà, cá, trứng
- Vai trò: Cấu trúc lông

**2. Omega-3 & Omega-6**
- Nguồn: Dầu cá hồi, hạt lanh
- Vai trò: Lông bóng, da khỏe

**3. Vitamin A**
- Nguồn: Gan, cà rốt
- Vai trò: Sản xuất bã nhờn

**4. Vitamin E**
- Nguồn: Hạt, dầu thực vật
- Vai trò: Chống oxy hóa

**5. Biotin (Vitamin B7)**
- Nguồn: Lòng đỏ trứng, gan
- Vai trò: Tăng trưởng lông

**6. Kẽm**
- Nguồn: Thịt đỏ, hải sản
- Vai trò: Phục hồi da

## Vấn đề thường gặp & Giải pháp

### 1. Lông khô, xơ, mất bóng

**Nguyên nhân:**
- Thiếu dinh dưỡng
- Tắm quá nhiều
- Dầu gội không phù hợp

**Giải pháp:**
✅ Bổ sung Omega-3
✅ Giảm tần suất tắm
✅ Dùng dầu xả
✅ Tránh nắng quá nhiều

### 2. Rụng lông quá mức

**Nguyên nhân:**
- Rụng lông theo mùa (bình thường)
- Stress
- Dị ứng
- Ký sinh trùng

**Giải pháp:**
✅ Chải thường xuyên
✅ Dinh dưỡng đầy đủ
✅ Kiểm tra bác sĩ nếu rụng bất thường

### 3. Lông rối, búi

**Nguyên nhân:**
- Không chải thường xuyên
- Lông dài không cắt tỉa

**Giải pháp:**
✅ Chải hàng ngày
✅ Dùng spray gỡ rối
✅ Cắt tỉa định kỳ
✅ Tắm + sấy đúng cách

### 4. Da khô, gàu

**Nguyên nhân:**
- Tắm quá nhiều
- Thiếu độ ẩm
- Dị ứng thức ăn

**Giải pháp:**
✅ Giảm tần suất tắm
✅ Dầu gội trị gàu
✅ Bổ sung Omega-3
✅ Máy tạo ẩm

### 5. Bọ chét, ve

**Dấu hiệu:**
- Ngứa, gãi liên tục
- Điểm đen trên da (phân bọ chét)
- Nốt sần (ve)

**Giải pháp:**
✅ Thuốc trị bọ chét/ve (Frontline, Bravecto)
✅ Tắm bằng dầu gội trị bọ chét
✅ Giặt đồ dùng, vệ sinh nhà cửa
✅ Dùng thuốc phòng ngừa hàng tháng

## Dịch vụ Grooming chuyên nghiệp

### Khi nào nên đến grooming?

✅ Lông quá dài, cần cắt tỉa
✅ Lông rối búi nghiêm trọng
✅ Giống cần tạo kiểu (Poodle, Shih Tzu)
✅ Bận rộn, không có thời gian
✅ Thú cưng không hợp tác khi tắm tại nhà

### Dịch vụ thường có:

- Tắm + Sấy
- Chải lông, gỡ rối
- Cắt tỉa lông
- Vệ sinh tai
- Cắt móng
- Nặn tuyến hôi (chó)
- Tạo kiểu (styling)

### Lưu ý khi chọn grooming:

✅ Cơ sở uy tín, sạch sẽ
✅ Nhân viên có kinh nghiệm
✅ Dụng cụ sạch sẽ, vô trùng
✅ Nhẹ nhàng với thú cưng
✅ Giá cả hợp lý

## Lịch chăm sóc lông hàng tuần

| Hoạt động | Tần suất |
|-----------|----------|
| Chải lông | Hàng ngày (lông dài), 1-2 lần/tuần (lông ngắn) |
| Kiểm tra da, lông | Hàng ngày khi chải |
| Tắm | 2-8 tuần (tùy loại lông) |
| Cắt móng | 2-4 tuần |
| Vệ sinh tai | 1-2 tuần |
| Cắt tỉa lông | 6-8 tuần |
| Bổ sung Omega-3 | Hàng ngày (theo hướng dẫn) |

## Kết luận

Chăm sóc lông không chỉ giúp thú cưng đẹp hơn mà còn phát hiện sớm vấn đề sức khỏe. Hãy dành thời gian mỗi ngày để chải lông, vừa chăm sóc vừa tăng cường tình cảm. Một bộ lông khỏe mạnh bắt đầu từ bên trong - dinh dưỡng đầy đủ kết hợp chăm sóc bên ngoài đúng cách!

**Chúc thú cưng của bạn luôn có bộ lông bóng mượt! ✨**
      `,
        },
        {
            id: 5,
            slug: "van-dong-va-tap-the-duc-cho-thu-cung",
            title: "Vận động và tập thể dục cho thú cưng",
            description:
                "Lượng vận động cần thiết hàng ngày để thú cưng khỏe mạnh, tránh béo phì và các vấn đề hành vi.",
            category: "Sức khỏe",
            icon: "⚽",
            author: "Bác sĩ Hoàng Minh E",
            date: "10/10/2024",
            readTime: "7 phút đọc",
            image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800",
            fullContent: `
## Tại sao vận động quan trọng?

Vận động không chỉ giữ cho thú cưng có thân hình cân đối mà còn ảnh hưởng toàn diện đến sức khỏe thể chất và tinh thần:

### Lợi ích về thể chất:

✅ **Kiểm soát cân nặng**: Đốt cháy calories, tránh béo phì
✅ **Cơ bắp khỏe mạnh**: Tăng cường sức mạnh, sức bền
✅ **Xương khớp linh hoạt**: Giảm nguy cơ viêm khớp
✅ **Tim mạch khỏe**: Cải thiện tuần hoàn máu
✅ **Tiêu hóa tốt**: Kích thích nhu động ruột
✅ **Hệ miễn dịch mạnh**: Chống bệnh hiệu quả hơn

### Lợi ích về tinh thần:

✅ **Giảm stress, lo âu**: Giải phóng năng lượng dư thừa
✅ **Ngủ ngon hơn**: Mệt mỏi tích cực
✅ **Giảm hành vi phá hoại**: Không còn năng lượng để phá đồ
✅ **Tăng sự tự tin**: Khám phá môi trường xung quanh
✅ **Gắn kết với chủ**: Thời gian chất lượng cùng nhau

## Nhu cầu vận động theo giống

### Chó năng lượng cao (2-3 giờ/ngày)

**Giống:**
- Chó chăn cừu: Border Collie, Australian Shepherd
- Chó săn: Beagle, Pointer, Weimaraner
- Chó kéo xe: Husky, Malamute
- Chó thể thao: Labrador, Golden Retriever, Dalmatian

**Hoạt động phù hợp:**
- Chạy bộ đường dài
- Bơi lội
- Agility (vượt chướng ngại vật)
- Frisbee, bóng
- Đi bộ đường dài (hiking)

### Chó năng lượng trung bình (1-2 giờ/ngày)

**Giống:**
- Chó săn cỡ trung: Cocker Spaniel, Springer Spaniel
- Chó chăn: Corgi, Shetland Sheepdog
- Chó gia đình: Poodle, Schnauzer
- Chó săn nhỏ: Dachshund, Terrier

**Hoạt động phù hợp:**
- Đi bộ nhanh
- Chơi đuổi bắt
- Bơi nhẹ
- Đồ chơi tương tác

### Chó năng lượng thấp (30 phút - 1 giờ/ngày)

**Giống:**
- Chó cảnh: Shih Tzu, Pug, Pekingese
- Chó lớn nhưng lười: Bulldog, Mastiff, Saint Bernard
- Chó già (trên 10 tuổi)

**Hoạt động phù hợp:**
- Đi bộ chậm
- Chơi trong nhà
- Bơi nhẹ (tốt cho khớp)
- Tránh vận động quá mức

### Mèo (15-30 phút/ngày, nhiều lần ngắn)

**Đặc điểm:**
- Vận động theo kiểu burst (ngắn, mạnh)
- Thích săn mồi giả
- Nghỉ nhiều giữa các lần chơi

**Hoạt động phù hợp:**
- Đồ chơi cần câu (feather wand)
- Chuột đồ chơi
- Laser pointer (nhưng cho vật thật ở cuối)
- Trèo cây cào móng (cat tree)
- Túi catnip

## Các hoạt động vận động hiệu quả

### 1. Đi bộ (Walking)

**Lợi ích:**
- Vận động cơ bản nhất
- Khám phá môi trường
- Tương tác xã hội
- Phù hợp mọi lứa tuổi

**Hướng dẫn:**
- Sáng sớm hoặc chiều mát
- Dây dắt đủ dài (1.5-2m)
- Cho ngửi, khám phá
- Thay đổi tuyến đường
- **Chó con:** 5 phút x số tháng tuổi (vd: 3 tháng tuổi = 15 phút, 2 lần/ngày)

### 2. Chạy bộ (Running/Jogging)

**Phù hợp:**
- Chó trưởng thành, khỏe mạnh
- Giống năng lượng cao
- Thời tiết mát mẻ

**Lưu ý:**
❌ KHÔNG chạy khi:
- Chó dưới 1 tuổi (xương chưa phát triển đủ)
- Giống mõm ngắn (Pug, Bulldog) - khó thở
- Thời tiết nóng (>28°C) - nguy cơ say nắng
- Ngay sau khi ăn (nguy cơ xoắn dạ dày)

**An toàn:**
- Khởi động: đi bộ 5-10 phút
- Tăng dần cường độ
- Mang nước uống
- Nghỉ thường xuyên
- Kiểm tra bàn chân sau khi chạy

### 3. Bơi lội (Swimming)

**Lợi ích:**
- Tốt cho khớp (không tác động)
- Tập toàn thân
- Làm mát cơ thể
- Phù hợp chó già, chó có vấn đề khớp

**Giống thích bơi:**
- Labrador, Golden Retriever
- Poodle
- Newfoundland
- Portuguese Water Dog

**An toàn:**
✅ Áo phao (nếu mới học)
✅ Giám sát liên tục
✅ Nước sạch (tránh nước mặn, nước có hóa chất)
✅ Rửa sạch sau khi bơi
✅ Sấy khô kỹ

### 4. Chơi bóng/Frisbee (Fetch)

**Lợi ích:**
- Tập chạy nước rút
- Kích thích bản năng săn mồi
- Huấn luyện vâng lời

**Lưu ý:**
- Khởi động trước
- Nghỉ giữa mỗi lần ném
- Tránh nhảy quá cao (tổn thương khớp)
- Dừng khi mệt

### 5. Agility (Vượt chướng ngại vật)

**Lợi ích:**
- Tập cơ, khớp, phản xạ
- Kích thích trí não
- Tăng sự tự tin
- Gắn kết với chủ

**Thiết bị:**
- Đường hầm
- Cột zigzag
- Vòng nhảy
- Cầu thăng bằng

**Phù hợp:**
- Chó trưởng thành
- Tất cả kích cỡ (điều chỉnh độ cao)
- Đã học lệnh cơ bản

### 6. Tug-of-War (Kéo co)

**Lợi ích:**
- Tập cơ hàm, cổ, vai
- Thoát năng lượng
- Vui vẻ, tương tác

**Quy tắc:**
- Bắt đầu và kết thúc theo lệnh
- Cho chó thắng đôi khi
- Không giật mạnh (tổn thương cổ)
- Dừng nếu chó quá hưng phấn

### 7. Trò chơi trí tuệ (Mental Exercise)

**Quan trọng như vận động thể chất:**
- Tìm snack giấu kín
- Đồ chơi puzzle (lấy thức ăn)
- Dạy lệnh mới
- Trò chơi đánh hơi

**Lợi ích:**
- Tiêu hao năng lượng tinh thần
- Giảm chán nản
- Tăng trí thông minh
- **10 phút trí tuệ = 30 phút thể chất**

## Lịch tập luyện mẫu

### Chó năng lượng cao:

**Sáng:**
- 6:00 - 7:00: Đi bộ/Chạy bộ (45-60 phút)
- 7:30: Chơi bóng/Frisbee (15 phút)

**Trưa:**
- Đồ chơi puzzle khi ở nhà một mình

**Chiều:**
- 17:00 - 18:00: Đi bộ/Bơi lội (60 phút)
- 18:30: Huấn luyện/Agility (20 phút)

**Tối:**
- 20:00: Chơi kéo co/Tìm snack (15 phút)

### Chó năng lượng trung bình:

**Sáng:**
- 6:30 - 7:15: Đi bộ (30-45 phút)

**Chiều:**
- 17:00 - 17:45: Đi bộ/Chơi bóng (45 phút)

**Tối:**
- 20:00: Chơi trong nhà (15 phút)

### Mèo:

**Sáng:**
- 7:00: Chơi cần câu (10 phút)

**Trưa:**
- Tự chơi với đồ chơi

**Chiều:**
- 17:00: Laser pointer (10 phút)

**Tối:**
- 20:00: Chơi chuột đồ chơi (10 phút)

## Dấu hiệu vận động quá mức

⚠️ **Dừng ngay nếu thấy:**
- Hổn hển quá mức, khó thở
- Lưỡi xanh/tím
- Không theo kịp, liên tục ngồi xuống
- Khập khiễng
- Nôn, tiêu chảy
- Chóng mặt, loạng choạng

🚨 **Cấp cứu nếu:**
- Say nắng (nhiệt độ cơ thể > 40°C)
- Sốc nhiệt
- Co giật

## Vận động theo độ tuổi

### Chó con (2-12 tháng):

**Đặc điểm:**
- Xương chưa phát triển đầy đủ
- Năng lượng cao nhưng mệt nhanh

**Hướng dẫn:**
- Công thức: 5 phút x số tháng tuổi, 2 lần/ngày
  - VD: 4 tháng → 20 phút x 2 = 40 phút/ngày
- Chơi nhẹ, tránh nhảy cao
- KHÔNG chạy bộ đường dài
- KHÔNG leo cầu thang nhiều
- Nhiều lần ngắn hơn ít lần dài

### Chó trưởng thành (1-7 tuổi):

**Đặc điểm:**
- Đã phát triển đầy đủ
- Thể lực tốt nhất

**Hướng dẫn:**
- Tùy giống (30 phút - 3 giờ)
- Đa dạng hoạt động
- Thử thách mới
- Huấn luyện nâng cao

### Chó già (trên 7 tuổi):

**Đặc điểm:**
- Giảm thể lực
- Có thể có viêm khớp
- Dễ mệt

**Hướng dẫn:**
- Giảm cường độ, tăng thời gian
- Đi bộ chậm, đều đặn
- Bơi lội (tốt cho khớp)
- Tránh địa hình hiểm trở
- Nghỉ ngơi nhiều hơn
- Theo dõi dấu hiệu đau

## Vận động theo thời tiết

### Trời nóng (> 28°C):

⚠️ **Nguy hiểm:**
- Giống mõm ngắn
- Lông dày
- Chó béo, già

**An toàn:**
- Tập sáng sớm (trước 8h) hoặc tối mát (sau 18h)
- Tránh nhựa đường nóng (kiểm tra bằng tay)
- Mang nước, nghỉ bóng mát
- Áo làm mát, khăn ướt
- Giảm cường độ

### Trời lạnh (< 10°C):

⚠️ **Nguy hiểm:**
- Giống lông ngắn
- Giống nhỏ
- Chó già, bệnh

**An toàn:**
- Áo ấm
- Giữa trưa (ấm nhất)
- Kiểm tra bàn chân (muối đường, băng tuyết)
- Giảm thời gian
- Vận động trong nhà

### Trời mưa:

**Lưu ý:**
- Áo mưa
- Rửa sạch sau khi về
- Sấy khô kỹ
- Vận động trong nhà nếu mưa to

## Vận động trong nhà

### Khi không thể ra ngoài:

**Hoạt động:**
- Chơi bóng nhẹ (bóng mềm)
- Kéo co
- Tìm snack giấu kín
- Dạy lệnh mới
- Chạy lên xuống cầu thang (chó trưởng thành)
- Đồ chơi puzzle
- Treadmill (chó đã quen)

**Mèo:**
- Đồ chơi cần câu
- Laser pointer
- Cây cào móng có nhiều tầng
- Đồ chơi tương tác

## Kết luận

Vận động là chìa khóa của một thú cưng khỏe mạnh, hạnh phúc. Hãy hiểu nhu cầu của giống và độ tuổi để tạo lịch tập phù hợp. Nhớ rằng chất lượng quan trọng hơn số lượng - 30 phút tương tác chất lượng cao hơn 2 giờ đi bộ nhàm chán!

**Lợi ích lớn nhất:** Thời gian vận động cùng thú cưng là thời gian gắn kết, tạo kỷ niệm đẹp, và giữ cả hai bạn khỏe mạnh!

**Hãy vận động cùng nhau mỗi ngày! ⚽🐾**
      `,
        },
    ];

    const blog = blogPosts.find((b) => b.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Không tìm thấy bài viết
                    </h1>
                    <button
                        onClick={() => navigate("/blog")}
                        className="text-orange-600 hover:text-orange-700"
                    >
                        ← Quay lại danh sách blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Image */}
                <div
                    className="h-96 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${blog.image})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white max-w-4xl px-4">
                            <span className="inline-block px-4 py-1 bg-orange-500 text-white rounded-full text-sm font-medium mb-4">
                                {blog.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {blog.title}
                            </h1>
                            <p className="text-lg text-gray-200">{blog.description}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/blog")}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Quay lại</span>
                    </button>

                    {/* Meta Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-orange-600" />
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-600" />
                                <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span>{blog.readTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-orange-600" />
                                <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
                                    {blog.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Blog Content */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                        <div
                            className="prose prose-lg max-w-none
                prose-headings:text-gray-900 
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                prose-li:text-gray-700 prose-li:mb-2
                prose-strong:text-gray-900 prose-strong:font-semibold"
                        >
                            {blog.fullContent.split("\n").map((line, index) => {
                                // H2 Headers
                                if (line.startsWith("## ")) {
                                    return (
                                        <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                                            {line.replace("## ", "")}
                                        </h2>
                                    );
                                }
                                // H3 Headers
                                if (line.startsWith("### ")) {
                                    return (
                                        <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                                            {line.replace("### ", "")}
                                        </h3>
                                    );
                                }
                                // Bullet points
                                if (line.startsWith("- ")) {
                                    return (
                                        <li key={index} className="ml-6 text-gray-700">
                                            {line.replace("- ", "")}
                                        </li>
                                    );
                                }
                                // Bold text with **
                                if (line.includes("**")) {
                                    const parts = line.split("**");
                                    return (
                                        <p key={index} className="mb-4">
                                            {parts.map((part, i) =>
                                                i % 2 === 1 ? (
                                                    <strong key={i} className="font-semibold text-gray-900">
                                                        {part}
                                                    </strong>
                                                ) : (
                                                    <span key={i}>{part}</span>
                                                )
                                            )}
                                        </p>
                                    );
                                }
                                // Regular paragraphs
                                if (line.trim()) {
                                    return (
                                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                                            {line}
                                        </p>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogDetail;
