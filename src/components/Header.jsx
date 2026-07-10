function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[#e5e2dc] bg-[#f8f6f2]">
      <div className="flex items-center gap-2">
  <img src="https://i.imgur.com/1Q9Z1ZB.png" alt="Gupta Law Firm Logo" className="h-10 w-10" />
  <span className="font-bold text-lg tracking-wide text-[#7c6a4c]">Gupta Law Firm</span>
      </div>
      <nav className="flex gap-8 text-[#7c6a4c] font-medium">
        <a href="#" className="border-b-2 border-[#bfa77a] pb-1">HOME</a>
        <a href="#">PAGES</a>
        <a href="#">PRACTICE AREAS</a>
        <a href="#">CASE STUDY</a>
        <a href="#">BLOG</a>
        <a href="#">SHOP</a>
        <a href="#" className="relative">
          <span className="absolute -top-2 -right-3 bg-[#bfa77a] text-white text-xs rounded-full px-1">0</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 2.25l1.5 1.5m0 0l16.5 16.5m-16.5-16.5h16.5a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V3.75a.75.75 0 01.75-.75z" />
          </svg>
        </a>
        <a href="#" className="ml-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg></a>
      </nav>
      <button className="bg-[#bfa77a] text-white px-5 py-2 rounded font-semibold">FREE CONSULTATION</button>
    </header>
  );
}

export default Header;
