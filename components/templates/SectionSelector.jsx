import HeroTemplate from "./HeroTemplate";
import FeaturesTemplate from "./FeaturesTemplate";
import FooterTemplate from "./FooterTemplate";

export default function SectionSelector({ addSection }) {
  const sectionComponents = ["Hero", "Features", "Footer"];

  return (
    <div className="flex gap-4 mb-6 justify-center">
      {sectionComponents.map((name) => (
        <button
          key={name}
          onClick={() => addSection(name)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add {name}
        </button>
      ))}
    </div>
  );
}
