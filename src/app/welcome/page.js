import { auth, clerkClient } from "@clerk/nextjs/server";

const Welcome = async () => {
	const { userId, sessionClaims } = await auth();
	const { memberId, username } = sessionClaims;

	if (!userId) {
		return <h1>Not logged in</h1>;
	}
	// Initialize the Backend SDK
	// const client = await clerkClient();

	// Get the user's full `Backend User` object
	// const user = await client.users.getUser(userId);

	return (
		<main>
			<h1>Welcome {username}</h1>
			<p>{userId}</p>
			<p>{memberId}</p>
		</main>
	);
};

export default Welcome;
