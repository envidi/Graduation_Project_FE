import { ConfirmDialog } from '@/admin/components/Confirm'
import { DialogCategory } from '@/admin/pages/Category/components/DialogCategory'
import { Category } from '@/admin/types/category'
import { getAllCategory, removeCategory } from '@/api/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TableCategory = () => {
  const queryClient = useQueryClient()

  const [isOpenConfirm, setOpenConfirm] = useState(false)
  const idDelete = useRef<string>()

  const navigate = useNavigate()
  // fetch category by react-query
  const { data, isLoading, isError } = useQuery<Category[]>({
    queryKey: ['CATEGORY'],
    queryFn: getAllCategory
  })

  // delete category by mutation react-query
  const { mutate } = useMutation({
    mutationFn: removeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CATEGORY', searchTerm] }); // Updated queryKey
      toast.success('Xoa thành công');
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error('Xoa that bai');
    },
  });

  const handleRemoveCategory = () => {
    mutate(idDelete.current!)
    setOpenConfirm(false)
  }

  const handleShowConfirm = (id: string) => {
    idDelete.current = id
    setOpenConfirm(true)
  }
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }
  const filteredData = data.filter((cate) =>
  cate.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  // render
  return (
    <>
      <DialogCategory typeForm="ADD" />
      <div className="rounded-sm border border-stroke bg-primary px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="search">
            <input type="text" style={{width:'100px', border:'1px solid #cdcd', color:'black'}}
             placeholder="Search categories..."
             value={searchTerm}
             onChange={handleSearchChange} />
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-primary-white xl:pl-11">
                  STT
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Category Name
                </th>
                <th className="py-4 px-4 font-medium text-primary-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
            {filteredData.map((cate, index) => (
                <tr key={cate.name}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-primary-white">
                      {index}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{cate.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <DialogCategory typeForm="EDIT" id={cate._id} />

                      <button
                        className="hover:text-primary"
                        onClick={() => handleShowConfirm(cate._id)}
                      >
                        <FaRegTrashCan size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={isOpenConfirm}
        title="Ban co chac muon xoa khong"
        subTitle="Xoa di se khong the khoi phuc"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleRemoveCategory}
      />
    </>
  )
}

export default TableCategory
