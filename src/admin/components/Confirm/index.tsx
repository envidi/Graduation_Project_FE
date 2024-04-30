import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

// type ConfirmDialogProps = {
//   open?: boolean
//   title: string
//   subTitle: string
//   onCancel: () => void
//   onConfirm: () => void
// }

export function ConfirmDialog({
  open,
  title,
  subTitle,
  onCancel,
  onConfirm
}: any) {
  return (
    <AlertDialog open={open}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent className='w-fit'>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{subTitle}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-sm' onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-500 text-sm' onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
