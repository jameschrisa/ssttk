import * as React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { User, Settings, LogOut, Sliders, UserCircle } from 'lucide-react';

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            to={href}
            {...props}
          >
            <div className="flex items-center gap-2">
              {icon}
              <div>
                <div className="text-sm font-medium leading-none mb-1">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
                </p>
              </div>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const ProfileMenuItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, icon, ...props }, ref) => {
    const isLogout = title.toLowerCase() === 'logout';
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none rounded-md p-3 no-underline outline-none transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              "active:scale-[0.98] active:transition-none",
              isLogout && "hover:bg-destructive/90 hover:text-destructive-foreground",
              className
            )}
            to={href}
            {...props}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center justify-center w-9 h-9 rounded-md transition-colors",
                isLogout 
                  ? "bg-destructive/10 text-destructive hover:bg-destructive/90 hover:text-destructive-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                "group-hover:text-inherit"
              )}>
                {icon}
              </div>
              <div>
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-1 text-xs leading-snug text-muted-foreground mt-1.5 group-hover:text-inherit">
                  {children}
                </p>
              </div>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ProfileMenuItem.displayName = "ProfileMenuItem";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="text-2xl font-bold cursor-pointer" 
              onClick={() => navigate('/')}
            >
              BDTA Tool Kit
            </h1>
            <div className="flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Data Collection</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <ListItem
                          href="/dcm"
                          title="Data Manager"
                        >
                          Manage social media identities, screenshots, and notes.
                        </ListItem>
                        <ListItem
                          href="/assessment/initial"
                          title="Assessment"
                        >
                          Start or continue your assessment process.
                        </ListItem>
                        <ListItem
                          href="/preview"
                          title="Report Preview"
                        >
                          Preview and generate assessment reports.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <ListItem
                          href="/help"
                          title="Help Center"
                        >
                          Access guides and documentation.
                        </ListItem>
                        <ListItem
                          href="/support"
                          title="Support"
                        >
                          Contact support and report issues.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-9 px-4 py-2">
                      <User className="h-4 w-4 mr-2" />
                      <span>Profile</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[280px] p-3">
                        <ul className="grid gap-2">
                          <ProfileMenuItem
                            href="/profile"
                            title="User Profile"
                            icon={<UserCircle className="h-5 w-5" />}
                          >
                            View and edit your profile
                          </ProfileMenuItem>
                          <ProfileMenuItem
                            href="/preferences"
                            title="Preferences"
                            icon={<Sliders className="h-5 w-5" />}
                          >
                            Customize your settings
                          </ProfileMenuItem>
                          <ProfileMenuItem
                            href="/settings"
                            title="Settings"
                            icon={<Settings className="h-5 w-5" />}
                          >
                            System configuration
                          </ProfileMenuItem>
                          <li className="border-t border-border/50 my-2" />
                          <ProfileMenuItem
                            href="/logout"
                            title="Logout"
                            icon={<LogOut className="h-5 w-5" />}
                          >
                            Sign out of your account
                          </ProfileMenuItem>
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BDTA Tool Kit. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
