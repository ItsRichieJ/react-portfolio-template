import { JSX } from "react";

interface AboutData {
  info: JSX.Element;
}

/**
 * TODO: replace `info` with your personal information.
 */
const aboutData: AboutData = {
  info: (
    <>
      <p>
        I was born in Beijing, China before moving to Orange County, California.
        My first year of college was spend at the Univeristy of San Diego, then I transferred to Boston Univeristy for a change of pace.
        Before and after transferring, I've been on a constant jouney of finding my passions and interests.
      </p>
      <p>
        I absolutely love learning new skills, challenging myself with different experiences, and meeting new peole. 
        To learn more about what I've been working on.
      </p>
    </>
  ),
};

export default function About() {
  return (
    <>
      <h2 id="about">About me</h2>
      {aboutData.info}
    </>
  );
}
