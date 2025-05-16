import { NavLink } from "react-router-dom";
import { useState } from "react";
import { 
  BarChart3, 
  Table, 
  Menu as MenuIcon, 
  Users, 
  DollarSign,
  ChevronRight,
  ChevronLeft 
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const navItems = [
    { name: "Analytics", path: "/", icon: <BarChart3 size={20} /> },
    { name: "Tables", path: "/tables", icon: <Table size={20} /> },
    { name: "Menu", path: "/menu", icon: <MenuIcon size={20} /> },
    { name: "Employee", path: "/employee", icon: <Users size={20} /> },
    { name: "Cost", path: "/cost", icon: <DollarSign size={20} /> },
  ];

  return (
    <aside className={`h-screen fixed transition-all duration-300 ${collapsed ? "w-20" : "w-64"} bg-gray-800 text-gray-100 flex flex-col shadow-lg`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <div className="text-xl font-semibold text-gray-100">Hotel Management</div>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center mb-3 px-4 py-3 rounded-md transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-700 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <div className="flex items-center">
              <span className="text-gray-400">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </div>
          </NavLink>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-500">
        {!collapsed && <div>© 2025 Company Name</div>}
      </div>
    </aside>
  );
};

export default Sidebar;