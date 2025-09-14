"use client";

import { useState } from "react";
import NavbarTemplate from "../components/templates/NavbarTemplate";
import HeroTemplate from "../components/templates/HeroTemplate";
import FeaturesTemplate from "../components/templates/FeaturesTemplate";
import FooterTemplate from "../components/templates/FooterTemplate";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { defaultImageItem, defaultLinkItem } from "../components/adds";
import { exportToJson, importFromJson } from "../utils/jsonUtils";

type ImageItem = {
  src: string;
  alt?: string;
};

type FeatureItem = {
  title: string;
  description: string;
};


const sectionComponents = {
  Hero: HeroTemplate,
  Features: FeaturesTemplate,
  Footer: FooterTemplate,
};

type SectionName = keyof typeof sectionComponents;

type Section = {
  name: SectionName;
  props: {
    title: string;
    description: string;
    images?: ImageItem[];
    links?: { label: string; url: string }[];
    logo?: string;
    features?: FeatureItem[];
    onRemove: () => void;
  };
};

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);

  const addSection = (name: SectionName) => {
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

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (
    index: number,
    newProps: Partial<Section["props"]> | ((prevProps: Section["props"]) => Partial<Section["props"]>)
  ) => {
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setSections(items);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F1F1F1]">
      <div className="sticky top-0 z-50">
        <NavbarTemplate />
      </div>

      <div className="flex flex-1">
        {/*//////////// Sidebar ////////// */}
        <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-[#EBEBEB]/95 p-4 flex flex-col gap-4 shadow-2xl overflow-auto rounded-r-lg">
          <h2 className="text-xl font-bold text-center mb-4">Add Sections</h2>

          <div className="flex flex-col gap-2">
            {Object.keys(sectionComponents).map((name) => (
              <button
                key={name}
                onClick={() => addSection(name as SectionName)}
                className="w-full text-start font-medium p-2 rounded hover:bg-gray-200 transition"
              >
                {name}
              </button>
            ))}
          </div>


          <div className="flex flex-row gap-2 mt-4">
            {/* /////////// Add Link        ////////// */}
            <button
              onClick={() => {
                const label = prompt("عنوان الرابط");
                const url = prompt("أدخل الرابط");
                if (label && url && sections.length > 0) {
                  const index = sections.length - 1;
                  updateSection(index, {
                    links: [...(sections[index].props.links || []), { ...defaultLinkItem, label, url }],
                  });
                }
              }}
              className="flex items-center justify-center rounded-md bg-slate-200 hover:scale-105 transition-transform p-2"
            >
              <img src="/link.png" alt="Link" className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* ///////// Upload Image  ///////// */}
            <label className="cursor-pointer flex items-center justify-center rounded-md hover:scale-105 hover:shadow-lg transition-transform duration-200 bg-slate-200 p-2">
              <img src="/add-image.png" alt="Upload" className="w-6 h-6 md:w-8 md:h-8" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && sections.length > 0) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const result = reader.result as string;
                      const index = sections.length - 1;
                      updateSection(index, (prevProps) => ({
                        images: [...(prevProps.images || []), { ...defaultImageItem, src: result }],
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>

            {/* ///////// Upload Logo ///////// */}
            <label className="cursor-pointer flex items-center justify-center rounded-md hover:scale-105 hover:shadow-lg transition-transform duration-200 bg-purple-200 p-2">
              <span className="text-black text-sm md:text-base mr-2">Logo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file || sections.length === 0) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const result = reader.result as string;
                    const index = sections.map((s) => s.name).lastIndexOf("Hero");
                    if (index === -1) return;
                    updateSection(index, { logo: result });
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
          </div>

          {/* Import & Export */}
          <div className="flex flex-col gap-2 mt-6 border-t border-gray-300 pt-4">
            <button
              onClick={() => exportToJson(sections)}
              className="w-full py-2 bg-[#3DD2CC] text-white rounded-md hover:bg-[#0096FF] transition"
            >
              Export JSON
            </button>

            <label className="w-full cursor-pointer">
              <span className="block w-full py-2 bg-[#3DD2CC] text-white text-center rounded-md hover:bg-[#0096FF] transition">
                Import JSON
              </span>
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => importFromJson(e, setSections)}
              />
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 ml-64 p-8 overflow-auto">
          <div className="max-w-5xl mx-auto bg-white text-black shadow-lg rounded-xl p-8 space-y-6">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                    {sections.map((section, index) => {
                      const Component = sectionComponents[section.name];
                      return (
                        <Draggable key={index} draggableId={`section-${index}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="border border-gray-200 rounded-lg shadow p-4 bg-gray-50"
                            >
                              <Component
                                {...section.props}
                                features={section.props.features || []}
                                updateFeatures={(newFeatures) =>
                                  updateSection(index, { features: newFeatures })
                                }
                                updateTitle={(newTitle: string) =>
                                  updateSection(index, { title: newTitle })
                                }
                                updateDescription={(newDesc: string) =>
                                  updateSection(index, { description: newDesc })
                                }
                                // updateLinks={(newLinks: { label: string; url: string }[]) =>
                                //   updateSection(index, { links: newLinks })
                                // }
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}