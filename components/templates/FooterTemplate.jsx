"use client";

export default function FooterTemplate({ onRemove }) {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 px-4 relative">

      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 px-2 py-1 rounded text-white"
        >
          ✖️
        </button>
      )}

      <div className="text-center">
        <p>© Website for fun .</p>
      </div>
    </footer>
  );
}
