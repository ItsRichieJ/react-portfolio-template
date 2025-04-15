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
        </p>
        <p>
          Diving under the waves have shown me a <strong>whole new world</strong> whole new world, a world full of seafood: tuna, bass, lobster, scallops, mussels, urchins...
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
          Pet sitting was first a method to fund my 9 year-old self's want for Star Wars Legos. 
          I also could not stand leaving my own pet at home, all alone, in the dark. So I sought out to provide a <strong>solution</strong> for pets that have traveling parents.
        <p>
          Throughout the years, I've taken care of over 50 breeds of dogs and met wonderful parents.
          The corgi in my arms, I've known "Pillow" since she was 8 months old, she's now nine and has spent over half her life at my house; we are great friends with her owners.</p>
        </p>
        <p>
          In the end, I was able to buy my Star Wars Legos, and even my first car!
        </p>
      </>
    ),
    quicklinks: [
      {
        href: "",
        name: "",
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
          Sports have been a key part of my life: golf, tennis, swimming, Brazillian Jiu-Jitsu, and anything I have yet to try.
        </p>
        <p>
          Keeping in shape and working out is a huge part of my life too, I love seeing the pump indicating what I'd look like in the near future, and reminding me of my goals.
        </p>
      </>
    ),
    quicklinks: [
      { href: "https://grindergym.com/", name: "Grinder Gym" },
      { href: "https://www.servitehs.org/athletics/sports-teams/golf", name: "Golf" },
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
          Cooking has been instilled in me since I was 4, starting with French toast and now ribeyes and dumplings.
        </p>
        <p>
          It's been a passion from my mother helped me develope, I thank her by cooking her dinner.
        </p>
      </>
    ),
    quicklinks: [
      { href: "https://www.youtube.com/@thatdudecancook", name: "ThatDudeCanCook" },
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
