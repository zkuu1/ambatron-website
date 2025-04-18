import {
  Backend_skill,
  Frontend_skill,
  Skill_data,
} from "@/constants";
import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden pb-80 py-20"
      style={{ transform: "scale(0.9" }}
    >
      <SkillText />

        <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
    {Skill_data.map((image, index) => (
      <div key={index} className="flex flex-col items-center">
        <SkillDataProvider
          src={image.Image}
          width={image.width}
          height={image.height}
          index={index}
        />
        <h1 className="text-white text-lg mt-2">{image.skill_name}</h1>
      </div>
    ))}
  </div>


  <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
    {Frontend_skill.map((image, index) => (
      <div key={index} className="flex flex-col items-center">
        <SkillDataProvider
          src={image.Image}
          width={image.width}
          height={image.height}
          index={index}
        />
        <h1 className="text-white text-lg mt-2">{image.skill_name}</h1>
      </div>
    ))}
  </div>
      

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
