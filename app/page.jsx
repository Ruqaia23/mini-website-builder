"use client";

import { useState, useEffect } from "react";
import NavbarTemplate from "../components/templates/NavbarTemplate";
import HeroTemplate from "../components/templates/HeroTemplate";
import FeaturesTemplate from "../components/templates/FeaturesTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { defaultImageItem, defaultLinkItem } from "../components/adds";
import { exportToJson, importFromJson } from "../utils/jsonUtils";
import SectionsPanel from "../components/preview/SectionsPanel";
import PreviewPanel from "../components/preview/PreviewPanel";

const sectionComponents = {
  Hero: HeroTemplate,
  Features: FeaturesTemplate,
  Footer: FooterTemplate,
};

export default function Home() {
  const [sections, setSections] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sections");
    if (saved) setSections(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);

  const addSection = (name) => {
    const index = sections.length;
    setSections([
      ...sections,
      {
        name,
        props: {
          title: "",
          description: "",
          images: [],
          links: [],
          logo: "",
          features: [],
          onRemove: () => removeSection(index),
        },
      },
    ]);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index, newProps) => {
    setSections((prev) => {
      const updated = [...prev];
      const currentProps = updated[index].props;
      const propsToUpdate = typeof newProps === "function" ? newProps(currentProps) : newProps;
      updated[index] = {
        ...updated[index],
        props: {
          ...currentProps,
          ...propsToUpdate,
        },
      };
      return updated;
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setSections(items);
  };

  const getLastHeroIndex = () => sections.map((s) => s.name).lastIndexOf("Hero");

  return (
    <div className="flex flex-col min-h-screen bg-[#F1F1F1]">
      <div className="sticky top-0 z-50">
        <NavbarTemplate />
      </div>

      {/* Mobile actions bar */}
      <div className="flex md:hidden items-center gap-2 p-3 bg-[#EBEBEB] sticky top-[64px] z-40 shadow">
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="px-3 py-2 rounded-md bg-gray-200 text-sm font-medium"
        >
          <img src="/categories-2.png" alt="الأقسام" className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <div className="hidden md:block">
          <SectionsPanel
            isMobile={false}
            sections={sections}
            sectionComponents={sectionComponents}
            addSection={addSection}
            updateSection={updateSection}
            exportToJson={exportToJson}
            importFromJson={importFromJson}
            setSections={setSections}
            defaultLinkItem={defaultLinkItem}
            defaultImageItem={defaultImageItem}
          />
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/20" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute left-0 top-[64px] bottom-0" onClick={(e) => e.stopPropagation()}>
              <SectionsPanel
                isMobile={true}
                sections={sections}
                sectionComponents={sectionComponents}
                addSection={addSection}
                updateSection={updateSection}
                exportToJson={exportToJson}
                importFromJson={importFromJson}
                setSections={setSections}
                defaultLinkItem={defaultLinkItem}
                defaultImageItem={defaultImageItem}
                onClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="flex-1 md:ml-64 md:pl-4 p-3 md:p-8 overflow-auto">
          <PreviewPanel
            sections={sections}
            sectionComponents={sectionComponents}
            onDragEnd={onDragEnd}
            updateSection={updateSection}
          />
        </div>
      </div>
    </div>
  );
}
