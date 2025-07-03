import "./app.css";
import LandingPage from "@/components/landingPage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
	const { userId } = await auth();
	if (userId) {
		redirect("/members");
	}
	return (
		<main>
			<LandingPage />
		</main>
	);
}
