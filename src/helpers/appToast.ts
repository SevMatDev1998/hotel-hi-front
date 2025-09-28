import toast, { ToastOptions } from "react-hot-toast"

type StatusType = keyof Pick<typeof toast, "success" | "error">

const appToast = async (status: StatusType, message: string, options?: ToastOptions) => {

  const duration = options?.duration || 1000;
  toast[status](message, { ...options, duration })
  await new Promise((resolve) => setTimeout(resolve, duration));

}

export default appToast