import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import SeatForm from './components/SeatForm'

const SeatEdit = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Seat" />

            <div className="flex flex-col gap-10">
                <SeatForm typeForm="EDIT" />
            </div>
        </DefaultLayout>
    )
}

export default SeatEdit