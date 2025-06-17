import React from 'react';
function StartBox() {
  return (
    <>
    <div className = "">
    <div className = "w-2/5 h-96 ml-[600px] mt-[100px] bg-opacity-30 rounded-lg border-b-gray-500 border-4 border-solid shadow-2xl shadow-neutral-500 animated-gradient grid grid-rows-4 place-items-center">
      <button className = "w-1/5 h-10 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-2 rounded-lg">
        Login
      </button>
      <button className = "w-1/5 h-10 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-3 rounded-lg">
        Sign-Up
      </button>
    </div>
    </div>
    </>
  )
}

export default StartBox
