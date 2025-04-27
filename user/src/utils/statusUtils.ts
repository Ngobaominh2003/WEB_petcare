export const getStatusColor = (status: string | null | undefined): string => {
  if (!status) return "badge-secondary"; // nếu không có trạng thái thì badge xám

  switch (status.toLowerCase()) {
    case "chờ xác nhận":
    case "chờ thanh toán":
      return "badge-pending";
    case "đang thực hiện":
      return "badge-in-progress";
    case "đã xác nhận":
      return "badge-confirmed";
    case "hoàn thành":
      return "badge-completed";
    case "hủy":
    case "đã hủy":
    case "đã hủy thanh toán":
      return "badge-cancelled";
    case "chưa thanh toán":
      return "badge-unpaid";
    case "đã thanh toán":
      return "badge-paid";
    default:
      return "badge-secondary";
  }
};

export const getStatusText = (status: string | null | undefined): string => {
  if (!status) return "Không xác định"; // nếu thiếu trạng thái

  switch (status.toLowerCase()) {
    case "chờ xác nhận":
      return "Chờ xác nhận";
    case "chờ thanh toán":
      return "Chờ thanh toán";
    case "đang thực hiện":
      return "Đang thực hiện";
    case "đã xác nhận":
      return "Đã xác nhận";
    case "hoàn thành":
      return "Hoàn thành";
    case "hủy":
    case "đã hủy":
    case "đã hủy thanh toán":
      return "Đã hủy";
    case "chưa thanh toán":
      return "Chưa thanh toán";
    case "đã thanh toán":
      return "Đã thanh toán";
    default:
      return status;
  }
};
