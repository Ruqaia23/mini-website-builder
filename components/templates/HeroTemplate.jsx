"use client";

import { useState, useEffect } from "react";

export default function HeroTemplate({
  title = "",
  description = "",
  images = [],
  links = [],
  logo = null,
  onRemove,
  updateTitle,
  updateDescription
}) {
  const [localTitle, setLocalTitle] = useState(title);
  const [localDesc, setLocalDesc] = useState(description);

  useEffect(() => {
    setLocalTitle(title);
    setLocalDesc(description);
  }, [title, description]);

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
    updateTitle && updateTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setLocalDesc(e.target.value);
    updateDescription && updateDescription(e.target.value);
  };

  return (
    <section className="w-full min-h-64 bg-blue-200 flex flex-col items-center justify-center relative p-4 rounded-md">
      {/* Remove Button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 px-2 py-1 rounded text-white "
        >
          ✖️
        </button>
      )}

      {/* Logo */}
      {logo && (
        <img
          src={logo}
          alt="Logo"
          className="absolute top-2 left-2 w-12 h-12 object-contain rounded"
        />
      )}

      {/* Editable Title */}
      <input
        type="text"
        value={localTitle}
        onChange={handleTitleChange}
        placeholder="Hero Title"
        className="text-3xl font-bold text-center mb-2 w-full max-w-lg outline-none"
      />

      {/* Editable Description */}
      <textarea
        value={localDesc}
        onChange={handleDescChange}
        placeholder="Hero Description"
        className="text-center w-full max-w-lg outline-none"
      />

      {/* Images */}
      {images.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-4 justify-center">
          {images.map((img, i) =>
            img?.src ? (
              <img
                key={i}
                src={img.src}
                alt={img.alt || `img-${i}`}
                className="w-20 h-20 object-cover rounded-md border"
              />
            ) : null
          )}
        </div>
      )}

      {/* Links */}
      {links.length > 0 && (
        <div className="mt-4 flex gap-4">
          {links.map((link, i) =>
            link?.url ? (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {link.label}
              </a>
            ) : null
          )}
        </div>
      )}
    </section>
  );
}
