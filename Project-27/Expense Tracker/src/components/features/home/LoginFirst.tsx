import { LogInIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function LoginFirst() {
    const navItems = [
      { to: '/', icon: Home, label: 'Home', shortcut: 'Alt+H' },
      { to: '/analysis', icon: BarChart3, label: 'Analysis', shortcut: 'Alt+A' },
      { to: '/report', icon: FileText, label: 'Reports', shortcut: 'Alt+R' },
      { to: '/receipt', icon: Receipt, label: 'Receipts', shortcut: 'Alt+C' },
      { to: '/user', icon: User, label: 'Profile', shortcut: 'Alt+U' },
    ];
  return (
    <div className='min-h-screen min-w-[100vw] justify-center items-center flex'>
      <h1 className="font-bold text-primary">Login first to make the app functionable.</h1>
      <div className="space-y-2 mb-8">
              {navItems.map(({ to, icon: Icon, label, shortcut }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="flex-1">{label}</span>
                  <span className="text-xs opacity-60 group-hover:opacity-100">
                    {shortcut}
                  </span>
                </NavLink>
              ))}
            </div>
    </div>
  )
}
