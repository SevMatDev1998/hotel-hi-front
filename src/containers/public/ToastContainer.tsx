import toast, { Toaster, ToastBar } from "react-hot-toast";

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
  >
    {(t) => (
      <ToastBar toast={t}>
        {({ message }) => (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ flex: 1 }}>{message}</div>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '0 8px',
                marginLeft: '12px',
              }}
            >
              ×
            </button>
          </div>
        )}
      </ToastBar>
    )}
  </Toaster>
}
export default ToastContainer;