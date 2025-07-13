import { fetchCocktailDetails } from "../../../lib/notion";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const cocktailDetails = await fetchCocktailDetails(id);

    return Response.json(cocktailDetails);
  } catch (error) {
    console.error("Error fetching cocktail details:", error);
    return Response.json(
      { error: "Failed to fetch cocktail details" },
      { status: 500 }
    );
  }
}
