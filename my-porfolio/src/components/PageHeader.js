import * as React from "react";
import Image from "./Image";
import ContactModal from "./ContactModal";

function PageHeader() {
	const bannerRef = React.useRef(null);
	const lastScroll = React.useRef(0);
	const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);

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
		<div className="relative">
		<section 
			ref={bannerRef} 
			id="page-header" 
			className="absolute top-0 inset-x-0 bg-transparent text-white py-4 px-6 shadow-xl z-50 transition-opacity duration-500 ease-in-out"
		>
			<header className="flex items-center justify-between">
				<h1 className="md:pl-8 text-xl text-center sm:text-2xl md:text-3xl font-serif min-w-0 truncate">Drew Bowman </h1>

				{/* Desktop Nav */}
				<nav className="hidden md:flex flex-nowrap min-w-0 justify-center items-center w-full">
					<HeaderLink href="#education">Education</HeaderLink>
					<HeaderLink href="#experience">Experience</HeaderLink>
					<HeaderLink href="#projects">Projects</HeaderLink>
					<HeaderLink href="#skills">Skills</HeaderLink>
					<HeaderLink href="#honors-and-awards">Honors and Awards</HeaderLink>
				</nav>

				<div className="flex flex-row min-w-0 items-center justify-end gap-2 md:gap-4">
					<IconLink 
						href="https://github.com/Ancient-Roman" 
						imageSrc={"/github-mark-white.svg"} 
					/>
					<IconLink 
						href="https://www.linkedin.com/in/douglas-bowman-0b909a197/" 
						imageSrc={"/linkedin-svgrepo-com-white.svg"} 
					/>
					<button
						onClick={() => setIsContactModalOpen(true)}
						className="w-8 h-8 md:w-12 md:h-12 transition duration-200 hover:brightness-75 p-0 bg-transparent border-0 cursor-pointer"
						aria-label="Open contact form"
					>
						<Image src={"/email-8-svgrepo-com-white.svg"} alt="contact" className="w-8 h-8 md:w-12 md:h-12" />
					</button>

				</div>
			</header>
		</section>
		<ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
		</div>
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