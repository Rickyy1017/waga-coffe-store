import { useToast } from "../../hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, bold, animated, ...props }: any) {
        return (
          <Toast key={id} {...props} className={`${animated ? 'animate-in slide-in-from-top-full' : ''}`}>
            <div className="grid gap-1">
              {title && <ToastTitle className={bold ? 'font-bold' : ''}>{title}</ToastTitle>}
              {description && (
                <ToastDescription className={bold ? 'font-semibold' : ''}>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
