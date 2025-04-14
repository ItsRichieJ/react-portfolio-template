import Project, { ProjectProps } from "./Project";
import "./Projects.css";

/**
 * TODO: replace each `websiteHref`, `imgSrc`, `title`, and `description`
 * with your project information.
 */
const projects: ProjectProps[] = [
  // Project 1
  {
    websiteHref: "https://stava.io/",
    imgSrc: "/images/projects/stavapic.jpeg",
    title: "Stava.io",
    description:
      "Stava.io is an AI-powered developer onboarding tool that provides real-time, context-aware feedback on pull requests by learning a company’s entire codebase and internal conventions. Built to reduce the 30–100 day ramp-up period for new developers, Stava helps teams accelerate onboarding, improve code quality, and shorten feedback loops—without replacing human reviewers.",
  },
  // Project 2
  {
    websiteHref: "https://www.bu.edu/questrom/blog/asb-travels-to-terrell-lane-middle-school/",
    imgSrc: "/images/projects/TLMural.jpeg",
    title: "Terrell Lane Volunteering",
    description:
      "I was in Lousiburg, North Carolina during Spring break helping teach and facilitate at Terrell Lane Middle School. There were wonderful kids and caring facualty, we learned so much about Southern hospitality.",
  },
];

/**
 * `Projects` returns a list of `Project` components,
 * defined in the following component. Be sure to replace
 * all of the information in this file (do not edit `Project.tsx`
 * only edit the list of `projects` above).
 */
export default function Projects() {
  return (
    <>
      <h2 id="projects">Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <Project
            key={index}
            websiteHref={project.websiteHref}
            imgSrc={project.imgSrc}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </>
  );
}
