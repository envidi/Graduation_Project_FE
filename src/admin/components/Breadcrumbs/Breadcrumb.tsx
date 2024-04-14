import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  pageName: string
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black">
        {pageName}
      </h2>
    </div>
  );
};
