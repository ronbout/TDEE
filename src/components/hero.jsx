import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
	return (
		<section className="hero">
			<div className="container text-center">
				<h1 className="text-4xl font-medium mb-2">TDEE Calorie Meter</h1>
				<p className="text-xl font-medium">Track Calories In. Calories Out.</p>
				<p className="text-xl font-medium">Achieve the best version of YOU.</p>
				<Link href="/signup">
					<Button className="text-lg mt-4 cursor-pointer" variant="destructive">
						Sign Up
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default Hero;
