import React, { useEffect, useState } from 'react'
import { CollectionCard } from '../../../components/CollectionCard'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getAllMovie } from '@/api/movie'
import { MOVIE } from '@/utils/constant'
import HashLoader from 'react-spinners/HashLoader'
// import { MOVIES } from '../../../apis/mock-data'
export const MOVIES = [
  {
    title: 'WONKA',
    link: 'https://www.bhdstar.vn/phim/wonka/',
    Mota: 'Dựa trên nhân vật từ quyển sách gối đầu giường của các em nhỏ trên toàn thế giới "Charlie và Nhà Máy Sôcôla" và phiên bản phim điện ảnh cùng tên vào năm 2005, WONKA kể câu chuyện kỳ diệu về hành trình của nhà phát minh, ảo thuật gia và nhà sản xuất sôcôla',
    phan_loai:
      'Phim được phổ biến đến người xem dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-441.jpg',
    tac_gia: 'Đạo diễn: Paul King',
    dien_vien: 'Diễn viên: Timothée Chalamet, Olivia Colman',
    the_loai: 'Thể loại: Adventure',
    khoi_chieu: 'Khởi chiếu: 08/12/2023',
    thoi_luong: 'Thời lượng: 116 phút'
  },
  {
    title: 'THE VERGE OF DEATH',
    link: 'https://www.bhdstar.vn/phim/the-verge-of-death/',
    Mota: 'Nadia – cô gái còn sống sót duy nhất trong một gia đình có số phận bi thảm phải vật lộn với mối đe dọa tiềm ẩn và đối mặt với cuộc sống bên bờ vực thẳm bởi hậu quả của những nghi lễ hiến tế trước đây của cha mình.',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp.jpg',
    tac_gia: 'Đạo diễn: Azhar Kinoi Lubis',
    dien_vien: 'Diễn viên: Wafda Saifan Lubis, Taskya Namya',
    the_loai: 'Thể loại: Horror',
    khoi_chieu: 'Khởi chiếu: 09/12/2023',
    thoi_luong: 'Thời lượng: 97 phút'
  },
  {
    title: 'THE BOY AND THE HERON',
    link: 'https://www.bhdstar.vn/phim/the-boy-and-the-heron/',
    Mota: 'Xoay quanh bước ngoặt cuộc sống của một cậu bé Mahito khi người mẹ của mình không may qua đời trong vụ hỏa hoạn. Cậu cùng một chú chim diệc biết nói trải qua một cuộc phiêu lưu để có thể thực hiện mong muốn duy nhất – gặp lại mẹ yêu dấu.',
    phan_loai: 'Phim phổ biến đến người xem từ 13 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2023/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700-22.jpg',
    tac_gia: 'Đạo diễn: Hayao Miyazaki',
    dien_vien: 'Diễn viên: Soma Santoki, Masaki Suda',
    the_loai: 'Thể loại: Animation',
    khoi_chieu: 'Khởi chiếu: 15/12/2023',
    thoi_luong: 'Thời lượng: 124 phút'
  },
  {
    title: 'TABOO – ĐIỀU CẤM KỴ KINH HOÀNG',
    link: 'https://www.bhdstar.vn/phim/taboo-dieu-cam-ky-kinh-hoang/',
    Mota: 'Bà Cốc đón hai cháu từ thành thị về chơi, 2 đứa trẻ rất tinh nghịch nhưng chưa hề biết về một vùng quê yên ả nhưng vẫn ẩn sâu những mối nguy hiểm cần tránh xa. Bà Cốc kể cho chúng nghe về những truyền thuyết , nhưng liệu đó có phải chỉ là truyền thuyết ?',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2023/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700-24.jpg',
    tac_gia: 'Đạo diễn: Vũ Thành',
    dien_vien: 'Diễn viên: Phạm Tất Thành, Ann Nguyễn',
    the_loai: 'Thể loại: Horror',
    khoi_chieu: 'Khởi chiếu: 15/12/2023',
    thoi_luong: 'Thời lượng: 90 phút'
  },
  {
    title: 'KE AN HON',
    link: 'https://www.bhdstar.vn/phim/ke-an-hon/',
    Mota: 'Hàng loạt cái chết bí ẩn tại một ngôi làng nơi tồn tại ma thuật tà ác cổ xưa: 5 mạng sống đổi lấy một chai Rượu Sọ Người. Bộ phim đưa người xem quay ngược thời gian khám phá những cái chết rùng rợn và sự hiện diện của các thế lực đen tối đang hoành hành.',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-12.png',
    tac_gia: 'Đạo diễn: Trần Hữu Tấn',
    dien_vien: 'Diễn viên: Hoàng Hà, NSUT Chiều Xuân, Võ Điền Gia Huy',
    the_loai: 'Thể loại: Horror',
    khoi_chieu: 'Khởi chiếu: 15/12/2023',
    thoi_luong: 'Thời lượng: 109 phút'
  },
  {
    title: 'AQUAMAN AND THE LOST KINGDOM',
    link: 'https://www.bhdstar.vn/phim/aquaman-and-the-lost-kingdom/',
    Mota: 'Sau khi thất bại dưới tay Aquaman, Black Manta sử dụng sức mạnh của Cây đinh ba đen huyền thoại để giải phóng thế lực cổ xưa độc ác. Aquaman phải liên minh với anh trai mình, Orm, cựu vương của Atlantis để bảo vệ vương quốc và thế giới khỏi sự hủy diệt…',
    phan_loai: 'Phim phổ biến đến người xem từ 13 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-497.jpg',
    tac_gia: 'Đạo diễn: James Wan',
    dien_vien: 'Diễn viên: Jason Momoa, Patrick Wilson, Ben Affleck',
    the_loai: 'Thể loại: Action',
    khoi_chieu: 'Khởi chiếu: 20/12/2023',
    thoi_luong: 'Thời lượng: 125 phút'
  },
  {
    title: 'QUY CAU',
    link: 'https://www.bhdstar.vn/phim/quy-cau/',
    Mota: 'Nam về quê để lo đám tang cho bố trong khi phải che giấu bạn gái đang mang thai. Sau đó, Nam mơ thấy gia đình bị giết, và Mít – con chó trắng của mình có biểu hiện kì lạ. Anh nghi ngờ lò mổ chó của gia đình và quyết tâm giải quyết những chuyện kỳ lạ…',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-525.jpg',
    tac_gia: 'Đạo diễn: Lưu Thành Luân',
    dien_vien: 'Diễn viên: Quang Tuấn, NSND Kim Xuân, Nam Thư',
    the_loai: 'Thể loại: Horror',
    khoi_chieu: 'Khởi chiếu: 29/12/2023',
    thoi_luong: 'Thời lượng: 99 phút'
  },
  {
    title: 'TEE YOD',
    link: 'https://www.bhdstar.vn/phim/tee-yod/',
    Mota: 'Lấy cảm hứng dựa trên 1 câu chuyện có thật vào năm 1972, 1 cô gái trẻ ở 1 ngôi làng hẻo lánh bỗng dưng qua đời 1 cách bí ẩn Khi nghe thấy một giọng nói dựng tóc gáy "Tee Yod…" vang lên trong đêm. 50 năm sau, tiếng gọi "Tee Yod "bỗng lần nữa vang lên .',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-524.jpg',
    tac_gia: 'Đạo diễn: Taweewat Wantha',
    dien_vien: 'Diễn viên: Nadech Kugimiya, Desnise Jelilcha Kapaun',
    the_loai: 'Thể loại: Horror',
    khoi_chieu: 'Khởi chiếu: 29/12/2023',
    thoi_luong: 'Thời lượng: 119 phút'
  },
  {
    title: 'MIGRATION',
    link: 'https://www.bhdstar.vn/phim/migration-2/',
    Mota: 'Cùng theo chân một gia đình vịt trời gồm vịt bố, vịt mẹ, cậu con trai Dax và vịt út Gwen, trong lần đầu tiên trải nghiệm chuyến di cư tiến về phía nam để trú đông. Với khung cảnh rực rỡ sắc trời thu tại một chiếc ao ở New England…',
    phan_loai: 'Phim phổ biến với mọi độ tuổi',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-410.jpg',
    tac_gia: 'Đạo diễn: Benjamin Renner',
    dien_vien: 'Diễn viên: Elizabeth Banks, Carol Kane',
    the_loai: 'Thể loại: Animation',
    khoi_chieu: 'Khởi chiếu: 29/12/2023',
    thoi_luong: 'Thời lượng: 93 phút'
  },
  {
    title: 'TRÊN BÀN NHẬU, DƯỚI BÀN MƯU',
    link: 'https://www.bhdstar.vn/phim/tren-ban-nhau-duoi-ban-muu/',
    Mota: 'Một phi vụ trả đũa đầy hài hước ,đầy bất ngờ, cùng đề tài " văn hóa trên bàn nhậu" của giới trẻ hiện nay, lần đầu được khai thác trên màn ảnh…',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-513.jpg',
    tac_gia: 'Đạo diễn: Tien M Nguyen',
    dien_vien: 'Diễn viên: Thúy Ngân, Khả Như, Diệu Nhi',
    the_loai: 'Thể loại: Comedy',
    khoi_chieu: 'Khởi chiếu: 29/12/2023',
    thoi_luong: 'Thời lượng: 116 phút'
  },
  {
    title: 'SCARYGIRL',
    link: 'https://www.bhdstar.vn/phim/scarygirl/',
    Mota: 'Khi thế giới bị đe dọa bởi sự biến mất của ánh sáng mặt trời, một cô gái trẻ phải vượt qua nỗi sợ hãi của mình và đi đến thành phố tưởng tượng để cứu cha mình khỏi tay một nhà khoa học bí ẩn và ngăn chặn hành tinh của cô bị hủy diệt.',
    phan_loai: 'Phim phổ biến với mọi độ tuổi',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-21.jpg',
    tac_gia: 'Đạo diễn: Ricard Cussó, Tania Vincent',
    dien_vien: 'Diễn viên: Sam Neill, Anna Torv',
    the_loai: 'Thể loại: Animation',
    khoi_chieu: 'Khởi chiếu: 05/01/2024',
    thoi_luong: 'Thời lượng: 90 phút'
  },
  {
    title: 'THE BRICKLAYER',
    link: 'https://www.bhdstar.vn/phim/the-bricklayer/',
    Mota: 'Khi thế giới chống lại Hoa Kỳ, CIA phải lôi kéo một đặc vụ cũ nổi loạn nhưng là người xuất sắc nhất của mình để làm sáng tỏ một âm mưu tầm cỡ quốc tế.',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-55.jpg',
    tac_gia: 'Đạo diễn: Renny Harlin',
    dien_vien: 'Diễn viên: Aaron Eckhart, Nina Dobrev',
    the_loai: 'Thể loại: Action',
    khoi_chieu: 'Khởi chiếu: 05/01/2024',
    thoi_luong: 'Thời lượng: 110 phút'
  },
  {
    title: 'SANA',
    link: 'https://www.bhdstar.vn/phim/sana/',
    Mota: 'Bậc thầy từng lan truyền nỗi sợ hãi của châu Á ra toàn thế giới nay trở lại với chiếc bằng cassette phát ra tiếng kinh cầu ma, triệu hồi những linh hồn hung ác bước đến thế giới hiện đại nhiều góc khuất.',
    phan_loai: 'Phim phổ biến đến người xem từ 16 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-16.jpg',
    tac_gia: 'Đạo diễn: Takashi Shimizu',
    dien_vien: 'Diễn viên: Miyoshi Ayaka',
    the_loai: 'Thể loại: Horror',
    khoi_chieu: 'Khởi chiếu: 12/01/2024',
    thoi_luong: 'Thời lượng: 100 phút'
  },
  {
    title: 'THE BEEKEEPER',
    link: 'https://www.bhdstar.vn/phim/the-beekeeper/',
    Mota: 'Khi người hàng xóm tốt bụng của mình qua đời do bị vướng vào một trò lừa đảo trên mạng, người nuôi ong "không bình thường" Clay quyết định đứng lên để trả thù những kẻ đã gây ra tội ác này.',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-470.jpg',
    tac_gia: 'Đạo diễn: David Ayer',
    dien_vien: 'Diễn viên: Jason Statham, Emmy Raver-Lampman',
    the_loai: 'Thể loại: Action',
    khoi_chieu: 'Khởi chiếu: 12/01/2024',
    thoi_luong: 'Thời lượng: 105 phút'
  },
  {
    title: 'APE VS. MECHA APE',
    link: 'https://www.bhdstar.vn/phim/ape-vs-mecha-ape/',
    Mota: 'Quân đội tạo ra đội quân Khỉ AI dựa trên sức mạnh của Khỉ khổng lồ nhưng thất bại ở thử nghiệm đầu tiên khiến họ phải thả Khỉ khổng lồ đang bị giam cầm ra để ngăn chặn đội quân Khỉ Robot trước khi nó phá hủy Chicago.',
    phan_loai:
      'Phim được phổ biến đến người xem dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-22.jpg',
    tac_gia: 'Đạo diễn: Marc Gottlieb',
    dien_vien: 'Diễn viên: Tom Arnold, Anna Telfer',
    the_loai: 'Thể loại: Action',
    khoi_chieu: 'Khởi chiếu: 12/01/2024',
    thoi_luong: 'Thời lượng: 86 phút'
  },
  {
    title: 'ALIENOID: THE RETURN TO THE FUTURE',
    link: 'https://www.bhdstar.vn/phim/alienoid-the-return-to-the-future/',
    Mota: 'Phần 2 của bộ phim Alienoid. Ean và Thunder đã bị mắc kẹt trong quá khứ khi cố gắng ngăn chặn sự trốn thoát của những tù nhân ngoài hành tinh bị nhốt trong bộ não con người. Cổng thời gian mở ra và những bí mật của Moo-reuk, Ean và Thunder được tiết lộ.',
    phan_loai: 'Phim phổ biến đến người xem từ 16 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-480.jpg',
    tac_gia: 'Đạo diễn: Dong-hoon Choi',
    dien_vien: 'Diễn viên: Ryu Jun Yeol, Kim Woo-bin, Kim Tae-ri',
    the_loai: 'Thể loại: Action',
    khoi_chieu: 'Khởi chiếu: 12/01/2024',
    thoi_luong: 'Thời lượng: 122 phút'
  },
  {
    title: 'CON NHÓT MÓT CHỒNG',
    link: 'https://www.bhdstar.vn/phim/con-nhot-mot-chong/',
    Mota: 'Là câu chuyện của Nhót – Người phụ nữ "chưa kịp già" đã sắp bị mãn kinh, vội vàng đi tìm chồng. Nhưng sâu thẳm trong cô là khao khát muốn có một đứa con và luôn muốn hàn gắn với người cha suốt ngày say xỉn của mình',
    phan_loai: 'Phim phổ biến đến người xem từ 16 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-401.jpg',
    tac_gia: 'Đạo diễn: Vũ Ngọc Đãng',
    dien_vien: 'Diễn viên: Thái Hòa, Thu Trang',
    the_loai: 'Thể loại: Comedy',
    khoi_chieu: 'Khởi chiếu: 19/01/2024',
    thoi_luong: 'Thời lượng: 112 phút'
  },
  {
    title: 'IT REMAINS',
    link: 'https://www.bhdstar.vn/phim/it-remains/',
    Mota: 'Tương truyền, tà thuật "ngâm xác" sẽ khiến linh hồn mãi mãi không siêu thoát. Một nhóm bạn lạc vào ngôi làng cổ đã khai quật bí thuật rùng rợn đang được chôn vùi tại đây.',
    phan_loai: 'Phim phổ biến đến người xem từ 16 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-484.jpg',
    tac_gia: 'Đạo diễn: Kelvin Shum',
    dien_vien: 'Diễn viên: PAK HON CHU, Anson Lo',
    the_loai: 'Thể loại: Horror',
    khoi_chieu: 'Khởi chiếu: 19/01/2024',
    thoi_luong: 'Thời lượng: 89 phút'
  },
  {
    title: 'NORYANG: DEADLY SEA',
    link: 'https://www.bhdstar.vn/phim/noryang-deadly-sea/',
    Mota: 'Tác phẩm thứ ba nằm trong trilogy của đạo diễn Kim Han Min nhằm tái hiện lại cuộc đời bình nghiệp của Đô đốc Yi Sun Shin qua sự kiện Chiến tranh Nhâm Thìn.',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-354.jpg',
    tac_gia: 'Đạo diễn: Han-min Kim',
    dien_vien: 'Diễn viên: Yeo Jin Goo, Kim Yoon-seok',
    the_loai: 'Thể loại: Action',
    khoi_chieu: 'Khởi chiếu: 19/01/2024',
    thoi_luong: 'Thời lượng: 148 phút'
  },
  {
    title: 'DIGIMON ADVENTURE 02: THE BEGINNING',
    link: 'https://www.bhdstar.vn/phim/digimon-adventure-02-the-beginning/',
    Mota: '20 năm sau sự kiện trong TV series Digimon Advanture 02, trong khi những người khác đã chọn con đường riêng thì Daisuke và các "DigiDestined" khác cùng Digimon của họ vẫn còn ràng buộc với nhau bởi cùng một mối liên kết.',
    phan_loai:
      'Phim được phổ biến đến người xem dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-479.jpg',
    tac_gia: 'Đạo diễn: Tomohisa Taguchi',
    dien_vien: 'Diễn viên: Fukujurou Katayama',
    the_loai: 'Thể loại: Animation',
    khoi_chieu: 'Khởi chiếu: 19/01/2024',
    thoi_luong: 'Thời lượng: 80 phút'
  },
  {
    title: 'NGƯỜI VỢ CUỐI CÙNG',
    link: 'https://www.bhdstar.vn/phim/nguoi-vo-cuoi-cung/',
    Mota: 'Người vợ bất đắc dĩ của một viên quan tri huyện, xuất thân là con của một gia đình nông dân nghèo khó, vì không thể hoàn thành nghĩa vụ sinh con nối dõi nên đã chịu sự chèn ép của những người vợ lớn trong gia đình và rồi cô gặp lại người yêu cũ của mình..',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-492.jpg',
    tac_gia: 'Đạo diễn: Victor Vũ',
    dien_vien: 'Diễn viên: Kaity Nguyễn, Thuận Nguyễn',
    the_loai: 'Thể loại: Romance',
    khoi_chieu: 'Khởi chiếu: 19/01/2024',
    thoi_luong: 'Thời lượng: 132 phút'
  },
  {
    title: 'KATAK: THE BRAVE BELUGA',
    link: 'https://www.bhdstar.vn/phim/katak-the-brave-beluga/',
    Mota: 'Trong khi các bạn cá heo cùng trang lứa đều đã chuyển sang màu trắng thì Katak vẫn nhỏ con và có màu xám. Để chứng minh mình đã trưởng thành và thực hiện ước nguyện cuối cùng của bà, Katak khởi hành trên một hành trình nguy hiểm đến phương Bắc vĩ đại.',
    phan_loai: 'Phim phổ biến với mọi độ tuổi',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-490.jpg',
    tac_gia: 'Đạo diễn: Christine Dallaire-Dupont',
    dien_vien: 'Diễn viên: Robert Naylor',
    the_loai: 'Thể loại: Animation',
    khoi_chieu: 'Khởi chiếu: 26/01/2024',
    thoi_luong: 'Thời lượng: 78 phút'
  },
  {
    title: 'NIGHTMARE RESORT',
    link: 'https://www.bhdstar.vn/phim/resort-part-time-job/',
    Mota: 'Resort quỷ kéo chân hay resort chứa vong linh là những câu chuyện được truyền tai rộng rãi ở Nhật Bản vào năm 2009. Không ai biết được sự thật ở nơi hoang tàn đó, khi vào chỉ có con đường chết!',
    phan_loai: 'Phim phổ biến đến người xem từ 16 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-519.jpg',
    tac_gia: 'Đạo diễn: Jiro Nagae',
    dien_vien: 'Diễn viên: Ihara Rikka, Fujiwara Taiyu',
    the_loai: 'Thể loại: Horror',
    khoi_chieu: 'Khởi chiếu: 26/01/2024',
    thoi_luong: 'Thời lượng: 86 phút'
  },
  {
    title: 'ALL FUN AND GAMES',
    link: 'https://www.bhdstar.vn/phim/all-fun-and-games/',
    Mota: 'Một nhóm thanh thiếu niên trẻ tuổi phát hiện ra một con dao bị nguồn rủa buộc họ phải chơi những phiên bản chết chóc của những trò chơi thời thơ ấu.',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-491.jpg',
    tac_gia: 'Đạo diễn: Eren Celeboglu, Ari Costa',
    dien_vien: 'Diễn viên: Asa Butterfield, Natalia Dyer',
    the_loai: 'Thể loại: Horror',
    khoi_chieu: 'Khởi chiếu: 26/01/2024',
    thoi_luong: 'Thời lượng: 76 phút'
  },
  {
    title: 'NO WAY UP',
    link: 'https://www.bhdstar.vn/phim/no-way-up/',
    Mota: 'Một nhóm người với những hoàn cảnh khác nhau dường như sắp có chung một cái kết tồi tệ nếu họ không bình tĩnh để vượt qua sự hoảng loạn và hàng loạt nguy hiểm đang rình mò để tồn tại sau khi máy bay chở họ lao xuống Thái Bình Dương.',
    phan_loai: 'Phim phổ biến đến người xem từ 16 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-522.jpg',
    tac_gia: 'Đạo diễn: Claudio Fah',
    dien_vien: 'Diễn viên: Phyllis Logan, Colm Meaney, Will Attenborough',
    the_loai: 'Thể loại: Action',
    khoi_chieu: 'Khởi chiếu: 26/01/2024',
    thoi_luong: 'Thời lượng: 90 phút'
  },
  {
    title: 'MAI',
    link: 'https://www.bhdstar.vn/phim/mai/',
    Mota: 'MAI là câu chuyện về cuộc đời của người phụ nữ cùng tên, với ánh nhìn tĩnh lặng, xuyên thấu ” Quá khứ chưa ngủ yên, ngày mai liệu sẽ đến?..”',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-10.jpg',
    tac_gia: 'Đạo diễn: Tran Thanh',
    dien_vien: 'Diễn viên: Tuấn Trần, Uyển Ân, Phương Anh Đào',
    the_loai: 'Thể loại: Drama',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 131 phút'
  },
  {
    title: 'ARGYLLE',
    link: 'https://www.bhdstar.vn/phim/argylle/',
    Mota: 'Elly, một tiểu thuyết gia nổi tiếng, trở thành một điệp viên bất đắc dĩ khi bị lôi kéo vào các hoạt động của một tập đoàn ngầm nham hiểm.',
    phan_loai: 'Phim phổ biến đến người xem từ 16 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp.png',
    tac_gia: 'Đạo diễn: Matthew Vaughn',
    dien_vien: "Diễn viên: Sofia Boutella, Henry Cavill, Catherine O'Hara",
    the_loai: 'Thể loại: Action',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 139 phút'
  },
  {
    title: "NOAH'S ARK",
    link: 'https://www.bhdstar.vn/phim/noahs-ark/',
    Mota: 'Khi mùa mưa đến, mỗi loài chỉ có một con đực và một con cái được phép lên con tàu của Noah. Với sự giúp đỡ của một con gián khéo léo, hai chú chuột Vini và Tito lẻn lên con tàu và dính vào cuộc chiến giữa loài ăn thịt và loài chỉ ăn được thực vật.',
    phan_loai: 'Phim phổ biến với mọi độ tuổi',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-9.jpg',
    tac_gia: 'Đạo diễn: Sergio Machado, René Veilleux',
    dien_vien: 'Diễn viên: Marcelo Adnet',
    the_loai: 'Thể loại: Animation',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 96 phút'
  },
  {
    title: 'SÁNG ĐÈN',
    link: 'https://www.bhdstar.vn/phim/sang-den/',
    Mota: 'Hành trình nhiều thăng hoa nhưng cũng đầy biến cố hài hước của đoàn cải lương Viễn Phương khi phải biến tấu từ một đoàn cải lương chính thống trở thành đoàn tạp kỹ với xiếc, lô tô và tân nhạc.',
    phan_loai:
      'Phim được phổ biến đến người xem dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-3.jpg',
    tac_gia: 'Đạo diễn: Hoang Tuan Cuong',
    dien_vien: 'Diễn viên: Bach Cong Khanh, NSUT Huu Chau',
    the_loai: 'Thể loại: Romance',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 128 phút'
  },
  {
    title: 'TRÀ',
    link: 'https://www.bhdstar.vn/phim/tra/',
    Mota: 'Bộ phim đánh dấu sự trở lại của Đạo diễn Lê Hoàng.',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-7.jpg',
    tac_gia: 'Đạo diễn: Lê Hoàng',
    dien_vien: 'Diễn viên: Viet Huong, Trương Minh Quốc Thái, Đoàn Trinh',
    the_loai: 'Thể loại: Drama',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 123 phút'
  },
  {
    title: 'GẶP LẠI CHỊ BẦU',
    link: 'https://www.bhdstar.vn/phim/gap-lai-chi-bau/',
    Mota: 'Một chàng trai với với niềm đam mê diễn xuất nhưng lại có một quá khứ không bình yên, cùng cuộc gặp gỡ định mệnh với một cô giáo hơi ” lố tuổi” , với câu chào đầu đầy ấn tượng ” Em có ý gì với chị không?”',
    phan_loai: 'Phim phổ biến đến người xem từ 13 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-521.jpg',
    tac_gia: 'Đạo diễn: Nhất Trung',
    dien_vien: 'Diễn viên: Anh Tu, Lê Giang, Diệu Nhi, Kiều Minh Tuấn',
    the_loai: 'Thể loại: Comedy',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 114 phút'
  },
  {
    title: 'SPY x FAMILY CODE: WHITE',
    link: 'https://www.bhdstar.vn/phim/spy-x-family-code-white/',
    Mota: 'Bộ phim xoay quanh 1 gia đình điệp viên có 1-0-2: Loid và Yor là 2 điệp viên phải kết hôn giả với nhau và để thuận tiện che mắt, họ nhận nuôi cô bé Anya. Nhiệm vụ của bố Loid và mẹ Yor là ngăn chặn chiến tranh và bảo vệ hòa bình…',
    phan_loai: 'Phim phổ biến đến người xem từ 13 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-8.jpg',
    tac_gia: 'Đạo diễn: Kazuhiro Furuhashi',
    dien_vien: 'Diễn viên: Saori Hayami, Takuya Eguchi, Atsumi Tanezaki',
    the_loai: 'Thể loại: Animation',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 111 phút'
  },
  {
    title: 'MAI',
    link: 'https://www.bhdstar.vn/phim/mai/',
    Mota: 'MAI là câu chuyện về cuộc đời của người phụ nữ cùng tên, với ánh nhìn tĩnh lặng, xuyên thấu ” Quá khứ chưa ngủ yên, ngày mai liệu sẽ đến?..”',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-10.jpg',
    tac_gia: 'Đạo diễn: Tran Thanh',
    dien_vien: 'Diễn viên: Tuấn Trần, Uyển Ân, Phương Anh Đào',
    the_loai: 'Thể loại: Drama',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 131 phút'
  },
  {
    title: 'ARGYLLE',
    link: 'https://www.bhdstar.vn/phim/argylle/',
    Mota: 'Elly, một tiểu thuyết gia nổi tiếng, trở thành một điệp viên bất đắc dĩ khi bị lôi kéo vào các hoạt động của một tập đoàn ngầm nham hiểm.',
    phan_loai: 'Phim phổ biến đến người xem từ 16 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp.png',
    tac_gia: 'Đạo diễn: Matthew Vaughn',
    dien_vien: "Diễn viên: Sofia Boutella, Henry Cavill, Catherine O'Hara",
    the_loai: 'Thể loại: Action',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 139 phút'
  },
  {
    title: "NOAH'S ARK",
    link: 'https://www.bhdstar.vn/phim/noahs-ark/',
    Mota: 'Khi mùa mưa đến, mỗi loài chỉ có một con đực và một con cái được phép lên con tàu của Noah. Với sự giúp đỡ của một con gián khéo léo, hai chú chuột Vini và Tito lẻn lên con tàu và dính vào cuộc chiến giữa loài ăn thịt và loài chỉ ăn được thực vật.',
    phan_loai: 'Phim phổ biến với mọi độ tuổi',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-9.jpg',
    tac_gia: 'Đạo diễn: Sergio Machado, René Veilleux',
    dien_vien: 'Diễn viên: Marcelo Adnet',
    the_loai: 'Thể loại: Animation',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 96 phút'
  },
  {
    title: 'SÁNG ĐÈN',
    link: 'https://www.bhdstar.vn/phim/sang-den/',
    Mota: 'Hành trình nhiều thăng hoa nhưng cũng đầy biến cố hài hước của đoàn cải lương Viễn Phương khi phải biến tấu từ một đoàn cải lương chính thống trở thành đoàn tạp kỹ với xiếc, lô tô và tân nhạc.',
    phan_loai:
      'Phim được phổ biến đến người xem dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-3.jpg',
    tac_gia: 'Đạo diễn: Hoang Tuan Cuong',
    dien_vien: 'Diễn viên: Bach Cong Khanh, NSUT Huu Chau',
    the_loai: 'Thể loại: Romance',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 128 phút'
  },
  {
    title: 'TRÀ',
    link: 'https://www.bhdstar.vn/phim/tra/',
    Mota: 'Bộ phim đánh dấu sự trở lại của Đạo diễn Lê Hoàng.',
    phan_loai: 'Phim phổ biến đến người xem từ 18 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-7.jpg',
    tac_gia: 'Đạo diễn: Lê Hoàng',
    dien_vien: 'Diễn viên: Viet Huong, Trương Minh Quốc Thái, Đoàn Trinh',
    the_loai: 'Thể loại: Drama',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 123 phút'
  },
  {
    title: 'GẶP LẠI CHỊ BẦU',
    link: 'https://www.bhdstar.vn/phim/gap-lai-chi-bau/',
    Mota: 'Một chàng trai với với niềm đam mê diễn xuất nhưng lại có một quá khứ không bình yên, cùng cuộc gặp gỡ định mệnh với một cô giáo hơi ” lố tuổi” , với câu chào đầu đầy ấn tượng ” Em có ý gì với chị không?”',
    phan_loai: 'Phim phổ biến đến người xem từ 13 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-521.jpg',
    tac_gia: 'Đạo diễn: Nhất Trung',
    dien_vien: 'Diễn viên: Anh Tu, Lê Giang, Diệu Nhi, Kiều Minh Tuấn',
    the_loai: 'Thể loại: Comedy',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 114 phút'
  },
  {
    title: 'SPY x FAMILY CODE: WHITE',
    link: 'https://www.bhdstar.vn/phim/spy-x-family-code-white/',
    Mota: 'Bộ phim xoay quanh 1 gia đình điệp viên có 1-0-2: Loid và Yor là 2 điệp viên phải kết hôn giả với nhau và để thuận tiện che mắt, họ nhận nuôi cô bé Anya. Nhiệm vụ của bố Loid và mẹ Yor là ngăn chặn chiến tranh và bảo vệ hòa bình…',
    phan_loai: 'Phim phổ biến đến người xem từ 13 tuổi trở lên',
    image:
      'https://www.bhdstar.vn/wp-content/uploads/2024/01/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-8.jpg',
    tac_gia: 'Đạo diễn: Kazuhiro Furuhashi',
    dien_vien: 'Diễn viên: Saori Hayami, Takuya Eguchi, Atsumi Tanezaki',
    the_loai: 'Thể loại: Animation',
    khoi_chieu: 'Khởi chiếu: 10/02/2024',
    thoi_luong: 'Thời lượng: 111 phút'
  },
  {
    title: 'MADAME WEB'
  },
  {
    title: 'SLYTH: THE HUNT SAGA'
  },
  {
    title: "MILLER'S GIRL"
  },
  {
    title: 'NIGHT SWIM'
  },
  {
    title: 'DEMON SLAYER: TO THE HASHIRA TRAINING'
  },
  {
    title: 'POPORO THE MOVIE: POP STAR ADVENTURE'
  },
  {
    title: 'DUNE: PART II'
  },
  {
    title: 'GODZILLA x KONG: THE NEW EMPIRE'
  },
  {
    title: 'CITIZEN OF A KIND'
  },
  {
    title: 'KUNG FU PANDA 4'
  },
  {
    title: 'GHOSTBUSTERS: FROZEN EMPIRE'
  },
  {
    title: 'THE FALL GUY'
  },
  {
    title: 'IF'
  },
  {
    title: 'FURIOSA: A MAD MAX SAGA'
  },
  {
    title: 'THE GARFIELD MOVIE'
  }
]

export const HomeCollection = () => {
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE],
    queryFn: () => getAllMovie()
  })
  const override = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} color="#eb3656" />
  }

  // const [movieData, setMovieData] = useState<any>(MOVIES)

  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const newMovies = MOVIES.slice(0, 10)
  //   setLoading(false)
  //   setMovieData(newMovies)
  // }, [])

  return (
    <section className="section-home-collection" id="nowShowing">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection">
          Now Playing &rarr;
        </h1>
      </div>

      <div className="home-collection-container">
        {dataMovie?.map((latestMovie: any, idx: any) => {
          return <CollectionCard key={idx} className="" movie={latestMovie} />
        })}
      </div>
    </section>
  )
}
