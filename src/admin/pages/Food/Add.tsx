import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormFood from './components/FormFood'

const FoodAdd = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Thêm thực phẩm" />

            <div className="flex flex-col gap-10">
                <FormFood typeForm="ADD" />
            </div>
        </DefaultLayout>
    )
}

export default FoodAdd