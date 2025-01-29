import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui-aceternity/timeline";

const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
});

export default function AboutTimeline() {
  const data = [
    {
      title: "2015",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-red-500 md:text-sm">
            This year marked the beginning of my journey in construction. At
            carpentry school, I learned not just the basics of working with
            wood, tools, and measurements but also the core values of discipline
            and punctuality. The training taught me how attention to detail is
            essential, as even minor errors can have a big impact. This period
            instilled a work ethic focused on quality and precision, skills that
            would soon become crucial on actual job sites.
          </p>
        </div>
      ),
    },
    {
      title: "2018",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-red-500 md:text-sm">
            After graduating, I spent the next five years gaining hands-on
            experience on job sites. Working closely with seasoned carpenters, I
            learned how to adapt quickly to unexpected issues and developed
            problem-solving skills that allowed me to think on my feet. Teamwork
            and clear communication were essential every day, as we relied on
            each other to keep projects moving smoothly.
          </p>
          <p className="mb-8 text-xs font-normal text-red-500 md:text-sm">
            This time showed me how patience and perseverance contribute to
            creating something worthwhile, qualities I bring into every coding
            project I tackle today.
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-red-500 md:text-sm">
            This year marked my official transition into web development through
            an intensive 8-month ACS program. It was a demanding experience,
            where hard work and commitment were essential to keep up with the
            fast pace of the curriculum. We started with 30 students, but by the
            end, only a dozen of us remained, creating a tight-knit group who
            supported each other through challenges and shared a lot of
            memorable moments. The perseverance and determination I&apos;d honed
            in carpentry helped me succeed here, as I gained a solid foundation
            in coding and web development principles.
          </p>
          <p className="mb-8 text-xs font-normal text-blue-400 md:text-sm">
            After years in construction, I realized that many aspects of the
            industry weren&apos;t for me. The way the field is managed by
            organizations like the CCQ, RBQ, and CNESST often felt restrictive,
            and the physical demands were tough. Long commutes, freezing at
            -40°C in the winter, and sweating it out at over 30°C in the summer
            took a toll.
          </p>
          <div className="mb-8 text-xs font-normal text-blue-400 md:text-sm">
            Don&apos;t get me wrong—I genuinely enjoyed working as a carpenter.
            Building and creating with my hands was incredibly rewarding. But it
            was more the things surrounding the job that wore me down. This
            and.. The government was offering incentives for students to
            re-skill in the tech field, which gave me the final nudge I needed
            to explore web development.
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-red-500 md:text-sm">
            Most of 2023, i&apos;ve been looking for a job trying to learn some
            react on Udemy. I also took a pretty short (1month) class in pure
            Java but honestly hated it.
          </p>
          <p className="mb-8 text-xs font-normal text-blue-400 md:text-sm">
            Even tho I really tried to get a job and passed many interviews, in
            the end.
          </p>
        </div>
      ),
    },
    {
      title: currentDate,
      content: (
        <div>
          <p className="w-full text-2xl text-red-400 md:text-3xl lg:text-4xl">
            Ready and free to put much efforts to see your projects grow !
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="my-auto h-[90%] w-full py-10">
      <Timeline data={data} />
    </div>
  );
}
