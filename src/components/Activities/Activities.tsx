import Activity, { ActivityProps } from "./Activity";
import "./Activities.css";

/**
 * TODO: replace each `imgSrc`, `imgAlt`, `title`, `description`
 * and `quicklinks` with your project information.
 */
const activities: ActivityProps[] = [
  // Activity 1
  {
    imgSrc: "/images/activities/ScubadivingPCT.jpeg",
    imgAlt: "Coding with David Malin at HackHarvard.",
    title: "Scuba Diving",
    description: (
      <>
        <p>
          I love diving, my mom loves me spearfishing. 
          Diving under the waves have shown me a whole new world, a world full of seafood: tuna, bass, lobster, scallops, mussels, urchins...
          which my mother would dig out like treasure from my 200 qt. cooler.
        </p>
        <p>
          Scuba diving has challenged and shown me with so many different perspectives of the world. 
          From being a student, to teaching classes, and saving distressed divers, I've learned and grown in profound ways.
        </p>
      </>
    ),
    quicklinks: [
      { href: "https://www.padi.com/", name: "PADI" },
      { href: "https://oceanonescuba.com/", name: "Dive Shop" },
      { href: "https://www.guinnessworldrecords.com/", name: "Guinness" },
    ],
  },
  // Activity 2
  {
    imgSrc: "/images/activities/PSPCT.jpeg",
    imgAlt: "Rock climbing at FitRec.",
    title: "Pet Sitting",
    description: (
      <>
        <p>
          I started rock climbing about 2 years ago, and since then, it has been
          nothing short of amazing (maybe even <em>addicting</em>).
        </p>
        <p>
          I love the challenge of finding the optimal "beta" through a problem,
          and pushing your body to it's limit.
        </p>
      </>
    ),
    quicklinks: [
      {
        href: "https://www.bu.edu/fitrec/what-we-offer/outdoor-programs/rock-climbing/",
        name: "Fitrec Climbing Wall",
      },
    ],
  },
  // Activity 3
  {
    imgSrc: "/images/activities/GYMPCT.jpeg",
    imgAlt: "Tabling with PCT (Phi Chi Theta).",
    title: "Sports",
    description: (
      <>
        <p>
          I joined PCT (a professional business fraternity) my very first
          semesert at BU. It was probably one of the most impactful decsions
          I've made in terms of the <strong>friends</strong> made,{" "}
          <strong>skills</strong> acquired, and abundance of unique experiences.
          (Feel free to check out our website WhyPhi 😜)
        </p>
      </>
    ),
    quicklinks: [
      { href: "https://bupct.com/", name: "BUPCT" },
      { href: "https://github.com/whyphi", name: "WhyPhi" },
    ],
  },
  // Activity 4
  {
    imgSrc: "/images/activities/BBQPCT.jpeg",
    imgAlt: "Cooking with my mom.",
    title: "Cooking",
    description: (
      <>
        <p>
          Growing up, I always had the opportunity to watch my mom cook, and
          even help out in the kitchen. Once my parents started working more, I
          ended up taking more responsibility for cooking meals for the whole
          family.
        </p>
        <p>
          This slowly grew into a passion, and now is something that I spend a
          lot of free time doing for fun!
        </p>
      </>
    ),
    quicklinks: [
      { href: "https://www.babi.sh/", name: "Babish Culinary Universe" },
      { href: "https://cooking.nytimes.com/", name: "NYT Cooking" },
    ],
  },
];

/**
 * `Activities` returns a list of `Activity` components,
 * defined in the following component. Be sure to replace
 * all of the information in this file (do not edit `Activity.tsx`
 * only edit list of `activities` above.)
 */
export default function Activities() {
  return (
    <>
      {/* TODO: with your info --> */}
      <h2 id="interests">How I spend my free time?</h2>
      <div className="interests-table-container">
        <table className="interests-table">
          <tbody>
            {activities.map((activity, index) => (
              <Activity
                key={index}
                imgSrc={activity.imgSrc}
                imgAlt={activity.imgAlt}
                title={activity.title}
                description={activity.description}
                quicklinks={activity.quicklinks}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
