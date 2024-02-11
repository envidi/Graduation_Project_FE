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
