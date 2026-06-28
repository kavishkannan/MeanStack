import { BookOpen, LayoutDashboard, Users, FolderOpen } from "lucide-react";

import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <SidebarItem
        to="/"
        label="Dashboard"
        icon={<LayoutDashboard size={20} />}
      />
      <SidebarItem to="/books" label="Books" icon={<BookOpen size={20} />} />
      <SidebarItem to="/authors" label="Authors" icon={<Users size={20} />} />
      <SidebarItem
        to="/categories"
        label="Categories"
        icon={<FolderOpen size={20} />}
      />
    </aside>
  );
}

export default Sidebar;
