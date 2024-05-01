/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'

const FooterTable = ({ table }: any) => {
  return (
    <>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          className='text-sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Trước
        </Button>
        <Button
          variant="outline"
          className='text-sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          tiếp
        </Button>
      </div>
    </>
  )
}

export default FooterTable
