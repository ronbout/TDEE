import DashboardNavbar from "@/components/dashboardNavbar";
import DashboardSidebar from "@/components/dashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<div>
				<DashboardNavbar />
				<section>{children}</section>
			</div>
		</SidebarProvider>
	);
}
