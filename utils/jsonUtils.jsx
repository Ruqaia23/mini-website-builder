import { Section } from "../app/page"; // أو المسار الصحيح لمكان تعريف Section
// دالة التصدير
export const exportToJson = (sections) => {
  const dataStr = JSON.stringify(sections, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sections.json";
  a.click();
  URL.revokeObjectURL(url);
};

// دالة الاستيراد
export const importFromJson = (event, setSections) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedSections = JSON.parse(e.target.result);
      setSections(importedSections);
    } catch (error) {
      console.error("خطأ في قراءة الملف:", error);
      alert("الملف غير صالح");
    }
  };
  reader.readAsText(file);
};
