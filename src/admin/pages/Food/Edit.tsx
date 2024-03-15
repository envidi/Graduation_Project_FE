import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormFood from './components/FormFood'

const FoodEdit = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Food" />

            <div className="flex flex-col gap-10">
                <FormFood typeForm="EDIT" />
            </div>
        </DefaultLayout>
    )
}

export default FoodEdit