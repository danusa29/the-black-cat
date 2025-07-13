import { fetchMenu } from "../../lib/notion";

export async function GET() {
  try {
    const menu = await fetchMenu();
    return Response.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return Response.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}
