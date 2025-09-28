import { Toaster } from "react-hot-toast";

const ToastContainer: React.FC = () => {
  return <Toaster
    position="top-right"
    toastOptions={{
      success: {
        style: {
          background: 'green',
        },
      },
      error: {
        style: {
          background: 'red',
        },
      },
    }}
  />
}
export default ToastContainer;