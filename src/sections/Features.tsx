import { AnimatedContainer } from "@/components/AnimatedContainer";
import { ProjectsSection } from "@/components/projects-section";

export default function Features() {
  return (
	<AnimatedContainer variant="fade" className="h-auto w-full">
	  <div style={{ minHeight: 'fit-content' }}>
		<ProjectsSection />
	  </div>
	</AnimatedContainer>
  );
}