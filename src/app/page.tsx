import RainEffect from "@/components/rain";
import NeonLight from "@/components/neonLight";
import FlickerText from "@/components/glitch";
import Flicker from "@/components/flicker";
import Card from "@/components/card";
import DiscordStatus from "@/components/discordStatus";
import SimpleDiscordStatus from "@/components/simpleDiscordStatus";
import { nameContent } from "@/components/SVG/nameData";
import { abhContent } from "@/components/SVG/abhData";
import { iContent } from "@/components/SVG/iData";
import { navContent } from "@/components/SVG/navData";
import  ElectricWires  from "@/components/wire";

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


        <div className="flex justify-center">
          {/* Main Content Section */}
          <div className="flex flex-col mb-6 mr-1 w-3/4">

            <Card
              title="About Me"
              description=""
              borderColor="border-green-800"
              titleColor="text-yellow-400"
              size="lg"
              icon=">"
              flickering={true}
            >
            <div className="flex justify-around mb-2">
              <img src="/path/to/image.jpg" alt="About Me" className="w-xs h-auto rounded-lg" />
              <div className=""> 
                <p>• Passionate about retro computing and modern web tech</p>
                <p>• Building cool things on the internet since forever</p>
                <p>• Currently coding in: JavaScript, React, Node.js</p>
              </div>
            </div>

            <div className="space-y-2 text-green-300 pixelify-font tracking-wide">
                <p>• Full-stack developer and digital creator</p>
                <p>• Passionate about retro computing and modern web tech</p>
                <p>• Building cool things on the internet since forever</p>
                <p>• Currently coding in: JavaScript, React, Node.js</p>
                <p>• Location: Cyberspace</p>
            </div>
            </Card>
            <Card
              title="Projects"
              description=""
              borderColor="border-cyan-800"
              titleColor="text-yellow-400"
              size="lg"
              icon=">"
              className="mt-2"
              flickering={false}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  title="Portfolio Website"
                  description="This retro-styled portfolio with rain effects"
                  icon="☾"
                  size="sm"
                  borderColor="border-gray-700"
                />
                <Card
                  title="Web Applications"
                  description="Modern React applications with vintage aesthetics"
                  icon="☾"
                  size="sm"
                  borderColor="border-blue-800"
                />
                <Card
                  title="Open Source"
                  description="Contributing to the developer community"
                  icon="☾"
                  size="sm"
                  borderColor="border-red-800"
                />
                <Card
                  title="Digital Art"
                  description="Pixel art and retro-style graphics"
                  icon="☾"
                  size="sm"
                  borderColor="border-orange-800"
                />
              </div>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="ml-1 w-1/4">
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
              <a href="#" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
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
              title="LAST PLAYED"
              description=""
              borderColor="border-green-800"
              titleColor="text-yellow-400 text-xl"
              size="sm"
              icon=">"
              className="mb-2 p-4"
              flickering={false}
            >
            <div className="flex flex-col gap-4 pixelify-font">

            </div>
            </Card>
            <Card
              title="STATUS"
              description=""
              borderColor="border-green-800"
              titleColor="text-yellow-400 text-2xl"
              size="sm"
              icon=">"
              className="mb-6 p-4"
              flickering={false}
            >
            <div className="flex flex-col gap-4 pixelify-font">
              {/* Try the real Discord status first, fallback to simple version */}
              <DiscordStatus userId="653067764898070542" />
              
              {/* Uncomment this and comment the above if you want a working fallback */}
              {/* <SimpleDiscordStatus 
                fallbackStatus="online" 
                customActivity="Building awesome websites" 
              /> */}
            </div>
            </Card>
          </div>
        </div>
        <FlickerText text="HELLO WORLD" fontSize={64} />

        {/* Middle electric wires for section separation */}

        {/* Projects Section */}


        <Flicker text="ABHINAV" fontSize={72} color="#00ff99" />

        {/* Connect Section */}
        <Card
          title="Connect"
          description=""
          borderColor="border-purple-800"
          titleColor="text-yellow-400"
          size="lg"
          icon=">"
          className="mb-6"
          flickering={true}
        >
          <div className="flex flex-wrap gap-4 pixelify-font">
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
              ✩ GitHub
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
              ✩ Twitter
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
              ✩ Discord
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
              ✩ Email
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline tracking-wide">
              ✩ Blog
            </a>
          </div>
        </Card>

        {/* Status/Stats Card */}
        <Card
          title=""
          description=""
          borderColor="border-yellow-800"
          size="md"
          className="mb-6"
        >
          <div className="flex justify-between items-center text-sm pixelify-font tracking-wide">
            <span className="text-green-400">Status: Online</span>
            <span className="text-cyan-400">Last updated: {new Date().toLocaleDateString()}</span>
            <span className="text-purple-400">Visitors: 1337</span>
          </div>
        </Card>

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

