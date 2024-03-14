'use client'

import * as React from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export function CalendarDateRangePicker({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20)
  })

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarDays className="mr-2 h-6 w-6" />
            {date?.from ? (
              date.to ? (
                <div className="text-2xl">
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </div>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            classNames={{
              head_cell:
                'lg:w-16 md:w-16 md:h-16 sm:w-20 xs:w-20 sm:text-3xl xs:text-2xl font-normal md:text-2xl',
              cell: 'lg:h-16 lg:w-16 md:w-16 md:h-16 sm:h-24 sm:w-24 xs:h-20 xs:w-20 text-center rounded-md text-xl p-0 ',
              day: 'lg:h-16 lg:w-16 md:w-16 md:h-16 sm:h-24 sm:w-24 xs:h-20 xs:w-20 sm:text-3xl xs:text-2xl p-0 md:text-2xl font-normal',
              nav_button: 'text-black h-8 w-8'
            }}
            components={{
              IconLeft: () => <ChevronLeft className="h-8 w-8" />,
              IconRight: () => <ChevronRight className="h-8 w-8" />
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
