import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Question = ({ title, info }) => {

  const [showInfo, setShowInfo] = useState(false);

    
  return (
    <article class='py-4 px-6 mb-5 rounded-md shadow-md hover:shadow-slate-500 bg-yellow-500 text-black'>
      <header class='flex justify-between items-center'>
        <h4 class='text-base md:text-lg font-mono font-bold leading-6 tracking-wider mr-4'>
          {title}
        </h4>
        <button class='sm:w-6 sm:h-6 md:w-8 md:h-8 p-1 md:p-2 rounded-full bg-slate-800 text-yellow-500 cursor-pointer flex justify-center items-center' onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {showInfo && <p class='my-3 mr-10 font-semibold'>{info}</p>}
    </article>
  );
};

export default Question;




