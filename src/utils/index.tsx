import { MovieType } from '@/Interface/movie'
import { MyObjectComment } from '@/hooks/useNode'

export function countComments(comment: MyObjectComment): number {
  let count = 1 // Bắt đầu từ 1 để tính cả chính đối tượng cha
  if (comment.items) {
    for (const subComment of comment.items) {
      count += countComments(subComment) // Đệ quy cho từng phần tử con
    }
  }
  return count
}
// Lấy giờ không lấy ngày VD 19:30
export const getHourAndMinute = (date: string) => {
  if (date.toString().length === 0) {
    return
  }
  const hourAndMinute = date.split(' ')[1]
  return hourAndMinute
}
export const convertAmPm = (date: string | undefined) => {
  if (date === undefined) return
  const [gio, phut] = date.split(':')

  // Chuyển đổi giờ sang số nguyên
  let hour = parseInt(gio, 10)

  // Xác định AM hoặc PM
  const buoi = hour >= 12 ? 'PM' : 'AM'

  // Chuyển đổi giờ sang định dạng 12 giờ
  hour = hour % 12 || 12

  // Định dạng giờ và phút thành chuỗi "hh:mm AM/PM"
  const gioPhutDinhDang =
    gio.toString().padStart(2, '0') + ':' + phut.padStart(2, '0') + ' ' + buoi
  return gioPhutDinhDang
}
// Lấy ngày không lấy giờ VD 12-09-2023
export const getDay = (date: string | undefined) => {
  if (date === undefined) return
  if (date.toString().length === 0) {
    return
  }
  return date.split(' ')[0]
}
// Chuyển ngày sang định dạng chữ August 19, 2023
export function chuyenDoiNgayDauVao(inputDate: string | undefined) {
  if (inputDate === undefined) return
  // Tách ngày, tháng và năm từ chuỗi đầu vào
  const [ngay, thang, nam] = inputDate.split('-')

  // Tạo đối tượng Date từ ngày, tháng và năm
  const dateObj = new Date(Number(nam), Number(thang) - 1, Number(ngay)) // Tháng bắt đầu từ 0

  // Định dạng lại ngày thành chuỗi "MMM dd, yyyy"
  const ngayDinhDang = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return ngayDinhDang
}
// Lấy ngày theo lịch
export function selectCalendar(inputDate: Date | undefined) {
  if (inputDate === undefined) return
  // Tạo đối tượng Date từ chuỗi ngày đầu vào
  const dateObj = new Date(inputDate)

  // Lấy ngày, tháng và năm từ đối tượng Date
  const ngay = dateObj.getDate()
  const thang = dateObj.getMonth() + 1 // Tháng bắt đầu từ 0
  const nam = dateObj.getFullYear()

  // Lấy giờ và phút từ đối tượng Date
  const gio = dateObj.getHours()
  const phut = dateObj.getMinutes()

  // Định dạng lại ngày và giờ thành chuỗi "dd-MM-yyyy HH:mm"
  const ngayDinhDang =
    ngay.toString().padStart(2, '0') +
    '-' +
    thang.toString().padStart(2, '0') +
    '-' +
    nam
  const gioPhutDinhDang =
    gio.toString().padStart(2, '0') + ':' + phut.toString().padStart(2, '0')

  // Tạo chuỗi kết quả
  const ketQua = ngayDinhDang + ' ' + gioPhutDinhDang

  return ketQua
}
export const checkSlidePerView = (data: MovieType[], slide: number) => {
  return data?.length > 0
    ? data.length
    : data?.length > 5
      ? slide
      : data?.length
}
export function convertMintuteToHour(phut: number) {
  // Tính số giờ
  const gio = Math.floor(phut / 60)

  // Tính số phút còn lại sau khi chia lấy dư
  const phutConLai = phut % 60
  if (phutConLai === 0) {
    return gio + 'h '
  }

  // Trả về chuỗi kết quả
  return gio + 'h ' + phutConLai + 'm'
}