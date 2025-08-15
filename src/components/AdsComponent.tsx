"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Award, Star, Briefcase, Camera } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const professionalCategories = [
	{
		id: "brand-ambassador",
		name: "Brand Ambassador",
		image: "/placeholder.svg?height=600&width=800",
		title: "Global Brand Partnerships",
		description:
			"Distinguished face in the industry, serving as brand ambassador and cover model for numerous global brands across diverse sectors. Featured partnerships include: Santoor Soap, LG Products, Renault Kwid, Videocon Washing Machine, TVS Tyres, Dabur, Obama Care USA, Close-Up, Mahi Mango, Gold Medal Switches, Just Buy App, Fixderma (Japan), EBZY Online App, Sona Masale, Logic Homes, and many more across FMCG, automotive, technology, and lifestyle sectors.",
		projects: ["15+ Global Brands", "Multi-sector Campaigns", "International Reach"],
		brands: [
			"Santoor Soap",
			"LG Products",
			"Renault Kwid",
			"Videocon Washing Machine",
			"TVS Tyres",
			"Dabur",
			"Obama Care USA",
			"Close-Up",
			"Mahi Mango",
			"Gold Medal Switches",
			"Just Buy App",
			"Fixderma (Japan)",
			"EBZY Online App",
			"Sona Masale",
			"Logic Homes",
		],
	},
	{
		id: "poster-campaigns",
		name: "Poster Campaigns",
		image: "/placeholder.svg?height=600&width=800",
		title: "Campaign Face & Posters",
		description:
			"Featured as the poster face for major government initiatives, newspaper campaigns, and international brand promotions. Notable campaigns include: Poster Face for 'Saada Pind' (Punjab Government, Amritsar), Poster Face for Dainik Bhaskar Newspaper, Poster Face for Sunpride Oil, Face of Push-Up Footwear, Face of Clove Dental, Face of 107.2 FM NASHA, Website Face of UrbanPro, Face of Viber, Poster Face of Mirinda (International Campaign), Poster Face of Casio Watch, Face of L'Oréal, and Face of UrbanClap.",
		projects: ["Government Campaigns", "Newspaper Features", "International Brands"],
		campaigns: [
			{ title: "Saada Pind", client: "Punjab Government, Amritsar", type: "Government Initiative" },
			{ title: "Dainik Bhaskar", client: "Leading Newspaper", type: "Media Campaign" },
			{ title: "Mirinda", client: "International Campaign", type: "Global Brand" },
			{ title: "Sunpride Oil", client: "FMCG Brand", type: "Product Campaign" },
			{ title: "Push-Up Footwear", client: "Lifestyle Brand", type: "Fashion Campaign" },
			{ title: "Clove Dental", client: "Healthcare Brand", type: "Healthcare Campaign" },
			{ title: "107.2 FM NASHA", client: "Radio Station", type: "Media Campaign" },
			{ title: "UrbanPro", client: "Education Platform", type: "Website Campaign" },
			{ title: "Viber", client: "Communication App", type: "Tech Campaign" },
			{ title: "Casio Watch", client: "Technology Brand", type: "Product Campaign" },
			{ title: "L'Oréal", client: "International Cosmetics", type: "Beauty Campaign" },
			{ title: "UrbanClap", client: "Service Platform", type: "Digital Campaign" },
		],
	},
	{
		id: "cover-model",
		name: "Cover Model",
		image: "/placeholder.svg?height=600&width=800",
		title: "Magazine & Digital Covers",
		description:
			"Graced covers of prestigious magazines and digital platforms, representing fashion, lifestyle, and technology brands with elegance and professional appeal. Featured covers include: Cover Face of Chandigarh City Centre (CCC) & Teaching Program, Cover Face for BIBA by renowned designer Rohit Bal, and Magazine Shoot for Amvy showcasing versatility across fashion, retail, and lifestyle publications.",
		projects: ["Fashion Magazines", "Digital Platforms", "Lifestyle Brands"],
		covers: [
			{ title: "Chandigarh City Centre (CCC) & Teaching Program", type: "Shopping Mall & Education Campaign" },
			{ title: "BIBA by Rohit Bal", type: "Fashion Brand" },
			{ title: "Amvy Magazine", type: "Lifestyle Publication" },
		],
	},
	{
		id: "tech-lifestyle",
		name: "Tech & Lifestyle",
		image: "/placeholder.svg?height=600&width=800",
		title: "Technology & Lifestyle Brands",
		description:
			"Represented cutting-edge technology brands and lifestyle products, bridging the gap between innovation and consumer appeal. Technology partnerships include Face of Viber (communication app), Just Buy App (e-commerce platform), EBZY Online App (digital services), Website Face of UrbanPro (education platform), Face of UrbanClap (service platform), Poster Face of Casio Watch (technology & fashion), and Gold Medal Switches (electrical products).",
		projects: ["Tech Giants", "Lifestyle Products", "Digital Platforms"],
		techBrands: [
			{ brand: "Viber", category: "Communication App" },
			{ brand: "Just Buy App", category: "E-commerce Platform" },
			{ brand: "EBZY Online App", category: "Digital Services" },
			{ brand: "UrbanClap", category: "Service Platform" },
			{ brand: "UrbanPro", category: "Education Platform" },
			{ brand: "Casio Watch", category: "Technology & Fashion" },
			{ brand: "Gold Medal Switches", category: "Electrical Products" },
		],
	},
	{
		id: "beauty-wellness",
		name: "Beauty & Wellness",
		image: "/placeholder.svg?height=600&width=800",
		title: "Beauty & Wellness Industry",
		description:
			"Established presence in beauty and wellness sector, representing international cosmetic brands and healthcare products across global and regional markets. Key partnerships include Face of L'Oréal (international cosmetics), Fixderma Japan (skincare), Face of Clove Dental (healthcare), Face of Push-Up Footwear (lifestyle), and Face of 107.2 FM NASHA (media & entertainment), showcasing versatility across beauty, healthcare, and lifestyle segments.",
		projects: ["International Brands", "Healthcare Products", "Beauty Campaigns"],
		beautyBrands: [
			{ brand: "L'Oréal", category: "International Cosmetics", region: "Global" },
			{ brand: "Fixderma", category: "Skincare", region: "Japan" },
			{ brand: "Clove Dental", category: "Healthcare", region: "India" },
			{ brand: "Push-Up Footwear", category: "Lifestyle", region: "India" },
			{ brand: "107.2 FM NASHA", category: "Media & Entertainment", region: "India" },
		],
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

export default function AdsComponent() {
	const [activeCategory, setActiveCategory] = useState(0)
	const [direction, setDirection] = useState(0)

	const handleCategoryChange = (newIndex: number) => {
		if (newIndex !== activeCategory) {
			setDirection(newIndex > activeCategory ? 1 : -1)
			setActiveCategory(newIndex)
		}
	}

	const currentCategory = professionalCategories[activeCategory]

	const renderActionButtons = () => {
		const category = currentCategory

		if (category.brands) {
			return (
				<Button size="lg" className="bg-white text-black hover:bg-gray-200 border-0">
					<Award className="w-4 h-4 mr-2" />
					View All Brands
				</Button>
			)
		}

		if (category.campaigns) {
			return (
				<Button size="lg" className="bg-white text-black hover:bg-gray-200 border-0">
					<Camera className="w-4 h-4 mr-2" />
					Campaign Portfolio
				</Button>
			)
		}

		if (category.covers) {
			return (
				<Button size="lg" className="bg-white text-black hover:bg-gray-200 border-0">
					<Star className="w-4 h-4 mr-2" />
					Cover Gallery
				</Button>
			)
		}

		if (category.techBrands || category.beautyBrands) {
			return (
				<Button size="lg" className="bg-white text-black hover:bg-gray-200 border-0">
					<Briefcase className="w-4 h-4 mr-2" />
					Brand Partnerships
				</Button>
			)
		}

		return null
	}

	return (
		<div
			className="bg-black text-white"
			style={{
				height: "100vh",
				overflow: "hidden",
				background: 'transparent'
			}}
		>
			{/* Main Top Navbar with ADS Title */}
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
					ADS
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
										alt={`${currentCategory.name} ad scene`}
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
			<div className="flex items-center space-x-4 bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 flex-wrap">
								{professionalCategories.map((category, index) => (
									<motion.button
										key={category.id}
										onClick={() => handleCategoryChange(index)}
										className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 ${
											activeCategory === index ? "text-white" : "text-gray-400 hover:text-gray-200"
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
							<h2 className="text-3xl md:text-4xl font-bold mb-3">{currentCategory.title}</h2>
						</div>
			<div className="flex flex-wrap gap-2 mb-4">
				{currentCategory.projects.map((project, index) => (
					<motion.span
						key={index}
						className="px-2 py-1 bg-black/10 backdrop-blur-sm rounded text-xs"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
					>
						{project}
					</motion.span>
				))}
			</div>
						<div className="mb-4">
			<div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 transition-all duration-[1.8s] ease-in-out" style={{background: 'rgba(0,0,0,0.05)'}}>
								<p className="text-gray-300 text-base leading-relaxed transition-all duration-[1.8s] ease-in-out">
									{currentCategory.description}
								</p>
							</div>
						</div>
						<div className="flex gap-4 transition-all duration-[1.8s] ease-in-out flex-wrap">{renderActionButtons()}</div>
					</div>
				</div>
			</div>
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
		</div>
	)
}