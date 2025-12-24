import Image from "./Image";
import React from "react";

function ImageSection() {
	// Add image animation styles
	React.useEffect(() => {
		const style = document.createElement('style');
		style.textContent = `
			@keyframes clipPathReveal {
				0% {
					clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
					opacity: 0;
				}
				100% {
					clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
					opacity: 1;
				}
			}

			@keyframes textSlideIn {
				0% {
					transform: translateY(100px);
					opacity: 0;
				}
				100% {
					transform: translateY(0);
					opacity: 1;
				}
			}

			.hero-image-reveal {
				animation: clipPathReveal 0.8s ease-out forwards;
			}

			.hero-text-reveal {
				animation: textSlideIn 0.8s ease-out 0.4s forwards;
				opacity: 0;
			}
		`;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	return (
		<section className="relative w-full">
			<Image className="w-full h-full object-cover rounded hero-image-reveal" src="/Profile_Pic_Wide.jpg" alt="Drew Bowman"></Image>
			<div className="hidden absolute top-0 right-0 h-full md:flex items-center mr-8 hero-text-reveal">
      			<div className="bg-lime-800 bg-opacity-75 text-white p-4 rounded-md">
	  				<h3 
						className="opacity-100 text-xs md:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl text-white font-serif"
					>
						<strong>Hi, I'm Drew Bowman.</strong> <br/>
						I'm a software engineer <br/> 
						helping businesses create <br/> 
						beautiful and functional websites.
					</h3>
				</div>
			</div>
		</section>
	);
}

export default ImageSection;