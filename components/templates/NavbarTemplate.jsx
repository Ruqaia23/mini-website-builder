export default function NavbarTemplate() {
  return (
    <nav className="w-full p-3 md:p-4 bg-[#122D42] text-white shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <img
            src="/ux.png"
            alt="UC"
            className="w-10 md:w-14 object-contain"
          />
        </div>
        <div className="hidden md:block space-x-4">
          <a href="#" className="hover:text-blue-400">Home</a>
        </div>
      </div>
    </nav>
  );
}
