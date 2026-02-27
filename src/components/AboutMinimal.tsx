import React from 'react';

const AboutMinimal = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-neutral-100">
            <img
              src="https://pub-158012c9a83642869a2f756e0cad584d.r2.dev/Nature/IMG_4391.jpg"
              alt="Aerial view"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-light text-neutral-900 mb-8 tracking-tight">
              About
            </h2>
            <div className="space-y-6 text-neutral-600 font-light leading-relaxed">
              <p>
                PrimeSky East Africa is a licensed drone services company specializing in 
                professional aerial photography and videography across Kenya and Tanzania.
              </p>
              <p>
                With certification XK-RPI-0663A, we provide comprehensive drone solutions 
                for weddings, real estate, construction documentation, agricultural mapping, 
                and commercial projects.
              </p>
              <p>
                Our mission is to capture the beauty of East Africa from unique perspectives, 
                delivering stunning visual content that tells compelling stories from above.
              </p>
              <div className="pt-6 border-t border-neutral-200">
                <p className="text-sm uppercase tracking-widest text-neutral-900">
                  Licensed & Insured
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  License: XK-RPI-0663A
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMinimal;
