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

type ConfirmDialogProps = {
  open: boolean
  title: string
  subTitle: string
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  title,
  subTitle,
  onCancel,
  onConfirm
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{subTitle}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Hủy bỏ </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Tiếp tục </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
