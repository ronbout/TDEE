"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowDownToLine, Calculator } from "lucide-react";
const FoodLookup = () => {
	return (
		<main className="w-full p-4">
			<h1 className="my-2">This is the Food Lookup Page</h1>
			<Button
				variant="destructive"
				className="cursor-pointer m-2 rounded-full"
				onClick={() => alert("test")}
			>
				Test
			</Button>
			<Button
				variant="success"
				size="lg"
				className="cursor-pointer m-2"
				onClick={() => alert("test")}
			>
				<ArrowDownToLine />
			</Button>
			<Button
				size="icon"
				className="cursor-pointer m-2"
				onClick={() => alert("test")}
			>
				<Calculator />
			</Button>
			<Card className="w-[350px] my-2 dark">
				<CardHeader>
					<CardTitle>Create project</CardTitle>
					<CardDescription>
						Deploy your new project in one-click.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Name of your project" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="framework">Framework</Label>
								<Select>
									<SelectTrigger id="framework">
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent position="popper">
										<SelectItem value="next">Next.js</SelectItem>
										<SelectItem value="sveltekit">SvelteKit</SelectItem>
										<SelectItem value="astro">Astro</SelectItem>
										<SelectItem value="nuxt">Nuxt.js</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">Cancel</Button>
					<Button>Deploy</Button>
				</CardFooter>
			</Card>
		</main>
	);
};

export default FoodLookup;
