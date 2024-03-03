export const MOVIE_DETAIL = 'MOVIE_DETAIL'
export const MOVIE = 'MOVIE'
export const AVAILABLE = 'Available'
export const COMING_SOON_MOVIE = 'COMING_SOON'

export const FOOD = 'FOOD'

export const AVAILABLE_SEAT = 'Available'

// Ghế đã được người dùng chọn, đặt và thanh toán thành công.
//Đây là trạng thái khi vé đã được bán và ghế không còn khả dụng cho việc đặt chỗ.
export const SOLD = 'Sold'

// Ghế đã được người dùng chọn và đặt, nhưng chưa thanh toán.
//Trong thời gian đặt ghế, người dùng có quyền hoàn tác đặt ghế hoặc thanh toán để xác nhận.
export const RESERVED = 'Reserved'

//Ghế không khả dụng cho việc đặt chỗ, có thể do nó đã bị đặt trước đó cho một suất chiếu khác
//hoặc vấn đề kỹ thuật khác
export const UNAVAILABLE = 'Unavailable'
export const statusSeat = [AVAILABLE, SOLD, RESERVED, UNAVAILABLE]
export const NORMAL = 'normal'
export const VIP = 'VIP'