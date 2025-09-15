"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function PreviewPanel({
  sections,
  sectionComponents,
  onDragEnd,
  updateSection,
}) {
  return (
    <div className="w-full md:max-w-5xl mx-auto bg-white text-black shadow rounded-xl p-0 md:p-6">
      {/* Browser chrome */}
      <div className="sticky top-0 z-10 bg-[#EBEBEB] rounded-t-xl border-b px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
          <div className="ml-3 flex-1">
            <div className="w-full h-9 rounded-full bg-white border px-4 flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
              </svg>
              <span className="text-sm">Search or enter website name</span>
            </div>
          </div>

        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 md:space-y-6 p-3 md:p-0">
              {sections.map((section, index) => {
                const Component = sectionComponents[section.name];
                return (
                  <Draggable key={index} draggableId={`section-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border border-gray-200 rounded-lg shadow-sm p-2 md:p-4 bg-gray-50"
                      >
                        <Component
                          {...section.props}
                          updateTitle={(newTitle) => updateSection(index, { title: newTitle })}
                          updateDescription={(newDesc) => updateSection(index, { description: newDesc })}
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
  );
}


