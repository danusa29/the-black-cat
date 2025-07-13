import { fetchAvailableIngredientsAlt } from "../../lib/notion";

export default async function AltIngredientsPage() {
  const { results: ingredients } = await fetchAvailableIngredientsAlt();

  return (
    <main
      className="max-w-2xl mx-auto py-10 px-4 min-h-screen relative"
      style={{
        background: "linear-gradient(180deg, #e9e5d2 60%, #ffe9a7 100%)",
        borderRadius: "2rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />
      <h1
        className="pb-4 flex items-center justify-center gap-3 text-4xl"
        style={{
          fontFamily: "Pacifico, cursive",
          color: "#fbbf24",
          textShadow: "2px 2px 0 #135b7e",
        }}
      >
        <span role="img" aria-label="Palm Tree">
          🌴
        </span>
        In Stock Ingredients (Alt)
        <span role="img" aria-label="Sun">
          🌞
        </span>
      </h1>
      {/* Wavy SVG divider */}
      <div className="mb-8">
        <svg
          height="24"
          width="100%"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <path
            d="M0 5 Q 25 0, 50 5 T 100 5"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />
        </svg>
      </div>
      <ul className="list-none pl-0 text-lg text-[#135b7e]">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className="flex items-center gap-2 mb-2">
            <span role="img" aria-label="Seashell">
              🐚
            </span>
            {ingredient.properties.Name.title[0]?.plain_text}
          </li>
        ))}
      </ul>
      {/* Beach ball in corner */}
      <span
        className="absolute bottom-6 right-6 text-5xl animate-bounce"
        role="img"
        aria-label="Beach Ball"
        style={{ filter: "drop-shadow(0 2px 4px #135b7e55)" }}
      >
        🏖️
      </span>
    </main>
  );
}
