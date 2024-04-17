import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableFood from './components/TableFood'
const FoodAdminPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Quản lý đồ ăn trong kho" />

            <div className="flex flex-col gap-10">
                <TableFood />
            </div>
        </DefaultLayout>
    )

}

export default FoodAdminPage