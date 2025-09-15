"use client";

export default function SectionsPanel({
  isMobile = false,
  sections,
  sectionComponents,
  addSection,
  updateSection,
  exportToJson,
  importFromJson,
  setSections,
  defaultLinkItem,
  defaultImageItem,
  onClose,
}) {
  const getLastHeroIndex = () => sections.map((s) => s.name).lastIndexOf("Hero");

  const SectionButtons = (
    <div className="flex flex-col gap-2">
      {Object.keys(sectionComponents).map((name) => (
        <button
          key={name}
          onClick={() => {
            addSection(name);
            if (isMobile && onClose) onClose();
          }}
          className={`w-full text-start font-medium ${isMobile ? "p-3 bg-white rounded hover:bg-gray-100" : "p-2 rounded hover:bg-gray-200"} transition`}
        >
          {name}
        </button>
      ))}
    </div>
  );

  const Actions = (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={() => {
          const index = getLastHeroIndex();
          if (index === -1) return alert("أضف قسم Hero أولاً");
          const label = prompt("عنوان الرابط");
          const url = prompt("أدخل الرابط");
          if (label && url) {
            updateSection(index, (prev) => ({
              links: [...(prev.links || []), { ...defaultLinkItem, label, url }],
            }));
          }
        }}
        className={`${isMobile ? "p-3" : "p-2"} flex items-center justify-center rounded-md bg-slate-200`}
      >
        <img src="/link.png" alt="Link" className={`${isMobile ? "w-6 h-6" : "w-6 h-6 md:w-8 md:h-8"}`} />
      </button>

      <label className={`${isMobile ? "p-3" : "p-2"} cursor-pointer flex items-center justify-center rounded-md bg-slate-200`}>
        <img src="/add-image.png" alt="Upload" className={`${isMobile ? "w-6 h-6" : "w-6 h-6 md:w-8 md:h-8"}`} />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const index = getLastHeroIndex();
            if (index === -1) return alert("أضف قسم Hero أولاً");
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result;
                updateSection(index, (prevProps) => ({
                  images: [...(prevProps.images || []), { ...defaultImageItem, src: result }],
                }));
              };
              reader.readAsDataURL(file);
            }
            e.currentTarget.value = "";
          }}
        />
      </label>

      <label className={`${isMobile ? "p-3" : "p-2"} cursor-pointer flex items-center justify-center rounded-md bg-purple-200`}>
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
              const result = reader.result;
              const index = sections.map((s) => s.name).lastIndexOf("Hero");
              if (index === -1) return;
              updateSection(index, { logo: result });
            };
            reader.readAsDataURL(file);
            e.currentTarget.value = "";
          }}
        />
      </label>
    </div>
  );

  const ImportExport = (
    <div className="flex flex-col gap-2 mt-6 border-t border-gray-300 pt-4">
      <button
        onClick={() => {
          exportToJson(sections);
          if (isMobile && onClose) onClose();
        }}
        className={`w-full ${isMobile ? "py-3" : "py-2"} bg-[#3DD2CC] text-white rounded-md hover:bg-[#0096FF] transition`}
      >
        Export JSON
      </button>

      <label className="w-full cursor-pointer">
        <span className={`block w-full ${isMobile ? "py-3" : "py-2"} bg-[#3DD2CC] text-white text-center rounded-md hover:bg-[#0096FF] transition`}>
          Import JSON
        </span>
        <input
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            importFromJson(e, setSections);
            if (isMobile && onClose) onClose();
          }}
        />
      </label>
    </div>
  );

  if (isMobile) {
    return (
      <div className="w-80 max-w-[90vw] bg-[#EBEBEB] p-4 shadow-2xl overflow-auto rounded-r-xl">
        <h2 className="text-xl font-bold text-center mb-4 mt-1">Add Sections</h2>
        {SectionButtons}
        {Actions}
        {ImportExport}
      </div>
    );
  }

  return (
    <div className="md:fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-[#EBEBEB]/95 p-4 flex flex-col gap-4 shadow-2xl overflow-auto rounded-r-lg">
      <h2 className="text-xl font-bold text-center mb-4 mt-2">Add Sections</h2>
      {SectionButtons}
      {Actions}
      {ImportExport}
    </div>
  );
}


