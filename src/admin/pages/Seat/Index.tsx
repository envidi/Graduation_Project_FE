import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import SeatTable from './components/SeatTable'
const SeatAdminPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Quản lý ghế" />

            <div className="flex flex-col gap-10">
                <SeatTable />
            </div>
        </DefaultLayout>
    )

}

export default SeatAdminPage