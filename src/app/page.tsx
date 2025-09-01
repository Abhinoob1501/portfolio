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

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-400 pixelify-font p-4 relative">
      <RainEffect withThunder />
      
      

      
      {/* Top electric wires */}
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header with Neon Light */}
        <div className="text-center mb-8">
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
        </div>


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
                <img src="/pfp.svg" alt="ME" className="w-full h-auto mt-2 border-green-600 border-4 relative z-10" />
                <div className="absolute inset-0 pointer-events-none z-20 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-repeat-y scanline-overlay"></div>
                </div>
              </div>
              <div className="w-4/5"> 
This is my personal corner of the internet. Welcome to my little site, started on September 1st, 2025. <br />
It’s where I stash projects, half-baked ideas, and random experiments. I like coding and making things just for fun. You can read more about me here!
              </div>
            </div>
            <br />
            <div className="space-y-3 text-green-300 pixelify-font text-m tracking-wide leading-relaxed">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-xl">•</span>
                  <p>Ex ML Intern at IIT-D specializing in fairness-aware models & NLP</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-xl">•</span>
                  <p>Built compilers, conversational AI, and full-stack applications</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-xl">•</span>
                  <p>Passionate about NLP, Generative AI, and system programming</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 text-xl">•</span>
                  <p>AI Team Lead — AWS Cloud Club</p>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <span className="text-cyan-400 text-xl">•</span>
                  <p>📍 Delhi, India • Open to remote opportunities</p>
                </div>
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
              <span className="mx-8">🤖 PYTORCH 🤖</span>
              <span className="mx-8">🧠 MACHINE LEARNING & NLP 🧠</span>
              <span className="mx-8">⚡ GENERATIVE AI & LANGCHAIN ⚡</span>
              <span className="mx-8">📊 FAIRNESS-AWARE MODELS 📊</span>
              <span className="mx-8">🚀 BUILDING WITH NEXT.JS & RAG 🚀</span>

            </FastMarquee>
            <FastMarquee 
              speed={60} 
              direction="right"
              className="text-green-400 text-lg  border-green-800 pt-2 pb-2"
              pauseOnHover={true}
              gradient={true}
              gradientColor="black"
            >
              <span className="mx-8">⚡ NEXT.JS ⚡</span>
              <span className="mx-8">💻 REACT & NODE.JS 💻</span>
              <span className="mx-8">🛠️ EXPRESS & MONGODB 🛠️</span>
              <span className="mx-8">🎨 TAILWIND CSS 🎨</span>
              <span className="mx-8">🚀 FULL-STACK DEVELOPMENT 🚀</span>

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
                <Card
                  title="Compiler-BUBBLE"
                  description="A light weight compiler to run my own language bubble"
                  icon="☾"
                  size="sm"
                  borderColor="border-gray-800"
                  flickering={true}
                />
                <Card
                  title="GPTree"
                  description="Chatgpt if we had a tree structure to map our minds while working"
                  icon="☾"
                  size="sm"
                  borderColor="border-blue-900"
                />
                <Card
                  title="AI context sharer chrome extension"
                  description="Sharing AI context seamlessly across platforms"
                  icon="☾"
                  size="sm"
                  borderColor="border-purple-800"
                />
                <Card
                  title="Research Work on AI Security"
                  description="In Progress..."
                  icon="☾"
                  size="sm"
                  borderColor="border-green-800"
                />
              </div>
              
            </Card>
            <Flicker text="Monthly Updates" size="2xl" color="#00ff99" />
            <Card
              title=""
              description="This month, I’m juggling building my portfolio and hunting for SIH team members—basically trying to clone myself before exams hit. Between coding sessions, late-night debugging, and endless coffee, I’m on the lookout for teammates who are curious, motivated, and up for a bit of chaos. If anyone’s feeling adventurous (and slightly crazy) enough to join the ride, you know where to find me! Let’s make something awesome before deadlines and exams catch up."
              icon=""

              size="lg"
              borderColor="border-blue-800"
              className="mt-1"
              flickering={true}
            />
            
          </div>
          
          {/* Sidebar */}
          <div className="lg:ml-1 w-full lg:w-1/4">
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
            <div className="flex flex-col gap-4 pixelify-font">
              <a href="https://github.com/Abhinoob1501" target="_blank" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
                ✩ GitHub
              </a>
              <a href="https://x.com/Abhi_noob_" target="_blank" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
                ✩ Twitter
              </a>
              <a href="https://discord.gg/GWu74z5M" target="_blank" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
                ✩ Discord
              </a>
              <a href="mailto:abhinavpratapsingh1501@gmail.com" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
                ✩ Email
              </a>
              <a href="/resume" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
                ✩ Resume
              </a>
            </div>
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
              <img 
                src="/kelvin.gif" 
                alt="Kelvin" 
                className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300 mt-10 ml-2"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
            </div>
            
          </div>
        </div>

        <FlickerText text="HELLO WORLD" size="3xl" />

        {/* Middle electric wires for section separation */}

        {/* Projects Section */}




        {/* Goals Section */}
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
                  <div className="text-green-300">• Land an Intern ship again (PLEASE HIRE ME)</div>
                  <div className="text-green-300">• Make some cool projects</div>
                  <div className="text-green-300">• Maintain my gpa</div>
                  <div className="text-green-300">• Stay fit</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-purple-400 font-bold">🚀 Long Term </div>
                <div className="space-y-1">
                  <div className="text-purple-300">• Land dream tech job</div>
                  <div className="text-purple-300">• be happy??</div>

                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-3">
              <div className="text-yellow-400 font-bold mb-2">💡 Current Focus</div>
              <div className="text-green-300">
                My Research Paper on Security in Continual Adversarial Learning for AI models. <br />
                Always excited to collaborate on innovative projects!
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-cyan-800/30 border border-cyan-800 rounded text-cyan-300 text-xs">
                #MachineLearning
              </span>
              <span className="px-2 py-1 bg-purple-800/30 border border-purple-800 rounded text-purple-300 text-xs">
                #FullStack
              </span>
              <span className="px-2 py-1 bg-green-800/30 border border-green-800 rounded text-green-300 text-xs">
                #OpenSource
              </span>
              <span className="px-2 py-1 bg-yellow-800/30 border border-yellow-800 rounded text-yellow-300 text-xs">
                #Innovation
              </span>
            </div>
          </div>
        </Card>

        {/* Status/Stats Card */}


        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 ABHINOOBs - Made with ❤️ and lots of caffeine</p>
          <p className="mt-2">
            <span className="text-green-400">{">"}</span> 
            <span className="animate-pulse">_</span>
          </p>
        </div>
      </div>
      
      {/* Bottom electric wires */}
    </main>
  );
}

