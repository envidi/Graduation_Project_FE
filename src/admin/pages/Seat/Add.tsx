import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import SeatForm from './components/SeatForm'

const SeatAdd = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Seat" />

            <div className="flex flex-col gap-10">
                <SeatForm typeForm="ADD" />
            </div>
        </DefaultLayout>
    )
}

export default SeatAdd