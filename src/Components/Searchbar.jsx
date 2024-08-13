import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

function Searchbar() {
  return (
    <div>
    <div class="flex items-center w-full max-w-md mx-auto">
      <input
        class="flex h-10 w-full rounded-md bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 px-4 py-2 text-sm rounded-l-md border border-r-0 border-muted focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Search..."
        type="search"
      />
      <button
        class="inline-flex items-center justify-center text-white whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-r-md hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary"
        type="submit"
      ><IoSearchOutline size={20}></IoSearchOutline></button>
    </div></div>
  )
}

export default Searchbar;