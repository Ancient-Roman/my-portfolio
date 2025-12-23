import * as React from "react";
import Image from "./Image";

function PageHeader() {
	const bannerRef = React.useRef(null);
	const lastScroll = React.useRef(0);

	/** Handle banner fade in and out */
	React.useEffect(() => {
		const handleScroll = () => {
		  const currentScroll = window.scrollY;

		  if (!bannerRef.current) return;
	
		  if (currentScroll <= 10) {
			bannerRef.current.style.opacity = '1';
		  } else if (currentScroll > lastScroll.current) {
			bannerRef.current.style.opacity = '0';
		  } else if (currentScroll < lastScroll.current && currentScroll < 200) {
			bannerRef.current.style.opacity = '1';
		  }
	
		  lastScroll.current = currentScroll;
		};
	
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section 
			ref={bannerRef} 
			id="page-header" 
			className="fixed top-0 left-0 w-full bg-transparent text-white text-center py-4 px-6 shadow-xl z-50 transition-opacity duration-500 ease-in-out"
		>
			<header className="flex flex-row items-center w-full justify-between">
				<h1 className="md:pl-8 text-xl sm:text-2xl md:text-3xl whitespace-nowrap font-serif">Drew Bowman </h1>

				{/* Desktop Nav */}
				<nav className="hidden md:flex flex-nowrap justify-center items-center w-full">
					<HeaderLink href="#education">Education</HeaderLink>
					<HeaderLink href="#experience">Experience</HeaderLink>
					<HeaderLink href="#projects">Projects</HeaderLink>
					<HeaderLink href="#skills">Skills</HeaderLink>
					<HeaderLink href="#honors-and-awards">Honors and Awards</HeaderLink>
				</nav>

				<div className="flex flex-row items-center justify-end gap-2 md:gap-4">
					<IconLink 
						href="https://github.com/Ancient-Roman" 
						imageSrc={"/github-mark-white.svg"} 
					/>
					<IconLink 
						href="https://www.linkedin.com/in/douglas-bowman-0b909a197/" 
						imageSrc={"/linkedin-svgrepo-com-white.svg"} 
					/>
					<IconLink href="mailto:bowmangolf00@gmail.com" imageSrc={"/email-8-svgrepo-com-white.svg"}/>

				</div>
			</header>
		</section>
	);
}

const HeaderLink = ({ href, children }) => {
	return <a className="text-xl p-1 m-2 hover:drop-shadow-lg hover:text-gray-300" href={href}>{children}</a>;
}

const IconLink = ({href, children, imageSrc}) => {
	if (imageSrc){
		return <a href={href} target="_blank" rel="noreferrer">
			<Image className="w-8 h-8 md:w-12 md:h-12 transition duration-200 hover:brightness-75" src={imageSrc} alt="profile link"></Image>
		</a>;
	}

	return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default PageHeader;