import {  TicketBill } from "@/Interface/ticket";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { convertNumberToAlphabet } from "@/utils/seatAlphaIndex";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<TicketBill>[] = [
    
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value:any) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value:any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "movieId?.image",
        header: "Ảnh",
        cell: ({ row }) => {
          
            const { movieId } = row.original;
            return <img src={movieId?.image} width={50} />;
        },
    },
  {
      accessorKey: "movieId?.name",
      header: ({ column }) => (
          <Button
              variant="ghost"
              onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc" ? true : false)
              }
          >
              Tên ghế
              <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      ),
      cell: ({ row }) => {
        const data =row?.original?.movieId
          return <div>{data.getValue('name')}</div>;
      },
  },
    {
        accessorKey: "SeatId",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Tên ghế
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        // sortType: "basic",
        // sortDescFirst: false,
        cell: ({ row }) => (
          <div>
            {convertNumberToAlphabet(row.original.seatId[0]?.row)}
            {row.original.seatId[0]?.column}
          </div>
        ),
      },
    {
        accessorKey: "SeatId[0]?.typeSeat",
        header: "Loại Ghế",
        cell: ({ row }) => {
            const data= row?.original?.seatId;
            return <div>{data[0]?.typeSeat}</div>;
        },
    },
    {
        accessorKey: "userId?.name",
        header: "Name",
        cell: ({ row }) => {
            console.log(row)
            return <div>{row?.original?.userId?.name}</div>;
        },
    },
    {
        accessorKey: "cinemaId?.CinemaName",
        header: "Tên rạp",
        cell: ({ row }) => {
            return <div>{row?.original?.cinemaId?.CinemaName}</div>;
        },
    },
    {
        accessorKey: "cinemaId?.CinemaAdress",
        header: "Địa Chỉ",
        cell: ({ row }) => {
            return <div>{row?.original?.cinemaId?.CinemaAdress}</div>;
        },
    },
    {
        accessorKey: "screenRoomId?.name",
        header: "Tên phòng",
        cell: ({ row }) => {
            return <div>{row?.original?.screenRoomId?.name}</div>;
        },
    },
    {
        accessorKey: "foods",
        header: "Tên đồ ăn",
        cell: ({ row }) => {
            const data =row?.original?.foods
            const foodName  = data[0]?.name 
            return <div>{foodName}</div>;
        },
    },
    {
        accessorKey: "showtimeId",
        header: "Thơi gian chiếu",
        cell: ({ row }) => {
            const timeFrom=row?.original?.showtimeId?.timeFrom
            const formattedTime= timeFrom
              return <div>{formattedTime}</div>;
        },
    },
    {
        accessorKey: "quantity",
        header: "Số lượng",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("quantity"));
            return <div className="font-medium">{amount}</div>;
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Giá",
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("totalPrice"));
      
          // Format the amount as a VNĐ amount
          const formatted = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(amount);
      
          return <div className="font-medium">{formatted}</div>;
        },
      },
    {
        accessorKey: " paymentId?.typeBank",
        header: "Loại Ngân Hàng",
        cell: ({ row }) => {
            return <div>{row?.original?.paymentId?.typeBank}</div>;
        },
    },
    {
        accessorKey: " paymentId?.typePayment",
        header: "Loại Thanh Toán",
        cell: ({ row }) => {
            return <div>{row?.original?.paymentId?.typePayment}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const { status } = row?.original || {};
            // return <div>{status ? "Checked" : "unchecked"}</div>;
            return <div>{status}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                   <DropdownMenuItem>Xóa Cứng</DropdownMenuItem>
                        <DropdownMenuItem>
                           Xóa Mềm
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
