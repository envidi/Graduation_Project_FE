import { Product } from '../../types/product';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';

const productData: Product[] = [
  // ... (giữ nguyên dữ liệu sản phẩm)
];

const TableTwo = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 text-black dark:text-black">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium text-black dark:text-white">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium text-black dark:text-white">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black dark:text-white">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black dark:text-white">Sold</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black dark:text-white">Profit</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.image} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center" style={{color:'black '}}>
            <p className="text-sm text-black dark:text-white" style={{color:'black '}}>${product.price}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.profit}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
