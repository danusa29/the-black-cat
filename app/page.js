import Image from "next/image";
import { fetchMenu, notion } from "./lib/notion";

export default async function Home() {
    // Fetch the menu data from the Notion database
    const menu = await fetchMenu();
    console.log(JSON.stringify(menu, null, 4));

    return (
        <main className="max-w-7xl mx-auto my-auto pt-10 pb-10 pl-4 pr-4">
            <h1 class="pb-14">The Black Cat</h1>
            {menu.map(({ name, cocktails }) =>
                // Check if the category has any cocktails
                cocktails.length ? (
                    <section class="pb-9" key={name}>
                        <h2 class="pb-5">// {name}</h2>
                        {cocktails.map(({ title, top_tier, notes, glass }) => (
                            <div
                                className={
                                    // Add padding bottom if the cocktail has notes
                                    notes ? "[&:not(:last-child)]:pb-5" : ""
                                }
                                key={title}
                            >
                                <h3>
                                    {title}
                                    {/* Add asterisks if the cocktail is top-tier */}
                                    {top_tier ? " **" : null}
                                </h3>
                                {/* Render notes if available */}
                                {notes && <p class="mt-1">{notes}</p>}
                                {/* Render glass information if available */}
                                {glass && (
                                    <p class="small mt-1 italic">
                                        {`Served in a ${glass}.`}
                                    </p>
                                )}
                            </div>
                        ))}
                    </section>
                ) : // If the category has no cocktails, render nothing
                null
            )}
        </main>
    );
}
