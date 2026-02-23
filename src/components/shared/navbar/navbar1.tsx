"use client";

import { Book, Menu, Sunset, Trees, Zap, LogIn, UserPlus } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "../ModeChange/ModeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "",
    alt: "logo",
    title: "Tutor House",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },

    {
      title: "Tutors",
      url: "/tutor",
    },
    {
      title: "About Us",
      url: "/about",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
  return (
    <section
      className={cn(
        "py-4 sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40 shadow-sm",
        className,
      )}
    >
      <div className="container mx-auto px-6 lg:px-10">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            {/* Fancy Logo */}
            <Link
              href={logo.url}
              className="group flex items-center gap-2 relative"
            >
              <span className="text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300% tracking-tight hover:scale-105 transition-transform duration-300">
                Tutor House
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 group-hover:w-full transition-all duration-500"></div>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Auth Buttons - Desktop */}
          <div className="flex gap-3">
            {/* Login Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="relative overflow-hidden group border-2 hover:border-purple-500 transition-all duration-300"
            >
              <Link
                href={auth.login.url}
                className="relative z-10 flex items-center gap-2"
              >
                <LogIn className="size-4" />
                <span className="group-hover:text-purple-600 transition-colors duration-300">
                  {auth.login.title}
                </span>
              </Link>
            </Button>
            {/* Signup Button */}
            <Button
              asChild
              size="sm"
              className="relative overflow-hidden group bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <Link
                href={auth.signup.url}
                className="relative z-10 flex items-center gap-2"
              >
                <UserPlus className="size-4" />
                {auth.signup.title}
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between ">
            {/* Fancy Logo Mobile */}
            <Link href={logo.url} className="flex items-center gap-2 ">
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300% tracking-tight ">
                Tutor House
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:scale-110 transition-transform duration-300 hover:border-purple-500"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto backdrop-blur-xl bg-background/95">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <span className="text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300% tracking-tight">
                        Tutor House
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* Auth Buttons - Mobile */}
                  <div className="flex flex-col gap-3">
                    {/* Login Button */}
                    <Button
                      asChild
                      variant="outline"
                      className="border-2 hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
                    >
                      <Link
                        href={auth.login.url}
                        className="flex items-center gap-2"
                      >
                        <LogIn className="size-4" />
                        {auth.login.title}
                      </Link>
                    </Button>
                    {/* Signup Button */}
                    <Button
                      asChild
                      className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      <Link
                        href={auth.signup.url}
                        className="flex items-center gap-2"
                      >
                        <UserPlus className="size-4" />
                        {auth.signup.title}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="group relative hover:text-purple-600 transition-colors duration-300">
          {item.title}
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></div>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover/95 backdrop-blur-xl text-popover-foreground border border-border/50 shadow-xl animate-in fade-in-0 zoom-in-95">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className="group relative inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-600 hover:scale-105"
        >
          {item.title}
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></div>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline hover:text-purple-600 transition-colors duration-300">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="text-md font-semibold hover:text-purple-600 transition-colors duration-300 hover:translate-x-1 inline-block"
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex min-w-80 flex-row gap-4 rounded-lg p-4 leading-none no-underline transition-all duration-300 outline-none select-none hover:bg-linear-to-r hover:from-purple-50 hover:via-pink-50 hover:to-blue-50 dark:hover:from-purple-950/30 dark:hover:via-pink-950/30 dark:hover:to-blue-950/30 hover:shadow-md hover:scale-[1.02] group border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
      href={item.url}
    >
      <div className="text-foreground group-hover:text-purple-600 transition-colors duration-300 group-hover:scale-110 transform">
        {item.icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold group-hover:text-purple-600 transition-colors duration-300">
          {item.title}
        </div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar1 };
