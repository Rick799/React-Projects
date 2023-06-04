import React, { useState } from 'react';
import data from './data.js';
import SingleQuestion from './Question1.jsx';

function Accordion1() {

 const [questions, setQuestions] = useState(data);
 
 
  return (
    <main class='min-h-screen bg-space bg-cover flex justify-center items-center'>
      <div class='w-10/12 max-w-4xl mx-auto rounded-md py-12 px-8 lg:flex lg:items-center border border-yellow-500  bg-gradient-to-r from-slate-900 to-black'>
        <h3 class='text-center text-xl md:text-3xl font-semibold tracking-wide italic text-white font-mono mb-10  lg:mb-0'>James Webb Space Telescope FAQs</h3>
        <section>
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

export default Accordion1;




