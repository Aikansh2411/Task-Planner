import React from 'react'

const Navbar = () => {
  return (
    <div className="flex justify-between bg-emerald-900 text-white">
        <div className="logo">
            <span className=' font-bold text-xl mx-8'>Task Planner</span>
        </div>
        <ul className="flex gap-2.5 mx-6">
            <li className=" cursor-pointer hover:font-bold">Home</li>
            <li className=" cursor-pointer hover:font-bold">My Task</li>
        </ul>
    </div>
  )
}

export default Navbar