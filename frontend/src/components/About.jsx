import React from 'react';
import dan from '../assets/dan.jpg'

const About = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center py-8 md:space-x-20 mt-20 mb-20 space-y-8 md:space-y-0">
      {/* First Frame */}
      <div className="p-4 rounded-lg w-full md:w-80">
        <img src={dan} alt="Placeholder" className="w-full h-80 object-cover rounded-t-lg" />
        <div className="mt-4">
          <p>Seasoned Quality Assurance (QA) professional with 13 years of experience in linguistic and functionality testing, 
adept at integrating advanced automation strategies to optimize testing processes and enhance overall product 
quality. Proficient in manual testing and an expert in automating tests for complex web and application 
environments. Continuously expanding technical skills in fullstack development to stay ahead in the dynamic field
 of QA engineering. </p>
        </div>
      </div>

      {/* Second Frame */}
      <div className="bg-green-200 p-4 rounded-lg w-full md:w-80">
        <img src="https://via.placeholder.com/400x300" alt="Placeholder" className="w-full h-80 object-cover rounded-t-lg" />
        <div className="mt-4">
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>

      {/* Third Frame */}
      <div className="bg-red-200 p-4 rounded-lg w-full md:w-80">
        <img src="https://via.placeholder.com/400x300" alt="Placeholder" className="w-full h-80 object-cover rounded-t-lg" />
        <div className="mt-4">
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
      </div>
    </div>
  );
};

export default About;