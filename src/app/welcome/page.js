import { auth, clerkClient } from "@clerk/nextjs/server";

const Welcome = async () => {
	const { userId } = await auth();

	if (!userId) {
		return <h1>Not logged in</h1>;
	}
	// Initialize the Backend SDK
	const client = await clerkClient();

	// Get the user's full `Backend User` object
	const user = await client.users.getUser(userId);

	return (
		<main>
			<h1>Welcome {user.firstName}!</h1>
			<p>{user.id}</p>
			<p>{user.externalId}</p>
		</main>
	);
};

export default Welcome;
