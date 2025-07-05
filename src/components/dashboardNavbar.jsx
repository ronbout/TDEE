"use client";

import {
	LogOut,
	Moon,
	Sun,
	Settings,
	User,
	ArrowLeftToLine,
	ArrowRightToLine,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const DashboardNavbar = () => {
	const { theme, setTheme } = useTheme();
	const { toggleSidebar, open } = useSidebar();

	// console.log("theme:", theme);

	return (
		<nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-10">
			{/* LEFT */}
			<div className="flex flex-col">
				<SidebarTrigger />
				{/* <Button variant="outline" size="sm" onClick={toggleSidebar}>
					{open ? <ArrowLeftToLine /> : <ArrowRightToLine />}
				</Button> */}
			</div>
			{/* RIGHT */}
			<div className="flex items-center gap-4">
				<Link href="/">Dashboard</Link>
				{/* THEME MENU */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
							<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setTheme("light")}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				{/* USER MENU */}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar className="cursor-pointer">
							<AvatarImage src="/astronaut_star_cowboy.png" />
							<AvatarFallback>RB</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className="h-[1.2rem] w-[1.2rem] mr-2" />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
							Settings
						</DropdownMenuItem>
						<DropdownMenuItem variant="destructive">
							<LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
};

export default DashboardNavbar;
