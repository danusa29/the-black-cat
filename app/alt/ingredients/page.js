import { fetchAvailableIngredientsAlt } from "../../lib/notion";

export default async function AltIngredientsPage() {
  const { results: ingredients } = await fetchAvailableIngredientsAlt();

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="pb-8">In Stock Ingredients (Alt)</h1>
      <ul className="list-disc pl-6 text-lg text-[#135b7e]">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.properties.Name.title[0]?.plain_text}
          </li>
        ))}
      </ul>
    </main>
  );
}
