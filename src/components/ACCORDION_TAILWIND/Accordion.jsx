import React, { useEffect, useState } from 'react';
import data from './data.js';
import SingleQuestion from './Question';

function Accordion() {

 const [questions, setQuestions] = useState(data);
 
 const [theme, setTheme] = useState(null);
 



  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main class='min-h-screen bg-zinc-200 dark:bg-space  dark:bg-cover'>
       <div class='flex justify-end'>
         <button  onClick={handleThemeSwitch}>
         <img className='w-6' src="https://static-00.iconduck.com/assets.00/dark-theme-icon-512x512-185rlszm.png" alt="dark mode icon" />
         </button>
       </div>
      <div class='w-10/12 max-w-4xl my-20 mx-auto rounded-md py-10 px-8 grid gap-y-5 gap-x-8 lg:flex lg:items-center bg-white border border-slate-800 dark:border-yellow-500  dark:bg-gradient-to-r from-slate-900 to-black'>
        <h3 class='text-center text-xl md:text-3xl font-semibold leading-10 tracking-wide italic dark:text-white font-mono'>James Webb Space Telescope FAQs</h3>
        <section className='info'>
          {questions.map((question) => {
            return (
              <SingleQuestion key={question.id} {...question}></SingleQuestion>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default Accordion;



