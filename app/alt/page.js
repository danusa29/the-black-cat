"use client";

import { useState, useEffect } from "react";
import CocktailModal from "../components/CocktailModal";

export default function AltHome() {
  const [menu, setMenu] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await fetch("/api/menu-alt");
      const data = await response.json();
      setMenu(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const handleCocktailClick = (cocktail) => {
    setSelectedCocktail(cocktail);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCocktail(null);
  };

  return (
    <main className="max-w-7xl mx-auto my-auto pt-10 pb-10 pl-4 pr-4">
      <h1 className="pb-14">Rainey Day Reef</h1>
      {menu.map(({ name, cocktails }) =>
        cocktails.length ? (
          <section className="pb-9" key={name}>
            <h2 className="pb-5">// {name}</h2>
            {cocktails.map((cocktail) => (
              <div
                className={cocktail.notes ? "[&:not(:last-child)]:pb-5" : ""}
                key={cocktail.title}
              >
                <h3
                  className="cursor-pointer hover:underline"
                  onClick={() => handleCocktailClick(cocktail)}
                >
                  {cocktail.title}
                </h3>

                {cocktail.notes && <p className="mt-1">{cocktail.notes}</p>}
              </div>
            ))}
          </section>
        ) : null
      )}

      <CocktailModal
        cocktail={selectedCocktail}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}
