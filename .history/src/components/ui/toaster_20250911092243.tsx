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
      {toasts.map(function ({ id, title, description, action, bold, animated, ...props }) {
        return (
          <Toast key={id} {...props} className={`${animated ? 'animate-in slide-in-from-top-full' : ''}`}>
            <div className="grid gap-1">
              {title && <ToastTitle className={bold ? 'font-bold' : ''}>{title}</ToastTitle>}
              {description && (
                <ToastDescription className={bold ? 'font-bold' : ''}>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  )
}
