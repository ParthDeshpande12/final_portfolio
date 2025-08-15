"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const filmCategories = [
	{
		id: "lead-films",
		name: "Lead Films",
		image: "/placeholder.svg?height=600&width=800",
		title: "Aam Aadmi",
		description:
			"Suman Rana's first film as lead with the legendary icon of Punjab Late Raj Brar. The film became a super hit in all theatres and was released in 2018, creating an emotional tribute to the legendary artist who passed away on December 31, 2016.",
		projects: ["Aam Aadmi (2018)", "With Raj Brar", "Super Hit Film"],
		trailerLink: "https://youtu.be/nGXFy_ReBwQ",
		songLink: "https://youtu.be/hNDVSW1hSgk",
	},
	{
		id: "international",
		name: "International",
		image: "/placeholder.svg?height=600&width=800",
		title: "Universal Broadcast Media",
		description:
			"Signed with Universal Broadcast Media as Lead star for international films, showcasing versatility across different cinema markets and expanding global reach.",
		projects: ["A Biopic from film industry", "Miracle", "International Brand"],
		trailerLinks: [
			"https://youtu.be/RS5qBON2zjE",
			"https://youtu.be/84LPxqRSfNo",
		],
		songLink: null,
	},
	{
		id: "recent",
		name: "Recent",
		image: "/placeholder.svg?height=600&width=800",
		title: "Let's Meet",
		description:
			"Recently released movie with Tanuj Virvani under UV production house, marking another milestone in contemporary cinema.",
		projects: ["Let's Meet", "With Tanuj Virvani", "UV Production"],
		trailerLink: "https://youtu.be/XRbWauk3ABA?si=9u1F72fVHRR29aCs",
		songLink: null,
	},
	{
		id: "upcoming",
		name: "Upcoming",
		image: "/placeholder.svg?height=600&width=800",
		title: "The Diplomat",
		description:
			"Upcoming film directed by Shivam Nair under T-Series production, promising another compelling performance in this highly anticipated project.",
		projects: ["The Diplomat", "Directed by Shivam Nair", "T-Series Production"],
		trailerLink: "https://youtu.be/hai51TGlYTw?si=tch1hr85IWSPLY_B",
		songLink: null,
	},
	{
		id: "production",
		name: "In Production",
		image: "/placeholder.svg?height=600&width=800",
		title: "Rush",
		description:
			"Currently in production under RGV production house, working with renowned filmmaker Ram Gopal Varma on this exciting new project.",
		projects: ["Rush", "RGV Production", "Ram Gopal Varma"],
		trailerLink: null,
		songLink: null,
	},
]

const slideVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
	}),
}

const orderedImages = [
    "/images/a.png",
    "/images/b.png",
    "/images/c.png",
    "/images/d.png",
    "/images/e.png",
    "/images/f.png",
    "/images/g.png",
]

function getOrderedImage(index: number) {
    return orderedImages[index % orderedImages.length]
}

export default function FilmsComponent() {
	const [activeCategory, setActiveCategory] = useState(0)
	const [direction, setDirection] = useState(0)

	const handleCategoryChange = (newIndex: number) => {
		if (newIndex !== activeCategory) {
			setDirection(newIndex > activeCategory ? 1 : -1)
			setActiveCategory(newIndex)
		}
	}

	const currentCategory = filmCategories[activeCategory]

	return (
		<div
			style={{
				height: "100vh",
				overflow: "hidden",
				background: 'transparent'
			}}
		>
			{/* Background Video */}
			<video
				src="/images/about_bg.mp4"
				autoPlay
				loop
				muted
				playsInline
				poster="/images/hero.jpg"
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					objectFit: 'cover',
					zIndex: -1,
					pointerEvents: 'none',
					background: 'transparent',
				}}
			/>

			{/* Main Top Navbar with FILMS Title */}
			<nav className="w-full flex justify-center items-center fixed top-0 left-0 z-50 bg-black/10 backdrop-blur-md h-20 pt-4">
				<h1
					className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black m-0 p-0 tracking-tight leading-none break-words uppercase"
					style={{
						fontFamily: 'Philosopher, serif',
						letterSpacing: '0.3em',
						textRendering: 'optimizeLegibility',
						color: '#4B2E19'
					}}
				>
					FILMS
				</h1>
			</nav>
			<div style={{ paddingTop: '5.5rem', height: 'calc(100vh - 5.5rem)', overflow: 'hidden', background: 'transparent' }}>
				<div className="relative flex flex-col lg:flex-row h-full">
					{/* Image Section - left side on desktop */}
					<div className="w-full lg:w-1/2 flex items-center justify-center px-0 py-0">
					<div className="relative w-full max-w-2xl aspect-video overflow-hidden">
							<AnimatePresence initial={false} custom={direction}>
								<motion.div
									key={activeCategory}
									custom={direction}
									variants={slideVariants}
									initial="enter"
									animate="center"
									exit="exit"
									transition={{
										x: { type: "spring", stiffness: 150, damping: 30, duration: 1.8 },
										opacity: { duration: 0.8 },
									}}
									className="absolute inset-0"
								>
									<Image
										src={getOrderedImage(activeCategory)}
										alt={`${currentCategory.name} film scene`}
										fill
										className="object-cover pointer-events-none"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
					{/* Content Section - right side on desktop */}
					<div className="w-full lg:w-1/2 flex flex-col justify-center px-4 py-2">
						{/* Category Navigation Tabs on Top */}
						<div className="flex items-center justify-start mb-4">
						<div className="flex items-center space-x-4 bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 flex-wrap" style={{background: 'rgba(0,0,0,0.05)'}}>
								{filmCategories.map((category, index) => (
									<motion.button
										key={category.id}
										onClick={() => handleCategoryChange(index)}
										className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 ${
											activeCategory === index
												? "text-white"
												: "text-gray-400 hover:text-gray-200"
										}`}
										whileHover={{
											scale: 1.05,
											transition: { duration: 0.3, ease: "easeOut" },
										}}
										whileTap={{
											scale: 0.95,
											transition: { duration: 0.1 },
										}}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: index * 0.1,
											duration: 0.6,
											ease: "easeOut",
										}}
									>
										{category.name}
										{activeCategory === index && (
											<motion.div
												className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
												layoutId="activeTab"
												transition={{
													type: "spring",
													stiffness: 150,
													damping: 30,
													duration: 1.2,
												}}
											/>
										)}
									</motion.button>
								))}
							</div>
						</div>
						<div className="mb-4">
							<h2 className="text-3xl md:text-4xl font-bold mb-3">
								{currentCategory.title}
							</h2>
						</div>
						<div className="flex flex-wrap gap-2 mb-4">
							{currentCategory.projects.map((project, index) => (
								<motion.span
									key={index}
									className="px-2 py-1 bg-black/10 backdrop-blur-sm rounded text-xs"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										delay: 0.3 + index * 0.1,
										duration: 0.3,
									}}
								>
									{project}
								</motion.span>
							))}
						</div>
						<div className="mb-4">
							<div className="rounded-xl p-4 transition-all duration-[1.8s] ease-in-out" style={{background: 'rgba(0,0,0,0.05)'}}>
								<p className="text-gray-300 text-base leading-relaxed transition-all duration-[1.8s] ease-in-out">
									{currentCategory.description}
								</p>
							</div>
						</div>
						<div className="flex gap-4 transition-all duration-[1.8s] ease-in-out flex-wrap">
							{currentCategory.trailerLink && (
								<Button
									size="lg"
									className="bg-white text-black hover:bg-gray-200 border-0"
									onClick={() =>
										window.open(currentCategory.trailerLink, "_blank")
									}
								>
									<Play className="w-4 h-4 mr-2" />
									Watch Trailer
								</Button>
							)}
							{currentCategory.songLink && (
								<Button
									size="lg"
									className="bg-white text-black hover:bg-gray-200 border-0"
									onClick={() => window.open(currentCategory.songLink, "_blank")}
								>
									<Play className="w-4 h-4 mr-2" />
									Song
								</Button>
							)}
							{currentCategory.trailerLinks &&
								currentCategory.trailerLinks.map((link, index) => (
									<Button
										key={index}
										size="lg"
										className="bg-white text-black hover:bg-gray-200 border-0"
										onClick={() => window.open(link, "_blank")}
									>
										<Play className="w-4 h-4 mr-2" />
										Trailer {index + 1}
									</Button>
								))}
						</div>
					</div>
				</div>

				{/* Bottom Navigation Panel */}
				<div className="relative py-8 px-4 bg-black/10 backdrop-blur-sm">
					<div className="max-w-6xl mx-auto">
						{/* Categories Navigation */}
						<div className="flex items-center justify-center mb-6">
							<div className="flex items-center space-x-6 bg-black/10 backdrop-blur-sm rounded-full px-6 py-3">
								{filmCategories.map((category, index) => (
									<motion.button
										key={category.id}
										onClick={() => handleCategoryChange(index)}
										className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 ${
											activeCategory === index
												? "text-white"
												: "text-gray-400 hover:text-gray-200"
										}`}
										whileHover={{
											scale: 1.05,
											transition: { duration: 0.3, ease: "easeOut" },
										}}
										whileTap={{
											scale: 0.95,
											transition: { duration: 0.1 },
										}}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: index * 0.1,
											duration: 0.6,
											ease: "easeOut",
										}}
									>
										{category.name}
										{activeCategory === index && (
											<motion.div
												className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
												layoutId="activeTab"
												transition={{
													type: "spring",
													stiffness: 150,
													damping: 30,
													duration: 1.2,
												}}
											/>
										)}
									</motion.button>
								))}
							</div>
						</div>

						{/* Description Text Section */}
						<div className="max-w-4xl mx-auto">
							<div className="bg-black/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-[1.8s] ease-in-out">
								<div className="transition-all duration-[1.8s] ease-in-out">
									<p className="text-gray-300 text-base leading-relaxed transition-all duration-[1.8s] ease-in-out">
										{currentCategory.description}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}