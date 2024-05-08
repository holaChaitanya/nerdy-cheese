import { Home, Package, Package2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { StartupSettings } from './startupSettings';
import { UpdateSettings } from './updateSettings';
import { AnalyticSettings } from './analyticSettings';
import { FocusSettings } from './focusSettings';

function Settings() {
  const [activeMenu, setActiveMenu] = useState('general');

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Take a Break</span>
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/"
                onClick={() => setActiveMenu('general')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeMenu === 'general' ? 'bg-muted text-primary' : ''
                }`}
              >
                <Home className="h-4 w-4" />
                General
              </Link>
              <Link
                to="/"
                onClick={() => setActiveMenu('focus')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeMenu === 'focus' ? 'bg-muted text-primary' : ''
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                Focus mode
              </Link>
              <Link
                to="/"
                onClick={() => setActiveMenu('rest')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  activeMenu === 'rest' ? 'bg-muted text-primary' : ''
                }`}
              >
                <Package className="h-4 w-4" />
                Rest mode
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {activeMenu === 'general' && (
            <>
              <div className="flex items-center justify-center [&>div]:w-full">
                <StartupSettings />
              </div>
              <div className="flex items-center justify-center [&>div]:w-full">
                <UpdateSettings />
              </div>
              <div className="flex items-center justify-center [&>div]:w-full">
                <AnalyticSettings />
              </div>
            </>
          )}
          {activeMenu === 'focus' && (
            <div className="flex items-center justify-center [&>div]:w-full">
              <FocusSettings />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Settings;
