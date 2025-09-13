// "use client";
// import { useState } from "react";

// export default function SectionControl({ type, onAdd }) {
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [link, setLink] = useState("");

//   const handleAdd = () => {
//     if (!title && !description && !image && !link) return;
//     onAdd({ title, description, image, link });
//     setTitle("");
//     setDescription("");
//     setImage("");
//     setLink("");
//     setOpen(false);
//   };

//   return (
//     <div className="flex flex-col gap-2">

//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center justify-between w-full p-3 rounded-lg bg-white/20 text-[#122D42] font-semibold hover:bg-white/30 transition-colors"
//       >
//         <span>{type}</span>
//         <span className="text-xl">{open ? "∧" : "∨"}</span>
//       </button>

//       {open && (
//         <div className="bg-white/20 p-3 rounded-lg flex flex-col gap-2">
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="w-full p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Link URL"
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//             className="w-full p-2 rounded"
//           />
//           <button
//             onClick={handleAdd}
//             className="mt-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
//           >
//             Add {type}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
