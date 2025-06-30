import { getNutrients, getFood } from "@/lib/db";

export async function GET(_request, { params }) {
	const { id } = await params;

	const results = await getFood(id);

	if (!results.length) {
		return Response.json(
			{ count: 0, data: results },
			{
				status: 200,
			}
		);
	}

	const ingredFlag = results[0]["ingredient_flag"];
	const nutResults = await getNutrients(id, ingredFlag);

	results[0].nutrients = nutResults;

	const retData = {
		count: results.length,
		data: results,
	};

	return Response.json(retData, {
		status: 200,
	});
}
