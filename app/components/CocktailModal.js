"use client";

import { useState, useEffect } from "react";

export default function CocktailModal({ cocktail, isOpen, onClose }) {
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && cocktail) {
      fetchCocktailDetails();
    }
  }, [isOpen, cocktail]);

  const fetchCocktailDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cocktail/${cocktail.id}`);
      const data = await response.json();
      setCocktailDetails(data);
    } catch (error) {
      console.error("Error fetching cocktail details:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={block.id} className="mb-2">
            {block.paragraph.rich_text.map((text, index) => (
              <span key={index}>{text.plain_text}</span>
            ))}
          </p>
        );
      case "bulleted_list_item":
        return (
          <li key={block.id} className="mb-1">
            {block.bulleted_list_item.rich_text.map((text, index) => (
              <span key={index}>{text.plain_text}</span>
            ))}
          </li>
        );
      case "numbered_list_item":
        return (
          <li key={block.id} className="mb-1">
            {block.numbered_list_item.rich_text.map((text, index) => (
              <span key={index}>{text.plain_text}</span>
            ))}
          </li>
        );
      case "heading_1":
        return (
          <h1 key={block.id} className="text-2xl font-bold mb-4">
            {block.heading_1.rich_text.map((text, index) => (
              <span key={index}>{text.plain_text}</span>
            ))}
          </h1>
        );
      case "heading_2":
        return (
          <h2 key={block.id} className="text-xl font-bold mb-3">
            {block.heading_2.rich_text.map((text, index) => (
              <span key={index}>{text.plain_text}</span>
            ))}
          </h2>
        );
      case "heading_3":
        return (
          <h3 key={block.id} className="text-lg font-bold mb-2">
            {block.heading_3.rich_text.map((text, index) => (
              <span key={index}>{text.plain_text}</span>
            ))}
          </h3>
        );
      case "image":
        // Notion image block: block.image.type is 'external' or 'file'
        const imageUrl =
          block.image.type === "external"
            ? block.image.external.url
            : block.image.file.url;
        const caption = block.image.caption?.[0]?.plain_text;
        return (
          <div key={block.id} className="my-4 flex flex-col items-center">
            <img
              src={imageUrl}
              alt={caption || "Cocktail image"}
              className="rounded-lg max-h-64 object-contain shadow-md"
            />
            {caption && (
              <div className="text-xs text-[#135b7e] mt-2 italic">
                {caption}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#e9e5d2] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-[#135b7e]">
              {cocktail?.title}
            </h2>
            <button
              onClick={onClose}
              className="text-[#135b7e] hover:text-[#0d4660] text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-[#135b7e]">Loading recipe...</div>
            </div>
          ) : cocktailDetails ? (
            <div className="text-[#135b7e]">
              <div className="space-y-2">
                {cocktailDetails.blocks.map((block) => renderBlock(block))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-[#135b7e]">Failed to load recipe</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
