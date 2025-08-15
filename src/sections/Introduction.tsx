import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroImages from "@/components/introimages";
import AboutMe from "@/components/aboutme";
gsap.registerPlugin(ScrollTrigger);




export default function Introduction() {
	useEffect(() => {
		return () => {
			ScrollTrigger.getAll().forEach(t => t.kill());
		};
	}, []);

	return (
		<div className="bg-transparent">
			{/* Intro Images Section at the very start */}
			<IntroImages />
			<AboutMe />
		</div>
	);
}
