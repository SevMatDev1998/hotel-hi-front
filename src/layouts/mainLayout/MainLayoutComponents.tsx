import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { Sidebar } from '../sidebar/Sidebar';

const MainLayoutComponents = () => {

  return (
    <div className="flex h-screen bg-light-gray relative">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayoutComponents;
