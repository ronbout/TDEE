import Link from "next/link";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "./ui/sidebar";

import {
	Apple,
	Calendar,
	ChevronUp,
	ChevronDown,
	CookingPot,
	Home,
	Inbox,
	Plus,
	Search,
	Settings,
	SquareDashedKanban,
	User2,
	Users,
	MoreHorizontal,
} from "lucide-react";

const mealsItems = [
	{
		title: "Entry/Update",
		url: "/",
		icon: Calendar,
	},
	{
		title: "View Reports",
		url: "/",
		icon: Inbox,
	},
];

const DashboardSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader className="py-4">
				<h1>User Menu</h1>
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent>
				<Collapsible defaultOpen className="group/collapsible">
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								Meals
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									{mealsItems.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton asChild>
												<Link href={item.url}>
													<item.icon />
													<span>{item.title}</span>
												</Link>
											</SidebarMenuButton>
											{item.title === "Inbox" && (
												<SidebarMenuBadge>42</SidebarMenuBadge>
											)}
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
			</SidebarContent>
		</Sidebar>
	);
};

export default DashboardSidebar;
