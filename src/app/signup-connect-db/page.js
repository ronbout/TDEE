import { addUser } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SignupConnectDb = async () => {
	const { userId } = await auth();

	if (!userId) {
		redirect("/");
	}
	// console.log(user);
	// // Initialize the Backend SDK
	const client = await clerkClient();

	// Get the user's full `Backend User` object
	const user = await client.users.getUser(userId);

	if (user.externalId) {
		redirect("/");
	}

	// if (!user.externalId) {
	// 	client.users.updateUser(userId, { externalId: "35" });
	// }

	const { id, firstName, lastName, username, emailAddresses } = user;
	const email = emailAddresses[0].emailAddress;

	const result = await addUser({ id, firstName, lastName, username, email });
	const externalId = result.insertId.toString();
	await client.users.updateUser(userId, { externalId });
	redirect("/welcome");

	return (
		<div>
			<h1>hey! Glad you could make it.</h1>
			{JSON.stringify(user)}
			{JSON.stringify(result)}
		</div>
	);
};

export default SignupConnectDb;
