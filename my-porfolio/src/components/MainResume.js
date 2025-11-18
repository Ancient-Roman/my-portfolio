import AlternatingCards from "./AlternatingCards";

const accomplishments = [
  {
	title: "Education",
	summary: "Virignia Tech, Blacksburg VA - Graduated Senior, Computer Science",
	date: "August 2019 - May 2023",
	items: [
	  "Cumulative GPA: 3.96",
	  "Graduated with a BS in Computer Science, Music Technology Minor",
	],
	image: "/vt-computer-science.png",
	link: "https://website.cs.vt.edu/Undergraduate.html",
  },
  {
	title: "Experience",
	summary: "Software Engineer, Richmond, VA - Costar Group",
	date: "July 2023 - Present",
	items: [
	  "Used Highcharts with React/TS and C#/SQL to deliver real-time and historical performance data",
	  "Gained full-stack and agile experience",
	  "Mentored an intern dev in summer 2024"
	],
	image: "/costar-group.png",
	link: "https://www.costargroup.com",
  },
  {
	summary: "Summer Internship, Jessup, MD - Vorbeck Materials Corp.",
	date: "May 2022 - August 2022",
	items: [
	  "Developed a web application using React and Openlayers API",
	  "Gained experience with React and UI design for real-time location data",
	],
	image: "/offical-vorbeck-logo.png",
	link: "https://www.vorbeck.com",
  },
  {
	title: "Projects",
	summary: "Custom Budgeting Dashboard",
	date: "May 2025 - Present",
	items: [
	  "Using Highcharts with Next JS to analyze user csv transaction data and create budgeting strategies",
	],
	image: "/budgeting-project.png",
	link: "https://budgeting-dashboard-lzl15dcyd-ancient-romans-projects.vercel.app"
  },
  {
	summary: "Tactical Strategy Video Game Project",
	date: "February 2018 - June 2021",
	items: [
	  "Developed a tactical strategy game level based off of Nintendo's Fire Emblem franchise",
	  "Used Java for original version, then used Python to create a random map generator add-on later"
	],
	image: "/fire-emblem-map.png",
  },
  {
	title: "Skills",
	items: [
	  "Java",
	  "JavaScript/TypeScript",
	  "Python",
	  "Swift",
	  "C#",
	  "SQL Server",
	  "Unreal Engine/C++"
	],
  },
  {
	title: "Honors and Awards",
	items: [
		"Member of the Virginia Tech Honors College: January 2020 – May 2023",
		"Published Research Paper To Creativity & Cognition Conference, which recieved an honorable mention: April 2024"
	],
	image: "/honorable-mention-AandC.png",
	link: "https://dl.acm.org/doi/abs/10.1145/3635636.3656195",
  }
];

function MainResume() {

	return (
		<div id="main-resume">
			<AlternatingCards accomplishments={accomplishments}/>
		</div>
	);
}

export default MainResume;