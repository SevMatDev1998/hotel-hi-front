import { Toaster } from "react-hot-toast";

const ToastContainer: React.FC = () => {
  return <Toaster
    position="top-right"
    
    toastOptions={{
      success: {
        icon: null, // Removes the default success icon
        style: {
          background: '#589A8F',
          color: '#FFFFFF',
        },
      },
      error: {
        icon: null, // Removes the default error icon
        style: {
          background: '#CD5555',
          color: '#FFFFFF',
        },
      },
    }}
  />
}
export default ToastContainer;