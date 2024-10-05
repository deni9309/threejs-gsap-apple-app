import { navLists } from '../constants'
import { appleImg, bagImg, searchImg } from '../utils'

const Navbar = () => {
  return (
    <header className="flex justify-between items-center w-full py-5 px-5 sm:px-10">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="apple" height={18} width={14} />

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item) => (
            <div
              key={item}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 max-sm:mr-2">
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
