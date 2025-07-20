export default function Header({ onToggleSidebar }) {
  return (
    <header className="w-full bg-white shadow px-4 py-3 flex items-center justify-between">
      <button
        onClick={onToggleSidebar}
        className="text-2xl font-semibold text-gray-700 md:hidden"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <h1 className="text-lg font-medium text-gray-800 mx-auto md:mx-0 md:text-xl">
        Support Ticketing System
      </h1>
      <div className="w-6 md:w-0" /> 
    </header>
  )
}
