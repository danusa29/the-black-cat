import "server-only";
import { Client } from "@notionhq/client";
import React from "react";

// Create a new Notion client with the provided auth token
export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// Fetch cocktails from the Notion database using React's cache function
export const fetchCocktails = React.cache(() => {
    return notion.databases.query({
        database_id: process.env.NOTION_DB_COCKTAILS,
    });
});

// Fetch categories from the Notion database and add an empty cocktails array to each category
export const fetchCategories = async () => {
    const { properties } = await notion.databases.retrieve({
        database_id: process.env.NOTION_DB_COCKTAILS,
    });
    return properties.Category.multi_select.options.map((option) => ({
        ...option,
        cocktails: [],
    }));
};

// Fetch available ingredients from the Notion database using React's cache function
export const fetchAvailableIngredients = React.cache(() => {
    return notion.databases.query({
        database_id: process.env.NOTION_DB_INGREDIENTS,
        filter: {
            property: "In Stock",
            checkbox: {
                equals: true,
            },
        },
    });
});

// Fetch available cocktails based on the available ingredients
export const fetchAvailableCocktails = async () => {
    const { results: ingredients } = await fetchAvailableIngredients();
    const availableIngredientIds = ingredients.map(({ id }) => id);

    const { results: cocktails } = await fetchCocktails();

    // Filter cocktails that have all their ingredients available
    return cocktails
        .filter(({ properties }) =>
            properties.Ingredients.relation.every(({ id }) =>
                availableIngredientIds.includes(id)
            )
        )
        .map(getPrettyCocktailObject);
};

// Fetch the menu by combining available cocktails and categories
export const fetchMenu = async () => {
    const availableCocktails = await fetchAvailableCocktails();
    const categories = await fetchCategories();

    // Assign available cocktails to their respective categories
    categories.forEach((category) => {
        category.cocktails = availableCocktails.filter(
            (cocktail) => cocktail.category === category.name
        );
    });

    return categories;
};

// Extract relevant properties from a cocktail object and return a simplified object
function getPrettyCocktailObject(obj) {
    const { properties } = obj;

    return {
        title: properties.Name.title[0]?.plain_text ?? null,
        glass: properties.Glass.multi_select[0]?.name ?? null,
        top_tier: properties["Top Tier"].checkbox,
        category: properties.Category.multi_select[0]?.name ?? null,
        notes: properties["Quick Notes"].rich_text[0]?.plain_text ?? null,
    };
}
