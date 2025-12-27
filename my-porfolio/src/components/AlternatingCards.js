import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from './Image';
import ImageCarousel from './ImageCarousel';

export default function AlternatingCards({accomplishments}) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const getCardSummaryElement = (summary) => {
    const parts = summary.split("-");

    if (parts.length === 1) return <p>{summary}</p>

    return <p>{parts[0]} - <span className="text-gray-500 italic">{parts[1]}</span></p>
  }

  const getNavId = (title) => {
    return title ? title.toLowerCase().replaceAll(" ", "-") : "";
  }

  return (
    <div className="p-8 space-y-12 bg-gray-100 min-h-screen">
      {accomplishments.map((card, index) => (
        <div
            id={getNavId(card.title)}
          key={index}
          className={`flex flex-col md:flex-row items-center ${
            index % 2 !== 0 ? 'md:flex-row-reverse' : ''
          }`}
          data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
        >
          {/* Image/Icon side */}
          {(card.component || card.images) && (
            <div className="w-full md:w-1/2 h-64 flex items-center justify-center p-4">
              {card.component ? (
                card.component
              ) : 
                <ImageCarousel 
                  images={card.images}
                  alt={card.title}
                  className="h-32 max-w-80 object-contain"
                />
              }
            </div>
          )}

          {/* Text side */}
          <div
            className="w-full md:w-1/2 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl relative"
            style={{ backgroundColor: 'rgb(199, 224, 189)' }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{card.title}</h2>
            {card.summary ? getCardSummaryElement(card.summary) : <></>}
            {card.date ? <p className="pt-1 pb-3 text-gray-500">{card.date}</p> : <></>}
            
            {/* Items list */}
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {card.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {/* External link icon at bottom */}
            {card.link && (
              <div className="mt-6 flex justify-end">
                <a 
                  href={card.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block hover:scale-110 transition duration-300"
                  title="Open link"
                >
                  <Image 
                    src="/external-link-icon.png" 
                    alt="External link"
                    className="w-6 h-6 object-contain"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}