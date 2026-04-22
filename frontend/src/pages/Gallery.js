import React from 'react';

const Gallery = () => {
  const images = [
    { id: 1, src: "/static/gallery/gallery1.jpg", title: "Royal Bengal Tiger" },
    { id: 2, src: "/static/gallery/gallery2.jpg", title: "Safari Vehicle" },
    { id: 3, src: "/static/gallery/gallery3.jpg", title: "Indian Leopard" },
    { id: 4, src: "/static/gallery/gallery4.jpg", title: "Sambar Deer" },
    { id: 5, src: "/static/gallery/gallery5.jpg", title: "Serene Lake Padam Talab" },
    { id: 6, src: "/static/gallery/gallery6.jpg", title: "Tiger Resting" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-stone-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Safari Moments</h1>
          <p className="text-lg text-stone-300 font-light">Glimpses of the majestic wildlife you can expect to encounter.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 aspect-[4/3] bg-gray-200 cursor-pointer">
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h3>
                  <p className="text-sm text-gray-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">Ranthambhore National Park</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;