import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-emerald-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">About Ranthambhore</h1>
          <p className="text-lg text-emerald-100 font-light">A legacy of conservation and pristine wilderness in Rajasthan.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 prose prose-lg prose-green max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Ranthambhore National Park is one of the biggest and most renowned national parks in Northern India.
            The park is located in the Sawai Madhopur district of southeastern Rajasthan, which is about 130 km from Jaipur.
            Being considered as one of the famous and former hunting grounds of the Maharajas of Jaipur, today the Ranthambhore National Park terrain is a major wildlife tourist attraction spot that has pulled the attention of many wildlife photographers and lovers in this destination.
          </p>
          <div className="my-10 border-l-4 border-green-500 pl-6 py-2 bg-green-50 rounded-r-xl">
            <p className="text-xl italic text-gray-700 m-0">
              "We strive to offer ethical and sustainable wildlife tourism that benefits the local community while preserving the pristine habitat of the Royal Bengal Tiger."
            </p>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Conservation First</h3>
          <p className="text-gray-600 leading-relaxed">
            Our booking platform ensures that tourist footfall is strictly regulated according to the carrying capacity of each park zone. We work hand in hand with the forest department to support anti-poaching initiatives and wildlife monitoring programs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;