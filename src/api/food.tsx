import instance from './config'
export const getAllFood = async () => {
  const result = await instance.get('/food')
  return result.data.datas.docs
}
