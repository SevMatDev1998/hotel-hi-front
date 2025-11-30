import React from 'react';
import { Provider } from 'react-redux';
import {  RouterProvider } from 'react-router-dom';
import ToastContainer from './containers/public/ToastContainer';
import ModalProvider from './providers/ModalProvider';
import router from './routes/Routers';
import store from './store/store';



const App: React.FC = () => {
  return (
    <Provider store={store}>
        <ModalProvider>
        <RouterProvider router={router} />
        </ModalProvider>
      <ToastContainer  />
    </Provider>

  );
};


export default App;
