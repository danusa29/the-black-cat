import { fetchMenuAlt } from "../../lib/notion";

export async function GET() {
  try {
    const menu = await fetchMenuAlt();
    return Response.json(menu);
  } catch (error) {
    console.error("Error fetching alt menu:", error);
    return Response.json(
      { error: "Failed to fetch alt menu" },
      { status: 500 }
    );
  }
}
