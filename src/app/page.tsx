import Image from "next/image";
import RainEffect from "@/components/rain";
import NeonLight from "@/components/neonLight";
import FlickerText from "@/components/glitch";
import Flicker from "@/components/flicker";
import Card from "@/components/card";
import DiscordStatus from "@/components/discordStatus";
import SpotifyStatus from "@/components/spotifyStatus";
import FastMarquee from "@/components/fastMarquee";
import { abhContent } from "@/components/SVG/abhData";
import { iContent } from "@/components/SVG/iData";
import { navContent } from "@/components/SVG/navData";
import NeonTetris from "@/components/tetris";
import {
  SOCIAL_LINKS,
  ABOUT_HIGHLIGHTS,
  PROJECTS,
  SHORT_TERM_GOALS,
  LONG_TERM_GOALS,
  MARQUEE_SKILLS_TOP,
  MARQUEE_SKILLS_BOTTOM,
  HASHTAGS,
} from "@/constants/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-400 pixelify-font p-4 relative">
      <RainEffect withThunder />



      {/* Top electric wires */}

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header with Neon Light */}
        <header className="text-center mb-8">
          <br />
          <div className="flex items-end justify-center gap-2 mb-4">
            <NeonLight
              svg={abhContent}
              color="green"
              size="uniform-sm"
              flickering={false}
            />
            <NeonLight
              svg={iContent}
              color="green"
              size="uniform-sm"
              flickering={true}
            />
            <NeonLight
              svg={navContent}
              color="green"
              size="uniform-sm"
              flickering={false}
            />
          </div>
          <br></br>

          <p className="text-cyan-400 text-lg animate-pulse">
            [ WELCOME ]
          </p>
        </header>


        <div className="flex flex-col lg:flex-row justify-center">
          {/* Main Content Section */}
          <div className="flex flex-col mb-6 lg:mr-1 w-full lg:w-3/4">

            <Card
              title="About Me"
              description=""
              borderColor="border-green-800"
              titleColor="text-yellow-400"
              size="lg"
              icon=">"
              flickering={true}
              className="mb-3"
            >
              <div className="flex justify-around mb-2">
                <div className="relative w-1/5 mr-3">
                  <Image
                    src="/pfp.svg"
                    alt="Abhinav's profile picture"
                    width={200}
                    height={200}
                    className="w-full h-auto mt-2 border-green-600 border-4 relative z-10"
                    priority
                  />
                  <div className="absolute inset-0 pointer-events-none z-20 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-repeat-y scanline-overlay"></div>
                  </div>
                </div>
                <div className="w-4/5">
                  This is my personal corner of the internet. Welcome to my little site, started on September 1st, 2025. <br />
                  It&apos;s where I stash projects, half-baked ideas, and random experiments. I like coding and making things just for fun. You can read more about me here!
                </div>
              </div>
              <br />
              <div className="space-y-3 text-green-300 pixelify-font text-m tracking-wide leading-relaxed">
                {ABOUT_HIGHLIGHTS.map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-2 ${item.color !== 'text-green-300' ? item.color : ''}`}>
                    <span className="text-cyan-400 text-xl">•</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </Card>
            <FastMarquee
              speed={80}
              direction="left"
              className="text-cyan-400 text-lg  border-b border-green-800 pb-2"
              pauseOnHover={true}
              gradient={true}
              gradientColor="black"
            >
              {MARQUEE_SKILLS_TOP.map((skill, idx) => (
                <span key={idx} className="mx-8">{skill}</span>
              ))}
            </FastMarquee>
            <FastMarquee
              speed={60}
              direction="right"
              className="text-green-400 text-lg  border-green-800 pt-2 pb-2"
              pauseOnHover={true}
              gradient={true}
              gradientColor="black"
            >
              {MARQUEE_SKILLS_BOTTOM.map((skill, idx) => (
                <span key={idx} className="mx-8">{skill}</span>
              ))}
            </FastMarquee>
            <Card
              title="Projects"
              description=""
              borderColor="border-cyan-800"
              titleColor="text-yellow-400"
              size="lg"
              icon=">"
              className="mt-2 mb-1"
              flickering={false}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map((project, idx) => (
                  <Card
                    key={idx}
                    title={project.title}
                    description={project.description}
                    icon={project.icon}
                    size="sm"
                    borderColor={project.borderColor}
                    flickering={project.flickering}
                  />
                ))}
              </div>

            </Card>
            <Flicker text="Monthly Updates" size="2xl" color="#00ff99" />
            <Card
              title=""
              description="Just got done with my End Sems For 5th Semester! Excited for the winter break ahead. Looking forward to working on some cool projects and back to some DSA along with learning new stuff. Stay tuned for updates!"
              icon=""

              size="lg"
              borderColor="border-blue-800"
              className="mt-1"
              flickering={true}
            />

          </div>

          {/* Sidebar */}
          <aside className="lg:ml-1 w-full lg:w-1/4">
            <Card
              title="STARS"
              description=""
              borderColor="border-green-800"
              titleColor="text-yellow-400 text-xl"
              size="sm"
              icon=">"
              className="mb-2 p-4"
              flickering={false}
            >
              <nav aria-label="Social links">
                <div className="flex flex-col gap-4 pixelify-font">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      aria-label={`Visit my ${link.label}`}
                      className="text-cyan-400 hover:text-cyan-300 underline tracking-wide"
                    >
                      {link.icon} {link.label}
                    </a>
                  ))}
                </div>
              </nav>
            </Card>
            <Card
              title="MUSIC"
              description=""
              borderColor="border-green-800"
              titleColor="text-yellow-400 text-xl"
              size="sm"
              icon=">"
              className="mb-2 p-4"
              flickering={false}
            >
              <div className="flex flex-col gap-4 pixelify-font">
                <SpotifyStatus userId="653067764898070542" />
              </div>
            </Card>

            <Card
              title="STATUS"
              description=""
              borderColor="border-green-800"
              titleColor="text-yellow-400 text-2xl"
              size="sm"
              icon=">"
              className="mb-2 p-4"
              flickering={false}
            >
              <div className="flex flex-col gap-4 pixelify-font">
                <DiscordStatus userId="653067764898070542" />
              </div>
            </Card>
            <NeonTetris />

            {/* Kelvin GIF at the bottom */}
            <div className="mt-4 flex justify-center">
              <Image
                src="/kelvin.gif"
                alt="Kelvin animation"
                width={400}
                height={200}
                className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300 mt-10 ml-2"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
                unoptimized
              />
            </div>

          </aside>
        </div>

        <FlickerText text="HELLO WORLD" size="3xl" />

        {/* Middle electric wires for section separation */}

        {/* Projects Section */}




        {/* Goals Section */}
        <section aria-label="Goals">
          <Card
            title="Goals"
            description=""
            borderColor="border-purple-800"
            titleColor="text-yellow-400"
            size="lg"
            icon=">"
            className="mb-6"
            flickering={true}
          >
            <div className="space-y-4 pixelify-font text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="text-cyan-400 font-bold">🎯 Short Term</div>
                  <div className="space-y-1">
                    {SHORT_TERM_GOALS.map((goal, idx) => (
                      <div key={idx} className="text-green-300">• {goal.text}</div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-purple-400 font-bold">🚀 Long Term </div>
                  <div className="space-y-1">
                    {LONG_TERM_GOALS.map((goal, idx) => (
                      <div key={idx} className="text-purple-300">• {goal.text}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-3">
                <div className="text-yellow-400 font-bold mb-2">💡 Current Focus</div>
                <div className="text-green-300">
                  My Research Paper on Fairness in Machine Learning. <br />
                  Always excited to collaborate on innovative projects!
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {HASHTAGS.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 ${tag.bgColor} border ${tag.borderColor} rounded ${tag.textColor} text-xs`}
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* Status/Stats Card */}


        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p>© 2025 ABHINOOBs - Made with ❤️ and lots of caffeine</p>
          <p className="mt-2">
            <span className="text-green-400">{">"}</span>
            <span className="animate-pulse">_</span>
          </p>
        </footer>
      </div>

      {/* Bottom electric wires */}
    </main>
  );
}
