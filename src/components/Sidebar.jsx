import { Link, useLocation } from "react-router";
import { Users, Newspaper, Cat, BookA } from "lucide-react";
import useAuthStore from "../store/auth-store"; 

const navItems = [
  { name: "จัดการข้อมูลอนิเมะ", icon: Cat, to: "/admin-anime" },
  { name: "จัดการข้อมูลมังงะ", icon: BookA, to: "/admin-manga" },
  { name: "จัดการผู้ใช้", icon: Users, to: "/admin-users" },
  { name: "จัดการข่าวสาร", icon: Newspaper, to: "/admin-news" },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuthStore(); 
  return (
    <aside className="w-64 bg-white border-r min-h-screen h-full p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-600 text-white p-3 rounded-full uppercase">
          {user?.name?.[0] || "A"}
        </div>
        <div>
          <p className="font-bold">{user?.username || "ไม่ทราบชื่อ"}</p>
          <p className="text-sm text-gray-500">
            {user?.role === "ADMIN" ? "ผู้ดูแลระบบ" : user?.role || "ไม่ทราบสิทธิ์"}
          </p>
        </div>
      </div>
      <nav className="space-y-2">
        {navItems.map(({ name, icon: Icon, to }, i) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={i}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                isActive ? "bg-gray-200 text-black font-semibold" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon size={18} />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
