import { TicketBill } from '@/Interface/ticket'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { convertNumberToAlphabet } from '@/utils/seatAlphaIndex'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

export const columns: ColumnDef<TicketBill>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'movieId?.image',
    header: 'Ảnh',
    cell: ({ row }) => {
      const { movieId } = row.original
      return <img src={movieId?.image} width={50} />
    }
  },
  {
    accessorKey: 'movieId?.name',
    header: 'Tên phim',
    cell: ({ row }) => {
      return <div>{row?.original?.movieId?.name}</div>
    }
  },
  // {
  //     accessorKey: "movieId?.categoryId",
  //     header: "Tên phim",
  //     cell: ({ row }) => {
  //         const data=row?.original?.movieId?.categoryId
  //         return <div>{data[0].name}</div>;
  //     },
  // },
  {
    accessorKey: 'SeatId',
    header: 'Tên ghế',
    cell: ({ row }) => {
      const data = row?.original?.seatId
      return (
        <div className="w-20">
          {convertNumberToAlphabet(data[0]?.row)}
          {data[0]?.column}
        </div>
      )
    }
  },

  {
    accessorKey: 'SeatId[0]?.typeSeat',
    header: 'Loại Ghế',
    cell: ({ row }) => {
      const data = row?.original?.seatId
      return <div className="w-20">{data[0]?.typeSeat}</div>
    }
  },
  {
    accessorKey: 'userId?.name',
    header: 'Khách hàng',
    cell: ({ row }) => {
      return <div className="w-35">{row?.original?.userId?.name}</div>
    }
  },
  //   {
  //     accessorKey: 'cinemaId?.CinemaName',
  //     header: 'Tên rạp',
  //     cell: ({ row }) => {
  //       return <div>{row?.original?.cinemaId?.CinemaName}</div>
  //     }
  //   },
  //   {
  //     accessorKey: 'cinemaId?.CinemaAdress',
  //     header: 'Địa Chỉ',
  //     cell: ({ row }) => {
  //       return <div>{row?.original?.cinemaId?.CinemaAdress}</div>
  //     }
  //   },
  {
    accessorKey: 'screenRoomId?.name',
    header: 'Tên phòng',
    cell: ({ row }) => {
      return <div className="w-25">{row?.original?.screenRoomId?.name}</div>
    }
  },
  //   {
  //     accessorKey: 'foods',
  //     header: 'Tên đồ ăn',
  //     cell: ({ row }) => {
  //       const data = row?.original?.foods
  //       const foodName = data[0]?.name
  //       return <div>{foodName}</div>
  //     }
  //   },
  {
    accessorKey: 'showtimeId',
    header: 'Thơi gian chiếu',
    cell: ({ row }) => {
      const timeFrom = row?.original?.showtimeId?.timeFrom
      const formattedTime = timeFrom
      return <div className="w-45">{formattedTime}</div>
    }
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('quantity'))
      return <div className="font-medium w-20 text-center">{amount}</div>
    }
  },
  {
    accessorKey: 'totalPrice',
    header: 'Giá',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('totalPrice'))

      // Format the amount as a VNĐ amount
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    }
  },
  //   {
  //     accessorKey: ' paymentId?.typeBank',
  //     header: 'Loại Ngân Hàng',
  //     cell: ({ row }) => {
  //       return <div>{row?.original?.paymentId?.typeBank}</div>
  //     }
  //   },
  //   {
  //     accessorKey: ' paymentId?.typePayment',
  //     header: 'Loại Thanh Toán',
  //     cell: ({ row }) => {
  //       return <div>{row?.original?.paymentId?.typePayment}</div>
  //     }
  //   },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const { status } = row?.original || {}
      // return <div>{status ? "Checked" : "unchecked"}</div>;
      return <div>{status}</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className=''>
            <Button variant="ghost" className="h-8 w-8 p-0 ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className='text-sm px-3 py-2'>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-sm px-3 py-2'>Xóa Cứng</DropdownMenuItem>
            <DropdownMenuItem className='text-sm px-3 py-2'>Xóa Mềm</DropdownMenuItem>
            <DropdownMenuItem className='text-sm px-3 py-2'>
              <Link to={`/admin/tickets/detail/${row.original._id}`}>Chi tiết</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
