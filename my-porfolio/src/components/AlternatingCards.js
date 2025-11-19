import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from './Image';

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
            <div className="w-full md:w-1/2 h-64 flex items-center justify-center p-4">
                <ClickableImage card={card} />
            </div>

          {/* Text side */}
          <div
            className="w-full md:w-1/2 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl"
            style={{ backgroundColor: 'rgb(199, 224, 189)' }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{card.title}</h2>
            {card.summary ? getCardSummaryElement(card.summary) : <></>}
            {card.date ? <p className="pt-1 pb-3 text-gray-500">{card.date}</p> : <></>}
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {card.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

const ClickableImage = ({card}) => {
  if (!card.image && !card.link)  return <></>;

  if (card.image && !card.link) {
    return <Image
      src={card.image}
      alt="Icon"
      className={`h-32 max-w-80 object-contain transform hover:scale-105 transition duration-300`}
    />
  }

  return (
    <>
      <a href={card.link} target="_blank" rel="noopener noreferrer">
        <Image
          src={card.image}
          alt="Icon"
          className={"cursor-pointer h-32 max-w-80 object-contain transform hover:scale-105 transition duration-300"}
        />
      </a>
    </>
  );
}