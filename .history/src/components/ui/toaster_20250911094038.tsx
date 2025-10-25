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
          <Toast key={id} {...props} className={`${animated ? 'animate-in slide-in-from-top-full' : ''} max-w-3xl bg-white min-w-[400px] min-h-[200px] p-8 rounded-lg shadow-lg`}>
            <div className="grid gap-4">
              {title && <ToastTitle className={bold ? 'font-bold text-2xl' : 'text-xl'}>{title}</ToastTitle>}
              {description && (
                <ToastDescription className={bold ? 'font-bold text-lg' : 'text-base'}>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-auto sm:right-auto sm:top-auto sm:flex-col md:max-w-[800px]" />
    </ToastProvider>
  )
}
