import React from "react";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedKey: string;
    onMenuClick: (key: string) => void;
    onLogout: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
                                             isOpen,
                                             onClose,
                                             selectedKey,
                                             onMenuClick,
                                             onLogout,
                                         }) => {
    const menuItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Documents", path: "/document" },
        { name: "Instances", path: "/workflow" },
        { name: "Settings", path: "/settings" },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
          fixed md:static z-50
          w-64 h-full
          bg-gradient-to-b from-slate-700 to-slate-800
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
            >
                <div className="flex flex-col h-full py-6">

                    {/* Logo */}
                    <div className="flex items-center gap-3 px-6 mb-8">
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            ⚡
                        </div>
                        <span className="text-xl font-semibold text-white">DocFlow</span>
                    </div>

                    {/* Menu */}
                    <nav className="flex-1 flex flex-col gap-1 px-4">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => onMenuClick(item.path)}
                                className={`
                  flex items-center px-4 py-3 rounded-lg text-sm font-medium transition
                  ${
                                    selectedKey === item.path
                                        ? "bg-blue-500/20 text-white"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                }
                `}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    {/* Bottom actions */}
                    <div className="px-4 pt-4 border-t border-white/10">
                        <button
                            onClick={onLogout}
                            className="w-full px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/10 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
