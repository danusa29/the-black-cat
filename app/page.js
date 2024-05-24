import Image from "next/image";
import { fetchMenu, notion } from "./lib/notion";

export default async function Home() {
    const menu = await fetchMenu();
    console.log(JSON.stringify(menu, null, 4));

    return (
        <main className="max-w-7xl mx-auto my-auto pt-10 pb-10 pl-4 pr-4">
            <h1 class="pb-14">The Black Cat</h1>
            {menu.map(({ name, cocktails }) =>
                cocktails.length ? (
                    <section class="pb-9" key={name}>
                        <h2 class="pb-5">// {name}</h2>
                        {cocktails.map(({ title, top_tier, notes, glass }) => (
                            <div
                                className={
                                    notes ? "[&:not(:last-child)]:pb-5" : ""
                                }
                                key={title}
                            >
                                <h3>
                                    {title}

                                    {top_tier ? " **" : null}
                                </h3>

                                {notes && <p class="mt-1">{notes}</p>}

                                {glass && (
                                    <p class="small mt-1 italic">
                                        {`Served in a ${glass}.`}
                                    </p>
                                )}
                            </div>
                        ))}
                    </section>
                ) : null
            )}
        </main>
    );
}
