"use client";

import { useState } from "react";

export default function FeaturesTemplate({ onRemove, features: initialFeatures, updateFeatures }) {
  const [features, setFeatures] = useState(initialFeatures || [
    { title: "Feature ", description: "Description " },
    { title: "Feature ", description: "Description " },
    { title: "Feature ", description: "Description " },
  ]);

  const addFeature = () => {
    const newFeatures = [...features, { title: "New Feature", description: "" }];
    setFeatures(newFeatures);
    updateFeatures && updateFeatures(newFeatures);
  };

  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
    updateFeatures && updateFeatures(newFeatures);
  };

  const updateFeature = (index, key, value) => {
    const newFeatures = [...features];
    newFeatures[index][key] = value;
    setFeatures(newFeatures);
    updateFeatures && updateFeatures(newFeatures);
  };

  return (
    <section className="py-10 md:py-16 px-4 bg-gray-50 relative">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Features Section</h2>

      {onRemove && (
        <button onClick={onRemove} className="absolute top-2 right-2 px-2 py-1">
          ✖️
        </button>
      )}

      <div className="max-w-6xl mx-auto grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow flex flex-col items-center">
            <input
              className="text-lg md:text-xl font-bold mb-2 text-center outline-none w-full"
              value={feature.title}
              onChange={(e) => updateFeature(index, "title", e.target.value)}
            />
            <textarea
              className="text-sm md:text-base text-gray-600 text-center outline-none w-full"
              value={feature.description}
              onChange={(e) => updateFeature(index, "description", e.target.value)}
            />
            <button
              onClick={() => removeFeature(index)}
              className="mt-2 px-2 py-1 rounded transition"
            >
              ✖️
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={addFeature}
          className="px-4 w-full py-2 bg-[#3DD2CC] text-white rounded-md hover:bg-[#0096FF] transition"
        >
          + Add Feature
        </button>
      </div>
    </section>
  );
}
