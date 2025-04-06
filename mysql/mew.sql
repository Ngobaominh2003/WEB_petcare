-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: petcare
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bai_viet`
--

DROP TABLE IF EXISTS `bai_viet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bai_viet` (
  `bai_viet_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `tieu_de` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `noi_dung` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `hinh_anh` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `trang_thai` enum('đã duyệt','chờ duyệt','hủy') CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT 'chờ duyệt',
  PRIMARY KEY (`bai_viet_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `bai_viet_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bai_viet`
--

LOCK TABLES `bai_viet` WRITE;
/*!40000 ALTER TABLE `bai_viet` DISABLE KEYS */;
INSERT INTO `bai_viet` VALUES (1,2,'Cuộc Phẫu Thuật Tận Tâm Cho Chú Mèo ','Phẫu thuật cho mèo là một thủ tục y tế quan trọng, không chỉ giúp điều trị các bệnh lý nghiêm trọng mà còn có thể giúp cải thiện chất lượng cuộc sống của thú cưng. Dù vậy, phẫu thuật luôn là một trải nghiệm căng thẳng đối với cả mèo và chủ nuôi, vì vậy việc hiểu rõ quy trình phẫu thuật và cách chăm sóc sau phẫu thuật là rất quan trọng để bảo vệ sức khỏe của mèo và đảm bảo quá trình hồi phục diễn ra suôn sẻ.\r\n\r\nQuy Trình Phẫu Thuật Cho Mèo\r\nTrước khi tiến hành phẫu thuật, mèo sẽ được bác sĩ thú y kiểm tra sức khỏe tổng quát để đảm bảo chúng đủ sức khỏe cho ca phẫu thuật. Điều này bao gồm các xét nghiệm máu, kiểm tra chức năng tim, gan và thận, cũng như đánh giá các yếu tố như tuổi tác và thể trạng của mèo. Nếu mèo có vấn đề về sức khỏe, bác sĩ sẽ đưa ra các biện pháp điều trị hoặc trì hoãn phẫu thuật cho đến khi mèo đủ khỏe mạnh.\r\n\r\nKhi mọi xét nghiệm và kiểm tra đã được thực hiện và mèo đủ điều kiện phẫu thuật, bước tiếp theo là gây mê toàn thân. Gây mê giúp mèo không cảm thấy đau đớn và không có phản ứng trong suốt ca phẫu thuật. Mèo sẽ được theo dõi liên tục các dấu hiệu sinh tồn như nhịp tim, huyết áp và lượng oxy trong máu để đảm bảo an toàn tuyệt đối trong suốt quá trình phẫu thuật.\r\n\r\nPhẫu thuật có thể kéo dài từ vài phút đến vài giờ, tùy thuộc vào loại phẫu thuật và mức độ phức tạp. Một số phẫu thuật phổ biến cho mèo bao gồm triệt sản (cắt buồng trứng hoặc tinh hoàn), điều trị các khối u, sửa chữa các vết thương nghiêm trọng hoặc phẫu thuật để điều trị các vấn đề sức khỏe khác như viêm ruột hay bệnh lý về đường tiêu hóa. Sau khi ca phẫu thuật hoàn tất, bác sĩ sẽ tiến hành đóng vết mổ và theo dõi mèo cho đến khi chúng tỉnh lại hoàn toàn.\r\n\r\nChăm Sóc Sau Phẫu Thuật: Những Điều Cần Lưu Ý\r\nSau khi phẫu thuật, quá trình hồi phục của mèo sẽ tùy thuộc vào loại phẫu thuật và sức khỏe tổng quát của chúng. Tuy nhiên, dù là phẫu thuật nhỏ hay lớn, việc chăm sóc đúng cách sẽ quyết định rất nhiều đến việc mèo có phục hồi nhanh chóng hay không.\r\n\r\n1. Theo Dõi Vết Mổ: Vết mổ cần được chăm sóc kỹ lưỡng để tránh nhiễm trùng. Chủ nuôi nên kiểm tra vết mổ hàng ngày để phát hiện sớm các dấu hiệu bất thường như sưng tấy, chảy mủ, hoặc mùi hôi. Nếu phát hiện những dấu hiệu này, cần đưa mèo đến bác sĩ thú y ngay lập tức.\r\n\r\n2. Ngăn Chặn Mèo Liếm Vết Mổ: Mèo có thể cảm thấy ngứa hoặc khó chịu ở vùng vết mổ, dẫn đến việc chúng liếm hoặc cắn vào vết thương. Điều này có thể gây ra nhiễm trùng hoặc làm vết mổ trở nên tồi tệ hơn. Để ngăn chặn hành động này, bạn có thể sử dụng vòng cổ Elizabethan (vòng cổ chống liếm) hoặc theo dõi và canh chừng mèo trong những ngày đầu sau phẫu thuật.\r\n\r\n3. Hạn Chế Vận Động: Trong vài ngày đầu sau phẫu thuật, mèo cần được nghỉ ngơi và tránh vận động mạnh. Điều này giúp giảm áp lực lên vết thương và giảm nguy cơ rách vết mổ hoặc gặp phải các biến chứng khác. Bạn nên tạo một không gian yên tĩnh và thoải mái để mèo có thể nghỉ ngơi.\r\n\r\n4. Chế Độ Ăn Uống: Mèo có thể không cảm thấy thèm ăn ngay sau phẫu thuật, nhưng bạn cần đảm bảo rằng chúng vẫn uống đủ nước và ăn uống hợp lý. Nếu mèo không ăn trong 24 giờ đầu sau phẫu thuật, bạn nên tham khảo ý kiến bác sĩ thú y để kiểm tra và đảm bảo rằng không có vấn đề gì nghiêm trọng.\r\n\r\n5. Kiểm Tra Các Dấu Hiệu Bất Thường: Trong quá trình hồi phục, bạn nên theo dõi các dấu hiệu bất thường như sốt, đau đớn quá mức, hoặc có biểu hiện mệt mỏi, thờ ơ với mọi thứ xung quanh. Nếu phát hiện bất kỳ triệu chứng nào bất thường, bạn nên đưa mèo đến bác sĩ thú y để kiểm tra ngay lập tức.\r\n\r\n6. Tái Khám: Thông thường, bác sĩ thú y sẽ hẹn tái khám sau vài ngày để kiểm tra vết mổ và tiến trình hồi phục của mèo. Đây là một bước quan trọng để đảm bảo mọi thứ diễn ra đúng theo kế hoạch và mèo không gặp phải vấn đề nào trong quá trình hồi phục.\r\n\r\nKết Luận\r\nPhẫu thuật cho mèo có thể là một trải nghiệm căng thẳng, nhưng với sự chuẩn bị kỹ lưỡng và chăm sóc đúng cách sau phẫu thuật, mèo sẽ nhanh chóng hồi phục và trở lại với cuộc sống bình thường. Điều quan trọng nhất là theo dõi sức khỏe của mèo sau phẫu thuật và tuân thủ các hướng dẫn của bác sĩ thú y để giúp chúng phục hồi một cách an toàn và nhanh chóng. Với sự chăm sóc tận tình từ bạn, mèo của bạn sẽ sớm khỏe mạnh và vui vẻ trở lại.\r\n\r\n','2024-12-07 13:55:31','1733579744154-282895637-a-nh-chu-p-ma-n-png','đã duyệt'),(2,1,'Cuộc Phẫu Thuật Tận Tâm Cho Chú Mèo ','Phẫu thuật cho mèo là một thủ tục y tế quan trọng, không chỉ giúp điều trị các bệnh lý nghiêm trọng mà còn có thể giúp cải thiện chất lượng cuộc sống của thú cưng. Dù vậy, phẫu thuật luôn là một trải nghiệm căng thẳng đối với cả mèo và chủ nuôi, vì vậy việc hiểu rõ quy trình phẫu thuật và cách chăm sóc sau phẫu thuật là rất quan trọng để bảo vệ sức khỏe của mèo và đảm bảo quá trình hồi phục diễn ra suôn sẻ.\r\n\r\nQuy Trình Phẫu Thuật Cho Mèo\r\nTrước khi tiến hành phẫu thuật, mèo sẽ được bác sĩ thú y kiểm tra sức khỏe tổng quát để đảm bảo chúng đủ sức khỏe cho ca phẫu thuật. Điều này bao gồm các xét nghiệm máu, kiểm tra chức năng tim, gan và thận, cũng như đánh giá các yếu tố như tuổi tác và thể trạng của mèo. Nếu mèo có vấn đề về sức khỏe, bác sĩ sẽ đưa ra các biện pháp điều trị hoặc trì hoãn phẫu thuật cho đến khi mèo đủ khỏe mạnh.\r\n\r\nKhi mọi xét nghiệm và kiểm tra đã được thực hiện và mèo đủ điều kiện phẫu thuật, bước tiếp theo là gây mê toàn thân. Gây mê giúp mèo không cảm thấy đau đớn và không có phản ứng trong suốt ca phẫu thuật. Mèo sẽ được theo dõi liên tục các dấu hiệu sinh tồn như nhịp tim, huyết áp và lượng oxy trong máu để đảm bảo an toàn tuyệt đối trong suốt quá trình phẫu thuật.\r\n\r\nPhẫu thuật có thể kéo dài từ vài phút đến vài giờ, tùy thuộc vào loại phẫu thuật và mức độ phức tạp. Một số phẫu thuật phổ biến cho mèo bao gồm triệt sản (cắt buồng trứng hoặc tinh hoàn), điều trị các khối u, sửa chữa các vết thương nghiêm trọng hoặc phẫu thuật để điều trị các vấn đề sức khỏe khác như viêm ruột hay bệnh lý về đường tiêu hóa. Sau khi ca phẫu thuật hoàn tất, bác sĩ sẽ tiến hành đóng vết mổ và theo dõi mèo cho đến khi chúng tỉnh lại hoàn toàn.\r\n\r\nChăm Sóc Sau Phẫu Thuật: Những Điều Cần Lưu Ý\r\nSau khi phẫu thuật, quá trình hồi phục của mèo sẽ tùy thuộc vào loại phẫu thuật và sức khỏe tổng quát của chúng. Tuy nhiên, dù là phẫu thuật nhỏ hay lớn, việc chăm sóc đúng cách sẽ quyết định rất nhiều đến việc mèo có phục hồi nhanh chóng hay không.\r\n\r\n1. Theo Dõi Vết Mổ: Vết mổ cần được chăm sóc kỹ lưỡng để tránh nhiễm trùng. Chủ nuôi nên kiểm tra vết mổ hàng ngày để phát hiện sớm các dấu hiệu bất thường như sưng tấy, chảy mủ, hoặc mùi hôi. Nếu phát hiện những dấu hiệu này, cần đưa mèo đến bác sĩ thú y ngay lập tức.\r\n\r\n2. Ngăn Chặn Mèo Liếm Vết Mổ: Mèo có thể cảm thấy ngứa hoặc khó chịu ở vùng vết mổ, dẫn đến việc chúng liếm hoặc cắn vào vết thương. Điều này có thể gây ra nhiễm trùng hoặc làm vết mổ trở nên tồi tệ hơn. Để ngăn chặn hành động này, bạn có thể sử dụng vòng cổ Elizabethan (vòng cổ chống liếm) hoặc theo dõi và canh chừng mèo trong những ngày đầu sau phẫu thuật.\r\n\r\n3. Hạn Chế Vận Động: Trong vài ngày đầu sau phẫu thuật, mèo cần được nghỉ ngơi và tránh vận động mạnh. Điều này giúp giảm áp lực lên vết thương và giảm nguy cơ rách vết mổ hoặc gặp phải các biến chứng khác. Bạn nên tạo một không gian yên tĩnh và thoải mái để mèo có thể nghỉ ngơi.\r\n\r\n4. Chế Độ Ăn Uống: Mèo có thể không cảm thấy thèm ăn ngay sau phẫu thuật, nhưng bạn cần đảm bảo rằng chúng vẫn uống đủ nước và ăn uống hợp lý. Nếu mèo không ăn trong 24 giờ đầu sau phẫu thuật, bạn nên tham khảo ý kiến bác sĩ thú y để kiểm tra và đảm bảo rằng không có vấn đề gì nghiêm trọng.\r\n\r\n5. Kiểm Tra Các Dấu Hiệu Bất Thường: Trong quá trình hồi phục, bạn nên theo dõi các dấu hiệu bất thường như sốt, đau đớn quá mức, hoặc có biểu hiện mệt mỏi, thờ ơ với mọi thứ xung quanh. Nếu phát hiện bất kỳ triệu chứng nào bất thường, bạn nên đưa mèo đến bác sĩ thú y để kiểm tra ngay lập tức.\r\n\r\n6. Tái Khám: Thông thường, bác sĩ thú y sẽ hẹn tái khám sau vài ngày để kiểm tra vết mổ và tiến trình hồi phục của mèo. Đây là một bước quan trọng để đảm bảo mọi thứ diễn ra đúng theo kế hoạch và mèo không gặp phải vấn đề nào trong quá trình hồi phục.\r\n\r\nKết Luận\r\nPhẫu thuật cho mèo có thể là một trải nghiệm căng thẳng, nhưng với sự chuẩn bị kỹ lưỡng và chăm sóc đúng cách sau phẫu thuật, mèo sẽ nhanh chóng hồi phục và trở lại với cuộc sống bình thường. Điều quan trọng nhất là theo dõi sức khỏe của mèo sau phẫu thuật và tuân thủ các hướng dẫn của bác sĩ thú y để giúp chúng phục hồi một cách an toàn và nhanh chóng. Với sự chăm sóc tận tình từ bạn, mèo của bạn sẽ sớm khỏe mạnh và vui vẻ trở lại.\r\n\r\n','2024-12-07 14:01:44','1733580103904-865147549-a-nh-chu-p-ma-n-png','đã duyệt'),(3,1,'Cuộc Phẫu Thuật Tận Tâm Cho Chú Mèo ','Phẫu thuật cho mèo là một thủ tục y tế quan trọng, không chỉ giúp điều trị các bệnh lý nghiêm trọng mà còn có thể giúp cải thiện chất lượng cuộc sống của thú cưng. Dù vậy, phẫu thuật luôn là một trải nghiệm căng thẳng đối với cả mèo và chủ nuôi, vì vậy việc hiểu rõ quy trình phẫu thuật và cách chăm sóc sau phẫu thuật là rất quan trọng để bảo vệ sức khỏe của mèo và đảm bảo quá trình hồi phục diễn ra suôn sẻ.\r\n\r\nQuy Trình Phẫu Thuật Cho Mèo\r\nTrước khi tiến hành phẫu thuật, mèo sẽ được bác sĩ thú y kiểm tra sức khỏe tổng quát để đảm bảo chúng đủ sức khỏe cho ca phẫu thuật. Điều này bao gồm các xét nghiệm máu, kiểm tra chức năng tim, gan và thận, cũng như đánh giá các yếu tố như tuổi tác và thể trạng của mèo. Nếu mèo có vấn đề về sức khỏe, bác sĩ sẽ đưa ra các biện pháp điều trị hoặc trì hoãn phẫu thuật cho đến khi mèo đủ khỏe mạnh.\r\n\r\nKhi mọi xét nghiệm và kiểm tra đã được thực hiện và mèo đủ điều kiện phẫu thuật, bước tiếp theo là gây mê toàn thân. Gây mê giúp mèo không cảm thấy đau đớn và không có phản ứng trong suốt ca phẫu thuật. Mèo sẽ được theo dõi liên tục các dấu hiệu sinh tồn như nhịp tim, huyết áp và lượng oxy trong máu để đảm bảo an toàn tuyệt đối trong suốt quá trình phẫu thuật.\r\n\r\nPhẫu thuật có thể kéo dài từ vài phút đến vài giờ, tùy thuộc vào loại phẫu thuật và mức độ phức tạp. Một số phẫu thuật phổ biến cho mèo bao gồm triệt sản (cắt buồng trứng hoặc tinh hoàn), điều trị các khối u, sửa chữa các vết thương nghiêm trọng hoặc phẫu thuật để điều trị các vấn đề sức khỏe khác như viêm ruột hay bệnh lý về đường tiêu hóa. Sau khi ca phẫu thuật hoàn tất, bác sĩ sẽ tiến hành đóng vết mổ và theo dõi mèo cho đến khi chúng tỉnh lại hoàn toàn.\r\n\r\nChăm Sóc Sau Phẫu Thuật: Những Điều Cần Lưu Ý\r\nSau khi phẫu thuật, quá trình hồi phục của mèo sẽ tùy thuộc vào loại phẫu thuật và sức khỏe tổng quát của chúng. Tuy nhiên, dù là phẫu thuật nhỏ hay lớn, việc chăm sóc đúng cách sẽ quyết định rất nhiều đến việc mèo có phục hồi nhanh chóng hay không.\r\n\r\n1. Theo Dõi Vết Mổ: Vết mổ cần được chăm sóc kỹ lưỡng để tránh nhiễm trùng. Chủ nuôi nên kiểm tra vết mổ hàng ngày để phát hiện sớm các dấu hiệu bất thường như sưng tấy, chảy mủ, hoặc mùi hôi. Nếu phát hiện những dấu hiệu này, cần đưa mèo đến bác sĩ thú y ngay lập tức.\r\n\r\n2. Ngăn Chặn Mèo Liếm Vết Mổ: Mèo có thể cảm thấy ngứa hoặc khó chịu ở vùng vết mổ, dẫn đến việc chúng liếm hoặc cắn vào vết thương. Điều này có thể gây ra nhiễm trùng hoặc làm vết mổ trở nên tồi tệ hơn. Để ngăn chặn hành động này, bạn có thể sử dụng vòng cổ Elizabethan (vòng cổ chống liếm) hoặc theo dõi và canh chừng mèo trong những ngày đầu sau phẫu thuật.\r\n\r\n3. Hạn Chế Vận Động: Trong vài ngày đầu sau phẫu thuật, mèo cần được nghỉ ngơi và tránh vận động mạnh. Điều này giúp giảm áp lực lên vết thương và giảm nguy cơ rách vết mổ hoặc gặp phải các biến chứng khác. Bạn nên tạo một không gian yên tĩnh và thoải mái để mèo có thể nghỉ ngơi.\r\n\r\n4. Chế Độ Ăn Uống: Mèo có thể không cảm thấy thèm ăn ngay sau phẫu thuật, nhưng bạn cần đảm bảo rằng chúng vẫn uống đủ nước và ăn uống hợp lý. Nếu mèo không ăn trong 24 giờ đầu sau phẫu thuật, bạn nên tham khảo ý kiến bác sĩ thú y để kiểm tra và đảm bảo rằng không có vấn đề gì nghiêm trọng.\r\n\r\n5. Kiểm Tra Các Dấu Hiệu Bất Thường: Trong quá trình hồi phục, bạn nên theo dõi các dấu hiệu bất thường như sốt, đau đớn quá mức, hoặc có biểu hiện mệt mỏi, thờ ơ với mọi thứ xung quanh. Nếu phát hiện bất kỳ triệu chứng nào bất thường, bạn nên đưa mèo đến bác sĩ thú y để kiểm tra ngay lập tức.\r\n\r\n6. Tái Khám: Thông thường, bác sĩ thú y sẽ hẹn tái khám sau vài ngày để kiểm tra vết mổ và tiến trình hồi phục của mèo. Đây là một bước quan trọng để đảm bảo mọi thứ diễn ra đúng theo kế hoạch và mèo không gặp phải vấn đề nào trong quá trình hồi phục.\r\n\r\nKết Luận\r\nPhẫu thuật cho mèo có thể là một trải nghiệm căng thẳng, nhưng với sự chuẩn bị kỹ lưỡng và chăm sóc đúng cách sau phẫu thuật, mèo sẽ nhanh chóng hồi phục và trở lại với cuộc sống bình thường. Điều quan trọng nhất là theo dõi sức khỏe của mèo sau phẫu thuật và tuân thủ các hướng dẫn của bác sĩ thú y để giúp chúng phục hồi một cách an toàn và nhanh chóng. Với sự chăm sóc tận tình từ bạn, mèo của bạn sẽ sớm khỏe mạnh và vui vẻ trở lại.\r\n\r\n','2024-12-07 14:02:05','1733580124859-235632379-a-nh-chu-p-ma-n-png','đã duyệt'),(4,1,'Cuộc Phẫu Thuật Tận Tâm Cho Chú Mèo ','Phẫu thuật cho mèo là một thủ tục y tế quan trọng, không chỉ giúp điều trị các bệnh lý nghiêm trọng mà còn có thể giúp cải thiện chất lượng cuộc sống của thú cưng. Dù vậy, phẫu thuật luôn là một trải nghiệm căng thẳng đối với cả mèo và chủ nuôi, vì vậy việc hiểu rõ quy trình phẫu thuật và cách chăm sóc sau phẫu thuật là rất quan trọng để bảo vệ sức khỏe của mèo và đảm bảo quá trình hồi phục diễn ra suôn sẻ.\r\n\r\nQuy Trình Phẫu Thuật Cho Mèo\r\nTrước khi tiến hành phẫu thuật, mèo sẽ được bác sĩ thú y kiểm tra sức khỏe tổng quát để đảm bảo chúng đủ sức khỏe cho ca phẫu thuật. Điều này bao gồm các xét nghiệm máu, kiểm tra chức năng tim, gan và thận, cũng như đánh giá các yếu tố như tuổi tác và thể trạng của mèo. Nếu mèo có vấn đề về sức khỏe, bác sĩ sẽ đưa ra các biện pháp điều trị hoặc trì hoãn phẫu thuật cho đến khi mèo đủ khỏe mạnh.\r\n\r\nKhi mọi xét nghiệm và kiểm tra đã được thực hiện và mèo đủ điều kiện phẫu thuật, bước tiếp theo là gây mê toàn thân. Gây mê giúp mèo không cảm thấy đau đớn và không có phản ứng trong suốt ca phẫu thuật. Mèo sẽ được theo dõi liên tục các dấu hiệu sinh tồn như nhịp tim, huyết áp và lượng oxy trong máu để đảm bảo an toàn tuyệt đối trong suốt quá trình phẫu thuật.\r\n\r\nPhẫu thuật có thể kéo dài từ vài phút đến vài giờ, tùy thuộc vào loại phẫu thuật và mức độ phức tạp. Một số phẫu thuật phổ biến cho mèo bao gồm triệt sản (cắt buồng trứng hoặc tinh hoàn), điều trị các khối u, sửa chữa các vết thương nghiêm trọng hoặc phẫu thuật để điều trị các vấn đề sức khỏe khác như viêm ruột hay bệnh lý về đường tiêu hóa. Sau khi ca phẫu thuật hoàn tất, bác sĩ sẽ tiến hành đóng vết mổ và theo dõi mèo cho đến khi chúng tỉnh lại hoàn toàn.\r\n\r\nChăm Sóc Sau Phẫu Thuật: Những Điều Cần Lưu Ý\r\nSau khi phẫu thuật, quá trình hồi phục của mèo sẽ tùy thuộc vào loại phẫu thuật và sức khỏe tổng quát của chúng. Tuy nhiên, dù là phẫu thuật nhỏ hay lớn, việc chăm sóc đúng cách sẽ quyết định rất nhiều đến việc mèo có phục hồi nhanh chóng hay không.\r\n\r\n1. Theo Dõi Vết Mổ: Vết mổ cần được chăm sóc kỹ lưỡng để tránh nhiễm trùng. Chủ nuôi nên kiểm tra vết mổ hàng ngày để phát hiện sớm các dấu hiệu bất thường như sưng tấy, chảy mủ, hoặc mùi hôi. Nếu phát hiện những dấu hiệu này, cần đưa mèo đến bác sĩ thú y ngay lập tức.\r\n\r\n2. Ngăn Chặn Mèo Liếm Vết Mổ: Mèo có thể cảm thấy ngứa hoặc khó chịu ở vùng vết mổ, dẫn đến việc chúng liếm hoặc cắn vào vết thương. Điều này có thể gây ra nhiễm trùng hoặc làm vết mổ trở nên tồi tệ hơn. Để ngăn chặn hành động này, bạn có thể sử dụng vòng cổ Elizabethan (vòng cổ chống liếm) hoặc theo dõi và canh chừng mèo trong những ngày đầu sau phẫu thuật.\r\n\r\n3. Hạn Chế Vận Động: Trong vài ngày đầu sau phẫu thuật, mèo cần được nghỉ ngơi và tránh vận động mạnh. Điều này giúp giảm áp lực lên vết thương và giảm nguy cơ rách vết mổ hoặc gặp phải các biến chứng khác. Bạn nên tạo một không gian yên tĩnh và thoải mái để mèo có thể nghỉ ngơi.\r\n\r\n4. Chế Độ Ăn Uống: Mèo có thể không cảm thấy thèm ăn ngay sau phẫu thuật, nhưng bạn cần đảm bảo rằng chúng vẫn uống đủ nước và ăn uống hợp lý. Nếu mèo không ăn trong 24 giờ đầu sau phẫu thuật, bạn nên tham khảo ý kiến bác sĩ thú y để kiểm tra và đảm bảo rằng không có vấn đề gì nghiêm trọng.\r\n\r\n5. Kiểm Tra Các Dấu Hiệu Bất Thường: Trong quá trình hồi phục, bạn nên theo dõi các dấu hiệu bất thường như sốt, đau đớn quá mức, hoặc có biểu hiện mệt mỏi, thờ ơ với mọi thứ xung quanh. Nếu phát hiện bất kỳ triệu chứng nào bất thường, bạn nên đưa mèo đến bác sĩ thú y để kiểm tra ngay lập tức.\r\n\r\n6. Tái Khám: Thông thường, bác sĩ thú y sẽ hẹn tái khám sau vài ngày để kiểm tra vết mổ và tiến trình hồi phục của mèo. Đây là một bước quan trọng để đảm bảo mọi thứ diễn ra đúng theo kế hoạch và mèo không gặp phải vấn đề nào trong quá trình hồi phục.\r\n\r\nKết Luận\r\nPhẫu thuật cho mèo có thể là một trải nghiệm căng thẳng, nhưng với sự chuẩn bị kỹ lưỡng và chăm sóc đúng cách sau phẫu thuật, mèo sẽ nhanh chóng hồi phục và trở lại với cuộc sống bình thường. Điều quan trọng nhất là theo dõi sức khỏe của mèo sau phẫu thuật và tuân thủ các hướng dẫn của bác sĩ thú y để giúp chúng phục hồi một cách an toàn và nhanh chóng. Với sự chăm sóc tận tình từ bạn, mèo của bạn sẽ sớm khỏe mạnh và vui vẻ trở lại.\r\n\r\n','2024-12-07 14:02:18','1733580138315-520342754-a-nh-chu-p-ma-n-png','đã duyệt'),(5,1,'Cuộc Phẫu Thuật Tận Tâm Cho Chú Mèo ','Phẫu thuật cho mèo là một thủ tục y tế quan trọng, không chỉ giúp điều trị các bệnh lý nghiêm trọng mà còn có thể giúp cải thiện chất lượng cuộc sống của thú cưng. Dù vậy, phẫu thuật luôn là một trải nghiệm căng thẳng đối với cả mèo và chủ nuôi, vì vậy việc hiểu rõ quy trình phẫu thuật và cách chăm sóc sau phẫu thuật là rất quan trọng để bảo vệ sức khỏe của mèo và đảm bảo quá trình hồi phục diễn ra suôn sẻ.\r\n\r\nQuy Trình Phẫu Thuật Cho Mèo\r\nTrước khi tiến hành phẫu thuật, mèo sẽ được bác sĩ thú y kiểm tra sức khỏe tổng quát để đảm bảo chúng đủ sức khỏe cho ca phẫu thuật. Điều này bao gồm các xét nghiệm máu, kiểm tra chức năng tim, gan và thận, cũng như đánh giá các yếu tố như tuổi tác và thể trạng của mèo. Nếu mèo có vấn đề về sức khỏe, bác sĩ sẽ đưa ra các biện pháp điều trị hoặc trì hoãn phẫu thuật cho đến khi mèo đủ khỏe mạnh.\r\n\r\nKhi mọi xét nghiệm và kiểm tra đã được thực hiện và mèo đủ điều kiện phẫu thuật, bước tiếp theo là gây mê toàn thân. Gây mê giúp mèo không cảm thấy đau đớn và không có phản ứng trong suốt ca phẫu thuật. Mèo sẽ được theo dõi liên tục các dấu hiệu sinh tồn như nhịp tim, huyết áp và lượng oxy trong máu để đảm bảo an toàn tuyệt đối trong suốt quá trình phẫu thuật.\r\n\r\nPhẫu thuật có thể kéo dài từ vài phút đến vài giờ, tùy thuộc vào loại phẫu thuật và mức độ phức tạp. Một số phẫu thuật phổ biến cho mèo bao gồm triệt sản (cắt buồng trứng hoặc tinh hoàn), điều trị các khối u, sửa chữa các vết thương nghiêm trọng hoặc phẫu thuật để điều trị các vấn đề sức khỏe khác như viêm ruột hay bệnh lý về đường tiêu hóa. Sau khi ca phẫu thuật hoàn tất, bác sĩ sẽ tiến hành đóng vết mổ và theo dõi mèo cho đến khi chúng tỉnh lại hoàn toàn.\r\n\r\nChăm Sóc Sau Phẫu Thuật: Những Điều Cần Lưu Ý\r\nSau khi phẫu thuật, quá trình hồi phục của mèo sẽ tùy thuộc vào loại phẫu thuật và sức khỏe tổng quát của chúng. Tuy nhiên, dù là phẫu thuật nhỏ hay lớn, việc chăm sóc đúng cách sẽ quyết định rất nhiều đến việc mèo có phục hồi nhanh chóng hay không.\r\n\r\n1. Theo Dõi Vết Mổ: Vết mổ cần được chăm sóc kỹ lưỡng để tránh nhiễm trùng. Chủ nuôi nên kiểm tra vết mổ hàng ngày để phát hiện sớm các dấu hiệu bất thường như sưng tấy, chảy mủ, hoặc mùi hôi. Nếu phát hiện những dấu hiệu này, cần đưa mèo đến bác sĩ thú y ngay lập tức.\r\n\r\n2. Ngăn Chặn Mèo Liếm Vết Mổ: Mèo có thể cảm thấy ngứa hoặc khó chịu ở vùng vết mổ, dẫn đến việc chúng liếm hoặc cắn vào vết thương. Điều này có thể gây ra nhiễm trùng hoặc làm vết mổ trở nên tồi tệ hơn. Để ngăn chặn hành động này, bạn có thể sử dụng vòng cổ Elizabethan (vòng cổ chống liếm) hoặc theo dõi và canh chừng mèo trong những ngày đầu sau phẫu thuật.\r\n\r\n3. Hạn Chế Vận Động: Trong vài ngày đầu sau phẫu thuật, mèo cần được nghỉ ngơi và tránh vận động mạnh. Điều này giúp giảm áp lực lên vết thương và giảm nguy cơ rách vết mổ hoặc gặp phải các biến chứng khác. Bạn nên tạo một không gian yên tĩnh và thoải mái để mèo có thể nghỉ ngơi.\r\n\r\n4. Chế Độ Ăn Uống: Mèo có thể không cảm thấy thèm ăn ngay sau phẫu thuật, nhưng bạn cần đảm bảo rằng chúng vẫn uống đủ nước và ăn uống hợp lý. Nếu mèo không ăn trong 24 giờ đầu sau phẫu thuật, bạn nên tham khảo ý kiến bác sĩ thú y để kiểm tra và đảm bảo rằng không có vấn đề gì nghiêm trọng.\r\n\r\n5. Kiểm Tra Các Dấu Hiệu Bất Thường: Trong quá trình hồi phục, bạn nên theo dõi các dấu hiệu bất thường như sốt, đau đớn quá mức, hoặc có biểu hiện mệt mỏi, thờ ơ với mọi thứ xung quanh. Nếu phát hiện bất kỳ triệu chứng nào bất thường, bạn nên đưa mèo đến bác sĩ thú y để kiểm tra ngay lập tức.\r\n\r\n6. Tái Khám: Thông thường, bác sĩ thú y sẽ hẹn tái khám sau vài ngày để kiểm tra vết mổ và tiến trình hồi phục của mèo. Đây là một bước quan trọng để đảm bảo mọi thứ diễn ra đúng theo kế hoạch và mèo không gặp phải vấn đề nào trong quá trình hồi phục.\r\n\r\nKết Luận\r\nPhẫu thuật cho mèo có thể là một trải nghiệm căng thẳng, nhưng với sự chuẩn bị kỹ lưỡng và chăm sóc đúng cách sau phẫu thuật, mèo sẽ nhanh chóng hồi phục và trở lại với cuộc sống bình thường. Điều quan trọng nhất là theo dõi sức khỏe của mèo sau phẫu thuật và tuân thủ các hướng dẫn của bác sĩ thú y để giúp chúng phục hồi một cách an toàn và nhanh chóng. Với sự chăm sóc tận tình từ bạn, mèo của bạn sẽ sớm khỏe mạnh và vui vẻ trở lại.\r\n\r\n','2024-12-07 14:02:31','1733580150787-192428533-a-nh-chu-p-ma-n-png','đã duyệt'),(6,1,'Cuộc Phẫu Thuật Tận Tâm Cho Chú Mèo ','Phẫu thuật cho mèo là một thủ tục y tế quan trọng, không chỉ giúp điều trị các bệnh lý nghiêm trọng mà còn có thể giúp cải thiện chất lượng cuộc sống của thú cưng. Dù vậy, phẫu thuật luôn là một trải nghiệm căng thẳng đối với cả mèo và chủ nuôi, vì vậy việc hiểu rõ quy trình phẫu thuật và cách chăm sóc sau phẫu thuật là rất quan trọng để bảo vệ sức khỏe của mèo và đảm bảo quá trình hồi phục diễn ra suôn sẻ.\r\n\r\nQuy Trình Phẫu Thuật Cho Mèo\r\nTrước khi tiến hành phẫu thuật, mèo sẽ được bác sĩ thú y kiểm tra sức khỏe tổng quát để đảm bảo chúng đủ sức khỏe cho ca phẫu thuật. Điều này bao gồm các xét nghiệm máu, kiểm tra chức năng tim, gan và thận, cũng như đánh giá các yếu tố như tuổi tác và thể trạng của mèo. Nếu mèo có vấn đề về sức khỏe, bác sĩ sẽ đưa ra các biện pháp điều trị hoặc trì hoãn phẫu thuật cho đến khi mèo đủ khỏe mạnh.\r\n\r\nKhi mọi xét nghiệm và kiểm tra đã được thực hiện và mèo đủ điều kiện phẫu thuật, bước tiếp theo là gây mê toàn thân. Gây mê giúp mèo không cảm thấy đau đớn và không có phản ứng trong suốt ca phẫu thuật. Mèo sẽ được theo dõi liên tục các dấu hiệu sinh tồn như nhịp tim, huyết áp và lượng oxy trong máu để đảm bảo an toàn tuyệt đối trong suốt quá trình phẫu thuật.\r\n\r\nPhẫu thuật có thể kéo dài từ vài phút đến vài giờ, tùy thuộc vào loại phẫu thuật và mức độ phức tạp. Một số phẫu thuật phổ biến cho mèo bao gồm triệt sản (cắt buồng trứng hoặc tinh hoàn), điều trị các khối u, sửa chữa các vết thương nghiêm trọng hoặc phẫu thuật để điều trị các vấn đề sức khỏe khác như viêm ruột hay bệnh lý về đường tiêu hóa. Sau khi ca phẫu thuật hoàn tất, bác sĩ sẽ tiến hành đóng vết mổ và theo dõi mèo cho đến khi chúng tỉnh lại hoàn toàn.\r\n\r\nChăm Sóc Sau Phẫu Thuật: Những Điều Cần Lưu Ý\r\nSau khi phẫu thuật, quá trình hồi phục của mèo sẽ tùy thuộc vào loại phẫu thuật và sức khỏe tổng quát của chúng. Tuy nhiên, dù là phẫu thuật nhỏ hay lớn, việc chăm sóc đúng cách sẽ quyết định rất nhiều đến việc mèo có phục hồi nhanh chóng hay không.\r\n\r\n1. Theo Dõi Vết Mổ: Vết mổ cần được chăm sóc kỹ lưỡng để tránh nhiễm trùng. Chủ nuôi nên kiểm tra vết mổ hàng ngày để phát hiện sớm các dấu hiệu bất thường như sưng tấy, chảy mủ, hoặc mùi hôi. Nếu phát hiện những dấu hiệu này, cần đưa mèo đến bác sĩ thú y ngay lập tức.\r\n\r\n2. Ngăn Chặn Mèo Liếm Vết Mổ: Mèo có thể cảm thấy ngứa hoặc khó chịu ở vùng vết mổ, dẫn đến việc chúng liếm hoặc cắn vào vết thương. Điều này có thể gây ra nhiễm trùng hoặc làm vết mổ trở nên tồi tệ hơn. Để ngăn chặn hành động này, bạn có thể sử dụng vòng cổ Elizabethan (vòng cổ chống liếm) hoặc theo dõi và canh chừng mèo trong những ngày đầu sau phẫu thuật.\r\n\r\n3. Hạn Chế Vận Động: Trong vài ngày đầu sau phẫu thuật, mèo cần được nghỉ ngơi và tránh vận động mạnh. Điều này giúp giảm áp lực lên vết thương và giảm nguy cơ rách vết mổ hoặc gặp phải các biến chứng khác. Bạn nên tạo một không gian yên tĩnh và thoải mái để mèo có thể nghỉ ngơi.\r\n\r\n4. Chế Độ Ăn Uống: Mèo có thể không cảm thấy thèm ăn ngay sau phẫu thuật, nhưng bạn cần đảm bảo rằng chúng vẫn uống đủ nước và ăn uống hợp lý. Nếu mèo không ăn trong 24 giờ đầu sau phẫu thuật, bạn nên tham khảo ý kiến bác sĩ thú y để kiểm tra và đảm bảo rằng không có vấn đề gì nghiêm trọng.\r\n\r\n5. Kiểm Tra Các Dấu Hiệu Bất Thường: Trong quá trình hồi phục, bạn nên theo dõi các dấu hiệu bất thường như sốt, đau đớn quá mức, hoặc có biểu hiện mệt mỏi, thờ ơ với mọi thứ xung quanh. Nếu phát hiện bất kỳ triệu chứng nào bất thường, bạn nên đưa mèo đến bác sĩ thú y để kiểm tra ngay lập tức.\r\n\r\n6. Tái Khám: Thông thường, bác sĩ thú y sẽ hẹn tái khám sau vài ngày để kiểm tra vết mổ và tiến trình hồi phục của mèo. Đây là một bước quan trọng để đảm bảo mọi thứ diễn ra đúng theo kế hoạch và mèo không gặp phải vấn đề nào trong quá trình hồi phục.\r\n\r\nKết Luận\r\nPhẫu thuật cho mèo có thể là một trải nghiệm căng thẳng, nhưng với sự chuẩn bị kỹ lưỡng và chăm sóc đúng cách sau phẫu thuật, mèo sẽ nhanh chóng hồi phục và trở lại với cuộc sống bình thường. Điều quan trọng nhất là theo dõi sức khỏe của mèo sau phẫu thuật và tuân thủ các hướng dẫn của bác sĩ thú y để giúp chúng phục hồi một cách an toàn và nhanh chóng. Với sự chăm sóc tận tình từ bạn, mèo của bạn sẽ sớm khỏe mạnh và vui vẻ trở lại.\r\n\r\n','2024-12-07 14:02:45','1733580164667-393271663-a-nh-chu-p-ma-n-png','đã duyệt'),(7,1,'Cuộc Phẫu Thuật Tận Tâm Cho Chú Mèo ','Phẫu thuật cho mèo là một thủ tục y tế quan trọng, không chỉ giúp điều trị các bệnh lý nghiêm trọng mà còn có thể giúp cải thiện chất lượng cuộc sống của thú cưng. Dù vậy, phẫu thuật luôn là một trải nghiệm căng thẳng đối với cả mèo và chủ nuôi, vì vậy việc hiểu rõ quy trình phẫu thuật và cách chăm sóc sau phẫu thuật là rất quan trọng để bảo vệ sức khỏe của mèo và đảm bảo quá trình hồi phục diễn ra suôn sẻ.\r\n\r\nQuy Trình Phẫu Thuật Cho Mèo\r\nTrước khi tiến hành phẫu thuật, mèo sẽ được bác sĩ thú y kiểm tra sức khỏe tổng quát để đảm bảo chúng đủ sức khỏe cho ca phẫu thuật. Điều này bao gồm các xét nghiệm máu, kiểm tra chức năng tim, gan và thận, cũng như đánh giá các yếu tố như tuổi tác và thể trạng của mèo. Nếu mèo có vấn đề về sức khỏe, bác sĩ sẽ đưa ra các biện pháp điều trị hoặc trì hoãn phẫu thuật cho đến khi mèo đủ khỏe mạnh.\r\n\r\nKhi mọi xét nghiệm và kiểm tra đã được thực hiện và mèo đủ điều kiện phẫu thuật, bước tiếp theo là gây mê toàn thân. Gây mê giúp mèo không cảm thấy đau đớn và không có phản ứng trong suốt ca phẫu thuật. Mèo sẽ được theo dõi liên tục các dấu hiệu sinh tồn như nhịp tim, huyết áp và lượng oxy trong máu để đảm bảo an toàn tuyệt đối trong suốt quá trình phẫu thuật.\r\n\r\nPhẫu thuật có thể kéo dài từ vài phút đến vài giờ, tùy thuộc vào loại phẫu thuật và mức độ phức tạp. Một số phẫu thuật phổ biến cho mèo bao gồm triệt sản (cắt buồng trứng hoặc tinh hoàn), điều trị các khối u, sửa chữa các vết thương nghiêm trọng hoặc phẫu thuật để điều trị các vấn đề sức khỏe khác như viêm ruột hay bệnh lý về đường tiêu hóa. Sau khi ca phẫu thuật hoàn tất, bác sĩ sẽ tiến hành đóng vết mổ và theo dõi mèo cho đến khi chúng tỉnh lại hoàn toàn.\r\n\r\nChăm Sóc Sau Phẫu Thuật: Những Điều Cần Lưu Ý\r\nSau khi phẫu thuật, quá trình hồi phục của mèo sẽ tùy thuộc vào loại phẫu thuật và sức khỏe tổng quát của chúng. Tuy nhiên, dù là phẫu thuật nhỏ hay lớn, việc chăm sóc đúng cách sẽ quyết định rất nhiều đến việc mèo có phục hồi nhanh chóng hay không.\r\n\r\n1. Theo Dõi Vết Mổ: Vết mổ cần được chăm sóc kỹ lưỡng để tránh nhiễm trùng. Chủ nuôi nên kiểm tra vết mổ hàng ngày để phát hiện sớm các dấu hiệu bất thường như sưng tấy, chảy mủ, hoặc mùi hôi. Nếu phát hiện những dấu hiệu này, cần đưa mèo đến bác sĩ thú y ngay lập tức.\r\n\r\n2. Ngăn Chặn Mèo Liếm Vết Mổ: Mèo có thể cảm thấy ngứa hoặc khó chịu ở vùng vết mổ, dẫn đến việc chúng liếm hoặc cắn vào vết thương. Điều này có thể gây ra nhiễm trùng hoặc làm vết mổ trở nên tồi tệ hơn. Để ngăn chặn hành động này, bạn có thể sử dụng vòng cổ Elizabethan (vòng cổ chống liếm) hoặc theo dõi và canh chừng mèo trong những ngày đầu sau phẫu thuật.\r\n\r\n3. Hạn Chế Vận Động: Trong vài ngày đầu sau phẫu thuật, mèo cần được nghỉ ngơi và tránh vận động mạnh. Điều này giúp giảm áp lực lên vết thương và giảm nguy cơ rách vết mổ hoặc gặp phải các biến chứng khác. Bạn nên tạo một không gian yên tĩnh và thoải mái để mèo có thể nghỉ ngơi.\r\n\r\n4. Chế Độ Ăn Uống: Mèo có thể không cảm thấy thèm ăn ngay sau phẫu thuật, nhưng bạn cần đảm bảo rằng chúng vẫn uống đủ nước và ăn uống hợp lý. Nếu mèo không ăn trong 24 giờ đầu sau phẫu thuật, bạn nên tham khảo ý kiến bác sĩ thú y để kiểm tra và đảm bảo rằng không có vấn đề gì nghiêm trọng.\r\n\r\n5. Kiểm Tra Các Dấu Hiệu Bất Thường: Trong quá trình hồi phục, bạn nên theo dõi các dấu hiệu bất thường như sốt, đau đớn quá mức, hoặc có biểu hiện mệt mỏi, thờ ơ với mọi thứ xung quanh. Nếu phát hiện bất kỳ triệu chứng nào bất thường, bạn nên đưa mèo đến bác sĩ thú y để kiểm tra ngay lập tức.\r\n\r\n6. Tái Khám: Thông thường, bác sĩ thú y sẽ hẹn tái khám sau vài ngày để kiểm tra vết mổ và tiến trình hồi phục của mèo. Đây là một bước quan trọng để đảm bảo mọi thứ diễn ra đúng theo kế hoạch và mèo không gặp phải vấn đề nào trong quá trình hồi phục.\r\n\r\nKết Luận\r\nPhẫu thuật cho mèo có thể là một trải nghiệm căng thẳng, nhưng với sự chuẩn bị kỹ lưỡng và chăm sóc đúng cách sau phẫu thuật, mèo sẽ nhanh chóng hồi phục và trở lại với cuộc sống bình thường. Điều quan trọng nhất là theo dõi sức khỏe của mèo sau phẫu thuật và tuân thủ các hướng dẫn của bác sĩ thú y để giúp chúng phục hồi một cách an toàn và nhanh chóng. Với sự chăm sóc tận tình từ bạn, mèo của bạn sẽ sớm khỏe mạnh và vui vẻ trở lại.\r\n\r\n','2024-12-07 14:02:54','1733580173685-545121058-a-nh-chu-p-ma-n-png','đã duyệt'),(8,1,'Cuộc Phẫu Thuật Tận Tâm Cho Chú Mèo ','Phẫu thuật cho mèo là một thủ tục y tế quan trọng, không chỉ giúp điều trị các bệnh lý nghiêm trọng mà còn có thể giúp cải thiện chất lượng cuộc sống của thú cưng. Dù vậy, phẫu thuật luôn là một trải nghiệm căng thẳng đối với cả mèo và chủ nuôi, vì vậy việc hiểu rõ quy trình phẫu thuật và cách chăm sóc sau phẫu thuật là rất quan trọng để bảo vệ sức khỏe của mèo và đảm bảo quá trình hồi phục diễn ra suôn sẻ.\r\n\r\nQuy Trình Phẫu Thuật Cho Mèo\r\nTrước khi tiến hành phẫu thuật, mèo sẽ được bác sĩ thú y kiểm tra sức khỏe tổng quát để đảm bảo chúng đủ sức khỏe cho ca phẫu thuật. Điều này bao gồm các xét nghiệm máu, kiểm tra chức năng tim, gan và thận, cũng như đánh giá các yếu tố như tuổi tác và thể trạng của mèo. Nếu mèo có vấn đề về sức khỏe, bác sĩ sẽ đưa ra các biện pháp điều trị hoặc trì hoãn phẫu thuật cho đến khi mèo đủ khỏe mạnh.\r\n\r\nKhi mọi xét nghiệm và kiểm tra đã được thực hiện và mèo đủ điều kiện phẫu thuật, bước tiếp theo là gây mê toàn thân. Gây mê giúp mèo không cảm thấy đau đớn và không có phản ứng trong suốt ca phẫu thuật. Mèo sẽ được theo dõi liên tục các dấu hiệu sinh tồn như nhịp tim, huyết áp và lượng oxy trong máu để đảm bảo an toàn tuyệt đối trong suốt quá trình phẫu thuật.\r\n\r\nPhẫu thuật có thể kéo dài từ vài phút đến vài giờ, tùy thuộc vào loại phẫu thuật và mức độ phức tạp. Một số phẫu thuật phổ biến cho mèo bao gồm triệt sản (cắt buồng trứng hoặc tinh hoàn), điều trị các khối u, sửa chữa các vết thương nghiêm trọng hoặc phẫu thuật để điều trị các vấn đề sức khỏe khác như viêm ruột hay bệnh lý về đường tiêu hóa. Sau khi ca phẫu thuật hoàn tất, bác sĩ sẽ tiến hành đóng vết mổ và theo dõi mèo cho đến khi chúng tỉnh lại hoàn toàn.\r\n\r\nChăm Sóc Sau Phẫu Thuật: Những Điều Cần Lưu Ý\r\nSau khi phẫu thuật, quá trình hồi phục của mèo sẽ tùy thuộc vào loại phẫu thuật và sức khỏe tổng quát của chúng. Tuy nhiên, dù là phẫu thuật nhỏ hay lớn, việc chăm sóc đúng cách sẽ quyết định rất nhiều đến việc mèo có phục hồi nhanh chóng hay không.\r\n\r\n1. Theo Dõi Vết Mổ: Vết mổ cần được chăm sóc kỹ lưỡng để tránh nhiễm trùng. Chủ nuôi nên kiểm tra vết mổ hàng ngày để phát hiện sớm các dấu hiệu bất thường như sưng tấy, chảy mủ, hoặc mùi hôi. Nếu phát hiện những dấu hiệu này, cần đưa mèo đến bác sĩ thú y ngay lập tức.\r\n\r\n2. Ngăn Chặn Mèo Liếm Vết Mổ: Mèo có thể cảm thấy ngứa hoặc khó chịu ở vùng vết mổ, dẫn đến việc chúng liếm hoặc cắn vào vết thương. Điều này có thể gây ra nhiễm trùng hoặc làm vết mổ trở nên tồi tệ hơn. Để ngăn chặn hành động này, bạn có thể sử dụng vòng cổ Elizabethan (vòng cổ chống liếm) hoặc theo dõi và canh chừng mèo trong những ngày đầu sau phẫu thuật.\r\n\r\n3. Hạn Chế Vận Động: Trong vài ngày đầu sau phẫu thuật, mèo cần được nghỉ ngơi và tránh vận động mạnh. Điều này giúp giảm áp lực lên vết thương và giảm nguy cơ rách vết mổ hoặc gặp phải các biến chứng khác. Bạn nên tạo một không gian yên tĩnh và thoải mái để mèo có thể nghỉ ngơi.\r\n\r\n4. Chế Độ Ăn Uống: Mèo có thể không cảm thấy thèm ăn ngay sau phẫu thuật, nhưng bạn cần đảm bảo rằng chúng vẫn uống đủ nước và ăn uống hợp lý. Nếu mèo không ăn trong 24 giờ đầu sau phẫu thuật, bạn nên tham khảo ý kiến bác sĩ thú y để kiểm tra và đảm bảo rằng không có vấn đề gì nghiêm trọng.\r\n\r\n5. Kiểm Tra Các Dấu Hiệu Bất Thường: Trong quá trình hồi phục, bạn nên theo dõi các dấu hiệu bất thường như sốt, đau đớn quá mức, hoặc có biểu hiện mệt mỏi, thờ ơ với mọi thứ xung quanh. Nếu phát hiện bất kỳ triệu chứng nào bất thường, bạn nên đưa mèo đến bác sĩ thú y để kiểm tra ngay lập tức.\r\n\r\n6. Tái Khám: Thông thường, bác sĩ thú y sẽ hẹn tái khám sau vài ngày để kiểm tra vết mổ và tiến trình hồi phục của mèo. Đây là một bước quan trọng để đảm bảo mọi thứ diễn ra đúng theo kế hoạch và mèo không gặp phải vấn đề nào trong quá trình hồi phục.\r\n\r\nKết Luận\r\nPhẫu thuật cho mèo có thể là một trải nghiệm căng thẳng, nhưng với sự chuẩn bị kỹ lưỡng và chăm sóc đúng cách sau phẫu thuật, mèo sẽ nhanh chóng hồi phục và trở lại với cuộc sống bình thường. Điều quan trọng nhất là theo dõi sức khỏe của mèo sau phẫu thuật và tuân thủ các hướng dẫn của bác sĩ thú y để giúp chúng phục hồi một cách an toàn và nhanh chóng. Với sự chăm sóc tận tình từ bạn, mèo của bạn sẽ sớm khỏe mạnh và vui vẻ trở lại.\r\n\r\n','2024-12-09 13:01:12','1734746348995-746713438-a-nh-chu-p-ma-n-png','hủy'),(9,1,'Tiêu đề mới33','sssssssssss','2024-12-28 08:02:00','1735372919723-94636841-a-nh-chu-p-ma-n-png','chờ duyệt');
/*!40000 ALTER TABLE `bai_viet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `binh_luan`
--

DROP TABLE IF EXISTS `binh_luan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `bai_viet_id` int DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `noi_dung` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`binh_luan_id`),
  KEY `bai_viet_id` (`bai_viet_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `bai_viet` (`bai_viet_id`) ON DELETE CASCADE,
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binh_luan`
--

LOCK TABLES `binh_luan` WRITE;
/*!40000 ALTER TABLE `binh_luan` DISABLE KEYS */;
/*!40000 ALTER TABLE `binh_luan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dat_lich`
--

DROP TABLE IF EXISTS `dat_lich`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dat_lich` (
  `dat_lich_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `dich_vu_id` int NOT NULL,
  `thu_cung_id` int DEFAULT NULL,
  `ngay_dat` date NOT NULL,
  `gio_dat` time NOT NULL,
  `trang_thai` enum('chờ xác nhận','đã xác nhận','đã hủy') CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT 'chờ xác nhận',
  `ten_kh` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `email_kh` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dat_lich_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `dich_vu_id` (`dich_vu_id`),
  KEY `thu_cung_id` (`thu_cung_id`),
  CONSTRAINT `dat_lich_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE,
  CONSTRAINT `dat_lich_ibfk_2` FOREIGN KEY (`dich_vu_id`) REFERENCES `dich_vu` (`dich_vu_id`) ON DELETE CASCADE,
  CONSTRAINT `dat_lich_ibfk_3` FOREIGN KEY (`thu_cung_id`) REFERENCES `thu_cung` (`thu_cung_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dat_lich`
--

LOCK TABLES `dat_lich` WRITE;
/*!40000 ALTER TABLE `dat_lich` DISABLE KEYS */;
INSERT INTO `dat_lich` VALUES (15,1,15,NULL,'2024-12-16','18:00:00','chờ xác nhận','Nguyễn Văn A','nguyenvana@example.com','2024-12-16 23:55:15'),(16,1,15,NULL,'2024-12-17','18:00:00','đã xác nhận','min','nguyenvana@example.com','2024-12-17 00:00:09'),(17,1,15,NULL,'2024-12-17','17:30:00','đã xác nhận','Nguyễn Văn A','nguyenvana@example.com','2024-12-17 00:50:02'),(18,2,15,NULL,'2024-12-17','17:00:00','đã xác nhận','Nguyễn Văn A','minh@gmail.com','2024-12-17 00:51:22'),(19,1,15,NULL,'2024-12-17','16:30:00','chờ xác nhận','Nguyễn Văn A','minh@gmail.com','2024-12-17 08:54:18'),(21,1,15,NULL,'2024-12-17','16:00:00','chờ xác nhận','Nguyễn Văn A','nguyenvana@example.com','2024-12-17 08:59:39'),(22,1,15,NULL,'2024-12-17','15:00:00','chờ xác nhận','Nguyễn Văn A','nguyenvana@example.com','2024-12-17 09:06:05'),(23,2,15,NULL,'2024-12-17','14:30:00','chờ xác nhận','Nguyễn Văn A','minh@gmail.com','2024-12-17 16:27:25'),(25,1,15,NULL,'2024-12-17','15:30:00','chờ xác nhận','minh','nguyenvana@example.com','2024-12-21 10:00:48'),(26,NULL,3,NULL,'2024-12-21','09:00:00','chờ xác nhận','ffffff','minh@gmail.com','2024-12-21 15:53:31'),(27,NULL,3,NULL,'2024-12-28','18:00:00','đã xác nhận','minh','minh@gmail.com','2024-12-28 12:24:55');
/*!40000 ALTER TABLE `dat_lich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dat_phong`
--

DROP TABLE IF EXISTS `dat_phong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dat_phong` (
  `dat_phong_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `ten_khach_hang` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `sdt` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `phong_id` int NOT NULL,
  `ngay_bat_dau` timestamp NOT NULL,
  `ngay_ket_thuc` timestamp NOT NULL,
  `can_nang` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `tien` decimal(10,2) NOT NULL,
  `trang_thai` enum('đang hoạt động','đã hết hạn') CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT 'đang hoạt động',
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dat_phong_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `phong_id` (`phong_id`),
  CONSTRAINT `dat_phong_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE SET NULL,
  CONSTRAINT `dat_phong_ibfk_2` FOREIGN KEY (`phong_id`) REFERENCES `phong` (`phong_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dat_phong`
--

LOCK TABLES `dat_phong` WRITE;
/*!40000 ALTER TABLE `dat_phong` DISABLE KEYS */;
INSERT INTO `dat_phong` VALUES (24,1,'Nguyen Thi A','minh@gmail.com','0956789012',12,'2024-12-14 17:00:00','2024-12-15 17:00:00','0-5kg',120000.00,'đã hết hạn','2024-12-16 16:54:16'),(25,1,'Nguyen Thi A','minh@gmail.com','0956789012',22,'2024-12-15 17:00:00','2024-12-17 17:00:00','0-5kg',240000.00,'đã hết hạn','2024-12-16 16:57:14'),(26,1,'Nguyen Thi A','minh3@gmail.com','0901234567',14,'2024-12-14 17:00:00','2024-12-17 17:00:00','0-5kg',360000.00,'đã hết hạn','2024-12-16 16:59:41'),(27,1,'Nguyen Thi A','nguyenthia@example.com','0956789012',21,'2024-12-16 17:00:00','2024-12-17 17:00:00','0-5kg',120000.00,'đã hết hạn','2024-12-16 17:14:52'),(28,1,'Nguyen Thi A','nguyenthia@example.com','0956789012',21,'2024-12-16 17:00:00','2024-12-17 17:00:00','0-5kg',120000.00,'đã hết hạn','2024-12-16 17:24:57'),(29,1,'Nguyen Thi A','nguyenthia@example.com','0956789012',21,'2024-12-16 17:00:00','2024-12-17 17:00:00','0-5kg',120000.00,'đã hết hạn','2024-12-16 17:29:24'),(30,1,'Nguyen Thi A','minh@gmail.com','0901234567',18,'2024-12-16 17:00:00','2024-12-25 17:00:00','0-5kg',1080000.00,'đã hết hạn','2024-12-16 17:35:40'),(31,1,'Nguyen Thi A','minh@gmail.com','0901234567',18,'2024-12-16 17:00:00','2024-12-25 17:00:00','0-5kg',1080000.00,'đã hết hạn','2024-12-16 17:43:43'),(32,2,'Nguyen Thi A','minh@gmail.com','0956789012',19,'2024-12-16 17:00:00','2024-12-18 17:00:00','0-5kg',240000.00,'đã hết hạn','2024-12-16 17:51:01'),(37,1,'Nguyen Thi A','minh1@gmail.com','0981811944',19,'2024-12-18 17:00:00','2024-12-21 17:00:00','6-10kg',450000.00,'đã hết hạn','2024-12-21 03:02:18'),(38,1,'Nguyen Thi A','minh@gmail.com','0981811947',23,'2024-12-23 17:00:00','2024-12-29 17:00:00','6-10kg',900000.00,'đã hết hạn','2024-12-28 05:39:00'),(39,NULL,'minh','minh@gmail.com','0981811947',24,'2025-02-17 17:00:00','2025-02-18 17:00:00','11-15kg',180000.00,'đang hoạt động','2025-02-18 06:17:59');
/*!40000 ALTER TABLE `dat_phong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dich_vu`
--

DROP TABLE IF EXISTS `dich_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dich_vu` (
  `dich_vu_id` int NOT NULL AUTO_INCREMENT,
  `ten_dich_vu` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `mo_ta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `logo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `gia` decimal(10,2) NOT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dich_vu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dich_vu`
--

LOCK TABLES `dich_vu` WRITE;
/*!40000 ALTER TABLE `dich_vu` DISABLE KEYS */;
INSERT INTO `dich_vu` VALUES (1,'Tắm cho thú cưng','Dịch vụ tắm cho thú cưng với các loại sữa tắm chuyên dụng, giúp lông thú cưng sạch sẽ và thơm tho.','1733580296777-777478237-a-nh-chu-p-ma-n-png',150000.00,'2024-12-07 21:04:28'),(2,'Cắt tỉa lông cho chó','Cắt tỉa lông, tạo kiểu cho chó, giúp chú chó của bạn luôn sạch sẽ và dễ thương.','1733580317659-489081644-a-nh-chu-p-ma-n-png',200000.00,'2024-12-07 21:04:28'),(3,'Chăm sóc sức khỏe định kỳ','Kiểm tra sức khỏe định kỳ cho thú cưng, bao gồm tiêm phòng và xét nghiệm cơ bản.','1733580330316-144182994-a-nh-chu-p-ma-n-png',500000.00,'2024-12-07 21:04:28'),(4,'Cắt móng cho mèo','Cắt móng cho mèo để tránh trường hợp mèo tự làm tổn thương chính mình hoặc người khác.','1734746368709-673692642-a-nh-chu-p-ma-n-png',100000.00,'2024-12-07 21:04:28'),(5,'Điều trị bệnh về da','Chăm sóc và điều trị các bệnh về da như viêm da, ghẻ, nấm cho thú cưng.','1734746380523-656620113-a-nh-chu-p-ma-n-png',300000.00,'2024-12-07 21:04:28'),(6,'Triệt sản cho thú cưng','Triệt sản cho chó và mèo, giúp kiểm soát dân số thú cưng và bảo vệ sức khỏe cho chúng.','1734746390946-32183057-a-nh-chu-p-ma-n-png',600000.00,'2024-12-07 21:04:28'),(7,'Điều trị ký sinh trùng','Điều trị các vấn đề về ký sinh trùng như bọ chét, giun, ve cho thú cưng.','1734746403314-222232651-a-nh-chu-p-ma-n-png',200000.00,'2024-12-07 21:04:28'),(8,'Chăm sóc răng miệng','Chăm sóc răng miệng cho thú cưng, giúp ngừa các bệnh về răng miệng và hôi miệng.','1734746415498-837908256-a-nh-chu-p-ma-n-png',250000.00,'2024-12-07 21:04:28'),(9,'Dịch vụ vận chuyển thú cưng','Vận chuyển thú cưng an toàn đến các địa điểm khác nhau trong và ngoài thành phố.','1734746424498-309217051-a-nh-chu-p-ma-n-png',500000.00,'2024-12-07 21:04:28'),(10,'Khám bệnh tổng quát','Khám bệnh tổng quát cho thú cưng, phát hiện sớm các vấn đề sức khỏe để xử lý kịp thời.','1734746435114-69620792-a-nh-chu-p-ma-n-png',400000.00,'2024-12-07 21:04:28'),(11,'Chăm sóc thú cưng khi chủ vắng nhà','Dịch vụ chăm sóc thú cưng trong thời gian chủ vắng nhà, bao gồm cho ăn, chơi và tắm rửa.','1734746443866-922774279-a-nh-chu-p-ma-n-png',350000.00,'2024-12-07 21:04:28'),(12,'Tư vấn dinh dưỡng cho thú cưng','Dịch vụ tư vấn chế độ dinh dưỡng hợp lý cho thú cưng dựa trên độ tuổi, giống và tình trạng sức khỏe.','1734746452250-568975618-a-nh-chu-p-ma-n-png',150000.00,'2024-12-07 21:04:28'),(13,'Dịch vụ spa cho thú cưng','Dịch vụ spa giúp thư giãn cho thú cưng, bao gồm mát-xa, xông hơi và chăm sóc lông.','1734746463388-907806466-a-nh-chu-p-ma-n-png',600000.00,'2024-12-07 21:04:28'),(14,'Dịch vụ chụp ảnh cho thú cưng','Dịch vụ chụp ảnh cho thú cưng, tạo ra những bức ảnh đẹp để lưu giữ kỷ niệm với thú cưng yêu quý.','1734746475026-231338413-a-nh-chu-p-ma-n-png',300000.00,'2024-12-07 21:04:28'),(15,'Tẩy giun cho thú cưng','Dịch vụ tẩy giun cho thú cưng, giúp bảo vệ sức khỏe thú cưng khỏi các loại giun sán gây hại.','1734746490138-143918630-a-nh-chu-p-ma-n-png',150000.00,'2024-12-07 21:04:28');
/*!40000 ALTER TABLE `dich_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dk_goi_dich_vu`
--

DROP TABLE IF EXISTS `dk_goi_dich_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dk_goi_dich_vu` (
  `dk_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int NOT NULL,
  `goi_dich_vu_id` int NOT NULL,
  `ngay_dk` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ngay_ket_thuc` date DEFAULT NULL,
  `trang_thai` enum('đang hoạt động','hết hạn','đã hủy') CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT 'đang hoạt động',
  PRIMARY KEY (`dk_id`),
  KEY `fk_nguoi_dung_id` (`nguoi_dung_id`),
  KEY `fk_goi_dich_vu_id` (`goi_dich_vu_id`),
  CONSTRAINT `fk_goi_dich_vu_id` FOREIGN KEY (`goi_dich_vu_id`) REFERENCES `goi_dich_vu` (`goi_dich_vu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_nguoi_dung_id` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dk_goi_dich_vu`
--

LOCK TABLES `dk_goi_dich_vu` WRITE;
/*!40000 ALTER TABLE `dk_goi_dich_vu` DISABLE KEYS */;
/*!40000 ALTER TABLE `dk_goi_dich_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goi_dich_vu`
--

DROP TABLE IF EXISTS `goi_dich_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goi_dich_vu` (
  `goi_dich_vu_id` int NOT NULL AUTO_INCREMENT,
  `ten_goi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `mo_ta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `gia_1_thang` decimal(10,2) NOT NULL,
  `gia_6_thang` decimal(10,2) NOT NULL,
  `gia_1_nam` decimal(10,2) NOT NULL,
  PRIMARY KEY (`goi_dich_vu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goi_dich_vu`
--

LOCK TABLES `goi_dich_vu` WRITE;
/*!40000 ALTER TABLE `goi_dich_vu` DISABLE KEYS */;
INSERT INTO `goi_dich_vu` VALUES (1,'ssssssss','dddddd','2024-12-18 01:37:40',1111.00,11111.00,1111111.00);
/*!40000 ALTER TABLE `goi_dich_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don` (
  `hoa_don_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `dat_phong_id` int DEFAULT NULL,
  `dat_lich_id` int DEFAULT NULL,
  `tong_tien` decimal(10,2) NOT NULL,
  `trang_thai` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'chưa thanh toán',
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hoa_don_id`),
  KEY `hoa_don_ibfk_1` (`nguoi_dung_id`),
  KEY `hoa_don_ibfk_2` (`dat_phong_id`),
  KEY `hoa_don_ibfk_3` (`dat_lich_id`),
  CONSTRAINT `hoa_don_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE,
  CONSTRAINT `hoa_don_ibfk_2` FOREIGN KEY (`dat_phong_id`) REFERENCES `dat_phong` (`dat_phong_id`) ON DELETE SET NULL,
  CONSTRAINT `hoa_don_ibfk_3` FOREIGN KEY (`dat_lich_id`) REFERENCES `dat_lich` (`dat_lich_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don` VALUES (9,1,NULL,NULL,240000.00,'da thanh toan','2024-12-17 01:53:41'),(10,1,NULL,19,0.00,'da thanh toan','2024-12-17 01:54:18'),(11,1,NULL,21,150000.00,'da thanh toan','2024-12-17 01:59:39'),(12,1,NULL,22,150000.00,'da thanh toan','2024-12-17 02:06:05'),(13,1,NULL,NULL,120000.00,'da thanh toan','2024-12-17 07:45:13'),(15,2,NULL,23,150000.00,'da thanh toan','2024-12-17 09:27:25'),(16,1,NULL,NULL,500000.00,'chưa thanh toán','2024-12-19 03:26:57'),(17,1,NULL,25,150000.00,'chưa thanh toán','2024-12-21 03:00:48'),(18,1,37,NULL,450000.00,'chưa thanh toán','2024-12-21 03:02:18'),(19,NULL,NULL,26,500000.00,'chưa thanh toán','2024-12-21 08:53:31'),(20,NULL,NULL,27,500000.00,'chưa thanh toán','2024-12-28 05:24:55'),(21,1,38,NULL,300000.00,'chưa thanh toán','2024-12-28 05:39:00'),(22,NULL,39,NULL,180000.00,'chưa thanh toán','2025-02-18 06:17:59');
/*!40000 ALTER TABLE `hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung`
--

DROP TABLE IF EXISTS `nguoi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `ten_dang_nhap` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `mat_khau` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `vai_tro` enum('quản trị','nhân viên','người dùng','cộng tác viên') CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT 'người dùng',
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `sdt` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `gioi_tinh` enum('nam','nữ','khác') CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `avata` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`),
  UNIQUE KEY `ten_dang_nhap` (`ten_dang_nhap`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung`
--

LOCK TABLES `nguoi_dung` WRITE;
/*!40000 ALTER TABLE `nguoi_dung` DISABLE KEYS */;
INSERT INTO `nguoi_dung` VALUES (1,'minh','$2b$10$lCW6QWLemSmbQkbiPwhcd.5Bv8dSF0K58vUE6AG9sCwf4OX/Eibuy','minh@gmail.com','quản trị','2024-12-07 13:32:43','0981811999','nam','1734578933581-986027286-t-i-xu-ng-jpg'),(2,'minh11','$2b$10$UZElqsET4t5/5g6w/ljkPeZVBvDKcumFzeJ1ycqrQkXYdZ8IwIsq2','minh2@gmail.com','người dùng','2024-12-07 13:35:01','0956789012','nam','1733578571123-422733815-about-2-jpg'),(3,'minh2','$2b$10$b1JU.SkO0fcRkkCPHRoaoeNOT8wsrWkHNwKxBhjtUJ1/59PUyQdIy','minh3@gmail.com','người dùng','2024-12-07 13:35:25',NULL,'nam','1733578576840-66507629-about-3-jpg');
/*!40000 ALTER TABLE `nguoi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phong`
--

DROP TABLE IF EXISTS `phong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phong` (
  `phong_id` int NOT NULL AUTO_INCREMENT,
  `so_phong` int NOT NULL,
  `trang_thai_phong` enum('đang trống','đã đặt','đang sửa chữa') CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci DEFAULT 'đang trống',
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`phong_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phong`
--

LOCK TABLES `phong` WRITE;
/*!40000 ALTER TABLE `phong` DISABLE KEYS */;
INSERT INTO `phong` VALUES (1,23,'đang trống','2024-12-07 13:38:02'),(2,2,'đang trống','2024-12-07 13:38:05'),(3,3,'đang trống','2024-12-07 13:38:08'),(4,4,'đang trống','2024-12-07 13:38:11'),(5,5,'đang trống','2024-12-07 13:38:13'),(6,6,'đang trống','2024-12-07 13:38:16'),(7,7,'đang trống','2024-12-07 13:38:18'),(8,8,'đang trống','2024-12-07 13:38:20'),(9,9,'đang trống','2024-12-07 13:38:22'),(10,10,'đang trống','2024-12-07 13:38:24'),(11,11,'đang trống','2024-12-07 13:38:26'),(12,12,'đang trống','2024-12-07 13:38:28'),(13,13,'đang trống','2024-12-07 13:38:30'),(14,14,'đang trống','2024-12-07 13:38:32'),(15,15,'đang trống','2024-12-07 13:38:34'),(16,16,'đang trống','2024-12-07 13:38:36'),(17,17,'đang trống','2024-12-07 13:38:39'),(18,18,'đang trống','2024-12-07 13:38:41'),(19,19,'đã đặt','2024-12-07 13:38:43'),(20,20,'đang trống','2024-12-07 13:38:52'),(21,21,'đang trống','2024-12-07 13:38:55'),(22,22,'đang trống','2024-12-07 13:38:57'),(23,23,'đã đặt','2024-12-07 13:39:02'),(24,24,'đã đặt','2024-12-07 13:39:04');
/*!40000 ALTER TABLE `phong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thu_cung`
--

DROP TABLE IF EXISTS `thu_cung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thu_cung` (
  `thu_cung_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `ten_thu_cung` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `loai_thu_cung` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `giong_thu_cung` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `gioi_tinh` enum('đực','cái') CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`thu_cung_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `thu_cung_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thu_cung`
--

LOCK TABLES `thu_cung` WRITE;
/*!40000 ALTER TABLE `thu_cung` DISABLE KEYS */;
/*!40000 ALTER TABLE `thu_cung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'petcare'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-18 14:29:30
