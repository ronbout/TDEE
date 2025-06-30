import { getMember } from "@/lib/db";

export async function GET(request) {
	// const { id } = await params;
	const searchParams = request.nextUrl.searchParams;
	const email = searchParams.get("email");

	// return Response.json(
	// 	{ email },
	// 	{
	// 		status: 200,
	// 	}
	// );

	const results = await getMember(email);

	if (!results.length) {
		return Response.json(
			{ count: 0, data: results },
			{
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET",
					"Access-Control-Allow-Headers": "Content-Type",
				},
			}
		);
	}

	const retData = {
		count: results.length,
		data: results[0],
	};

	return Response.json(retData, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}
