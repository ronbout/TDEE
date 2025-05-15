import mysql from "mysql2/promise";

export let connection;

const access = {
	host: process.env.DATABASE_HOST,
	database: process.env.DATABASE_NAME,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
};

async function getConnection() {
	connection = await mysql.createConnection(access);
	return connection;
}

export const dbQuery = async (query) => {
	try {
		const conn = await getConnection();

		const [results] = await conn.query(query);
		conn.destroy();
		// don't want to return some weirdo typescript type, just
		// regular JSON.  Thanks for the extra bullshit, Typescript!
		// const resultsJSON = JSON.parse(JSON.stringify(results));
		return results;
	} catch (error) {
		if (error instanceof Error) {
			return Error(error.message);
		} else {
			return Error("unknown error");
		}
	}
};

export const dbExecute = async (query, sqlParms) => {
	try {
		const conn = await getConnection();

		const [results] = await conn.execute(query, sqlParms);
		conn.destroy();
		// don't want to return some weirdo typescript type, just
		// regular JSON.  Thanks for the extra bullshit, Typescript!
		// const resultsJSON = JSON.parse(JSON.stringify(results));
		return results;
	} catch (error) {
		if (error instanceof Error) {
			return Error(error.message);
		} else {
			return Error("unknown error");
		}
	}
};

export const decodeHtmlEntities = (str) => {
	return str
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&#x2F;/g, "/")
		.replace(/&#x3D;/g, "=");
};

export async function getNutrients(id, ingredFlag) {
	// console.log("id: ", id);
	// console.log("ingredFlag: ", ingredFlag);
	if (!ingredFlag) {
		const nutQuery = `
			SELECT calories, points, fat_grams as fat, carb_grams as carbs, protein_grams as protein, fiber_grams as fiber
				FROM food_detail 
				WHERE id = ${id}`;

		const nutResults = await dbQuery(nutQuery);
		console.log("nutResults: ", nutResults);
		return nutResults[0];
	}
	const nutrients = {
		calories: 0,
		points: 0,
		fat: 0,
		carbs: 0,
		protein: 0,
		fiber: 0,
	};
	const ingredQuery = `
		SELECT ingredient_id, servings, ingredient_flag
			FROM food_detail, food
			WHERE food_detail.ingredient_id = food.id AND food_detail.id = ${id}`;

	const ingredResults = await dbQuery(ingredQuery);

	for (const ingredRow of ingredResults) {
		const ingredNuts = await getNutrients(
			ingredRow["ingredient_id"],
			ingredRow["ingredient_flag"]
		);
		let nutrient;
		for (nutrient in ingredNuts) {
			nutrients[nutrient] += ingredNuts[nutrient] * ingredRow.servings;
		}
	}

	// return ingredResults;
	return nutrients;
}

export async function getFood(id) {
	const query = `
		SELECT f.*, fu.description as food_units 
			FROM food f, food_units fu 
			WHERE fu.id = f.serving_units AND f.id = ${id};`;

	const results = await dbQuery(query);

	if (results.length) {
		results[0].description = decodeHtmlEntities(results[0].description);
		results[0].name = decodeHtmlEntities(results[0].name);
	}

	return results;
}
