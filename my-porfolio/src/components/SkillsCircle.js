import React from 'react';
import Image from "./Image";

/**
 * SkillsCircle Component
 * Displays skill icons in a rotating circle animation
 * 
 * @param {Array} skills - Array of skill names to display
 */
function SkillsCircle({ skills = [] }) {
  const [rotation, setRotation] = React.useState(0);

  // Animate rotation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (skills.length === 0) {
    return <div>No skills to display</div>;
  }

  // Calculate angle between each skill icon
  const angleSlice = 360 / skills.length;
  const radius = 120; // Distance from center

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-80 h-80">

        {/* Rotating skill icons */}
        {skills.map((skill, index) => {
          const angle = (angleSlice * index + rotation) * (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className="flex flex-col items-center">
                {/* Icon container */}
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
                  <Image
                    src={`/skill-${index}`}
                    extensions={["svg", "png"]}
                    alt={skill}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsCircle;
