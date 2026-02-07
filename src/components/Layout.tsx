import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, History, LineChart, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', label: t('history_title').includes('History') ? 'Home' : 'முகப்பு', icon: Home },
    { path: '/history', label: t('history_title'), icon: History },
    { path: '/add', label: t('add_title'), icon: PlusCircle, isMain: true },
    { path: '/insights', label: t('insights_title'), icon: LineChart },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center px-6 justify-between border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">I</div>
          <span className="text-xl font-display font-bold">{t('app_name')}</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('en')} className={cn(language === 'en' && "bg-accent font-bold")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('ta')} className={cn(language === 'ta' && "bg-accent font-bold")}>
              தமிழ் (Tamil)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="flex-1 pt-20 pb-24 px-4 max-w-2xl mx-auto w-full">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-20 glass border-t z-50 px-6 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          if (item.isMain) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground -mt-10 shadow-lg item-transition hover:scale-110",
                  isActive && "ring-4 ring-primary/20"
                )}
              >
                <Icon size={28} />
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 item-transition p-2 rounded-xl",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={24} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
