import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from 'react-router-dom';

const Menu = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1224);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onNavItemClick = (path) => {
    navigate(path);
    if (isMobile) setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const isAdmin = userRole === 'admin';

  const navItems = isAdmin
    ? [
        { path: '/main', label: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="http://www.w3.org/2000/svg" width="24px" fill="#FFFFFF"><path d="M242-200h122.69v-248.38h230.62V-200H718v-358L480-737.54 242-558v358Zm-66 66v-457l304-228.54L784-591v457H529.31v-248.38h-98.62V-134H176Zm304-334.77Z"/></svg> },
        { path: '/driver', label: 'Drivers', icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="http://www.w3.org/2000/svg" width="24px" fill="#FFFFFF"><path d="M480-516.62q-59.5 0-100.75-41.25T338-658.62q0-59.5 41.25-100.75T480-800.62q59.5 0 100.75 41.25T622-658.62q0 59.5-41.25 100.75T480-516.62ZM170-154.38v-96.85q0-31.77 16.61-57.7 16.61-25.93 44.62-40.15 60.62-30.15 123.22-45.23 62.6-15.07 125.46-15.07 62.86 0 125.55 15.07 62.69 15.08 123.31 45.23 28.01 14.22 44.62 40.15Q790-283 790-251.23v96.85H170Zm304-334.77Z"/></svg> },
        { path: '/car', label: 'Car', icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="http://www.w3.org/2000/svg" width="24px" fill="#FFFFFF"><path d="M211.23-226v80H144v-329.85L236.46-734h487.08L816-475.6V-146h-67.23v-80H211.23Zm3.39-299.85h530.76L688.46-684H271.54l-56.92 158.15Zm-20.62 50V-276v-199.85Zm101.1 147.54q19.67 0 34.05-14.56 14.39-14.57 14.39-34.23 0-19.67-14.57-34.05-14.56-14.39-34.23-14.39-19.66 0-34.05 14.57-14.38 14.56-14.38 34.23 0 19.66 14.56 34.05 14.57 14.38 34.23 14.38Zm370.16 0q19.66 0 34.05-14.56 14.38-14.57 14.38-34.23 0-19.67-14.56-34.05-14.57-14.39-34.23-14.39-19.67 0-34.05 14.57-14.39 14.56-14.39 34.23 0 19.66 14.57 34.05 14.56 14.38 34.23 14.38ZM194-276h572v-199.85H194V-276Z"/></svg> },
        { path: '/trips', label: 'Trips', icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="http://www.w3.org/2000/svg" width="24px" fill="#FFFFFF"><path d="m290.15-290.15 254.31-125.39 125.39-254.31-254.31 125.39-125.39 254.31ZM480-440q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm.13 352q-81.31 0-152.89-30.86-71.57-30.86-124.52-83.76-52.95-52.9-83.83-124.42Q88-398.55 88-479.87q0-81.56 30.92-153.37 30.92-71.8 83.92-124.91 53-53.12 124.42-83.48Q398.67-872 479.87-872q81.55 0 153.35 30.34 71.79 30.34 124.92 83.42 53.13 53.09 83.67 124.84 30.54 71.74 30.54 153.5 0 81.71-30.54 153.44-30.54 71.73-83.67 124.81-53.13 53.09-124.92 83.42-71.79 30.34-153.34 30.34Z"/></svg> },
        { path: '/invoice', label: 'Invoice', icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="http://www.w3.org/2000/svg" width="24px" fill="#FFFFFF"><path d="M235-82q-43.85 0-74.92-31.08Q129-144.15 129-187.64V-302h122v-552.62l56.77 41.39 58.31-41.39 58.3 41.39 56.77-41.39V-302h122v115.36q0 43.49-31.07 74.57-31.07 31.08-74.92 31.08H235Zm-108.46-85v-90.15h210.92v90.15h96.92v-241.69H145.46v241.69h96.92Zm118.96-189.23v-109.23h58.31v109.23h-58.31Zm117.85-21.92v-166h58.31v166h-58.31Z"/></svg> }
      ]
    : [
        { path: '/trips', label: 'Trips', icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="http://www.w3.org/2000/svg" width="24px" fill="#FFFFFF"><path d="m290.15-290.15 254.31-125.39 125.39-254.31-254.31 125.39-125.39 254.31ZM480-440q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm.13 352q-81.31 0-152.89-30.86-71.57-30.86-124.52-83.76-52.95-52.9-83.83-124.42Q88-398.55 88-479.87q0-81.56 30.92-153.37 30.92-71.8 83.92-124.91 53-53.12 124.42-83.48Q398.67-872 479.87-872q81.55 0 153.35 30.34 71.79 30.34 124.92 83.42 53.13 53.09 83.67 124.84 30.54 71.74 30.54 153.5 0 81.71-30.54 153.44-30.54 71.73-83.67 124.81-53.13 53.09-124.92 83.42-71.79 30.34-153.34 30.34Z"/></svg> }
      ];
    return (
      <>
      {isMobile &&(<div
          className={`fixed top-4 left-4 w-10 h-10 flex items-center justify-center text-white cursor-pointer z-50 ${isMobile ? 'bg-darkslateblue rounded-full' : 'right-7'} ${isMobile ? '' : 'absolute'}`}
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <svg opacity="0.5" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="currentColor"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" opacity="0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
            </svg>
          )}
        </div>)}

        {/* Sidebar */}
        <div
          className={`${
            isMobile
              ? `fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                } ${isOpen ? "w-[280px]" : "w-[60px]"}`
              : `relative flex ${isOpen ? "w-[280px]" : "w-[60px]"}`
          } min-h-screen rounded-3xl shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-col items-center pt-[27.6px] pb-7 pr-[30px] pl-7 box-border text-middle transition-all duration-300 ease-in-out ${className}`}
        >
          <div
          className={`fixed top-4 left-4 w-10 h-10 flex items-center justify-center text-white cursor-pointer z-50 ${isMobile ? 'bg-darkslateblue rounded-full' : 'right-7'} ${isMobile ? '' : 'absolute'}`}
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <svg opacity="0.5" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="currentColor"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" opacity="0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
            </svg>
          )}
        </div>
          {isOpen && (
            <>
            
              {navItems.map((item, index) => (
                <div key={index} className="self-stretch flex flex-row items-start justify-end pt-0 mt-[60px]">
                  <div
                    className={`flex-1 flex flex-row items-start justify-between gap-[20px] p-[10px] rounded-xl cursor-pointer z-[1] ${isActive(item.path) ? 'bg-[#5932EA]' : ''}`}
                    onClick={() => onNavItemClick(item.path)}
                  >
                    {item.icon}
                    <div className="flex-1 relative tracking-[-0.01em] font-medium text-white text-[20px]">
                      {item.label}
                    </div>
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Overlay */}
        {isOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}
      </>
    );
  };

  Menu.propTypes = {
    className: PropTypes.string,
  };

  export default Menu;
