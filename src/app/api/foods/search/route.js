import { dbExecute, decodeHtmlEntities } from "@/lib/db";

export async function GET(request) {
	// const { id } = await params;
	const searchParams = request.nextUrl.searchParams;
	const lowerParams = new URLSearchParams(
		Array.from(searchParams, ([key, value]) => [key.toLowerCase(), value])
	);

	// return Response.json(
	// 	{ test: lowerParams.get("searchfoodoption") },
	// 	{
	// 		status: 200,
	// 	}
	// );
	const owner = parseInt(lowerParams.get("owner"));
	const searchOpt = lowerParams.get("searchfoodoption");
	const keyword = lowerParams.get("keyword")
		? `%${lowerParams.get("keyword")}%`
		: "";
	const limit = lowerParams.get("limit")
		? parseInt(lowerParams.get("limit"))
		: 10;

	/**
	 *
	 *
	 *   need to add pagination
	 *
	 *
	 */

	const keywordSql = keyword
		? " AND (f.name LIKE ? OR f.description LIKE ?) "
		: "";
	let sqlParms, query;

	const basicSelect = `(SELECT f.id as foodId, f.name as foodName, f.description as foodDesc, f.owner as ownerId, IFNULL(ROUND(f.serving_size,2),'') as servSize, 
			f.serving_units as servUnits, ROUND(fd.calories,1) as calories, ROUND(fd.fat_grams,1) as fat, ROUND(fd.carb_grams,1) as carbs,
			ROUND(fd.protein_grams,1) as protein, ROUND(fd.fiber_grams,1) as fiber, ROUND(fd.points,1) as points,
			m.user_name as owner, 'Basic Food' as foodType`;

	const recipeSelect = `(SELECT f.id as foodId, f.name as foodName, f.description as foodDesc, f.owner as ownerId, IFNULL(ROUND(f.serving_size,2),'') as servSize, 
											f.serving_units as servUnits, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, m.user_name as owner, 'Food Recipe' as foodType`;

	const selectOwnerBasic = `${basicSelect} 
													FROM food f, food_detail fd, member m
													WHERE f.ingredient_flag = 0
														AND f.id = fd.id 
														AND f.owner = m.member_id
														AND f.owner = ? ${keywordSql})`;

	const selectOwnerRecipe = `${recipeSelect} 
														FROM food f, member m
														WHERE f.ingredient_flag = 1
															AND f.owner = m.member_id
															AND f.owner = ? ${keywordSql})`;

	const selectFavBasic = `${basicSelect} 
													FROM food f, food_detail fd, member m, member_food_favs mf
													WHERE f.ingredient_flag = 0
														AND f.id = fd.id 
														AND f.owner = m.member_id
														AND mf.food_id = f.id
														AND mf.member_id = ? ${keywordSql})`;

	const selectFavRecipe = `${recipeSelect} 
													FROM food f, member m, member_food_favs mf
													WHERE f.ingredient_flag = 1 
														AND f.owner = m.member_id
														AND mf.food_id = f.id
														AND mf.member_id = ? ${keywordSql})`;
	const selectAllBasic = `${basicSelect} 
													FROM food f, food_detail fd, member m
													WHERE f.ingredient_flag = 0
														AND f.id = fd.id 
														AND f.owner = m.member_id ${keywordSql})`;

	const selectAllRecipe = `${recipeSelect} 
														FROM food f, member m
														WHERE f.ingredient_flag = 1
															AND f.owner = m.member_id ${keywordSql})`;

	// figure out which mode we are using
	// this should likely be separated into their own routes rather
	// than a query variable
	switch (searchOpt) {
		case "ownerFoods":
			sqlParms = keyword
				? [
						owner,
						keyword,
						keyword,
						owner,
						keyword,
						keyword,
						owner,
						keyword,
						keyword,
						owner,
						keyword,
						keyword,
				  ]
				: [owner, owner, owner, owner];
			query = `${selectOwnerBasic} UNION ${selectOwnerRecipe} UNION ${selectFavBasic} UNION ${selectFavRecipe}
			ORDER BY foodName LIMIT ${limit}`;
			break;
		case "favFoods":
			sqlParms = keyword
				? [owner, keyword, keyword, owner, keyword, keyword]
				: [owner, owner];
			query = `${selectFavBasic} UNION ${selectFavRecipe}	ORDER BY foodName LIMIT ${limit}`;
			break;
		case "allFoods":
			sqlParms = keyword ? [keyword, keyword, keyword, keyword] : [];
			query = `${selectAllBasic} UNION ${selectAllRecipe}	ORDER BY foodName LIMIT ${limit}`;
		default:
	}

	query = query.replace(/[\n\t]/g, " ").replace(/\s+/g, " ");

	// return Response.json(
	// 	{ sql: query },
	// 	{
	// 		status: 200,
	// 	}
	// );

	let foodResults = await dbExecute(query, sqlParms);

	foodResults.forEach((food, ndx) => {
		foodResults[ndx] = {
			foodName: decodeHtmlEntities(food.foodName),
			foodDesc: decodeHtmlEntities(food.foodDesc),
			...food,
		};
	});

	return Response.json(
		{
			query,
			sqlParms,
			count: foodResults.length,
			data: foodResults,
		},
		{
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers": "Content-Type",
			},
		}
	);

	// const retData = {
	// 	owner,
	// 	searchOpt,
	// 	keyword,
	// };

	// return Response.json(retData, {
	// 	status: 200,
	// });

	// http://localhost:3000/food/search?owner=11&searchfoodoption=allFoods
	// http://localhost:3000/food/search?owner=11&searchfoodoption=allFoods&keyword=egg
	// http://localhost:3000/food/search?owner=11&searchfoodoption=ownerFoods
}
