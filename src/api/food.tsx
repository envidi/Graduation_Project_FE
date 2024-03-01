import instance from './config'
export const getAllFood = async () => {
  const result = await instance.get('/food')
  console.log(result)
  return result.data.datas.docs
}
