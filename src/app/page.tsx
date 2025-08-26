import RainEffect from "@/components/rain";
import NeonLight from "@/components/neonLight";
import FlickerText from "@/components/glitch";
import Flicker from "@/components/flicker";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-4">
      <RainEffect withThunder />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header with Neon Light */}
        <div className="text-center mb-8">
          <NeonLight 
            svg={`
              <svg viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
                <text x="400" y="20" font-family="VT323, monospace" font-size="16" text-anchor="middle" fill="currentColor">
                  █████╗ ██████╗ ██╗  ██╗██╗███╗   ██╗ █████╗ ██╗   ██╗
                </text>
                <text x="400" y="40" font-family="VT323, monospace" font-size="16" text-anchor="middle" fill="currentColor">
                  ██╔══██╗██╔══██╗██║  ██║██║████╗  ██║██╔══██╗██║   ██║
                </text>
                <text x="400" y="60" font-family="VT323, monospace" font-size="16" text-anchor="middle" fill="currentColor">
                  ███████║██████╔╝███████║██║██╔██╗ ██║███████║██║   ██║
                </text>
                <text x="400" y="80" font-family="VT323, monospace" font-size="16" text-anchor="middle" fill="currentColor">
                  ██╔══██║██╔══██╗██╔══██║██║██║╚██╗██║██╔══██║╚██╗ ██╔╝
                </text>
                <text x="400" y="100" font-family="VT323, monospace" font-size="16" text-anchor="middle" fill="currentColor">
                  ██║  ██║██████╔╝██║  ██║██║██║ ╚████║██║  ██║ ╚████╔╝
                </text>
                <text x="400" y="120" font-family="VT323, monospace" font-size="16" text-anchor="middle" fill="currentColor">
                  ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝
                </text>
              </svg>
            `}
            color="green" 
            size="xl" 
            flickering={true}
            className="mb-4"
          />
          <p className="text-cyan-400 text-lg animate-pulse">
            [ Welcome to ABHINAV.DEV ]
          </p>
        </div>

        {/* Main content in retro style */}
        <div className="bg-gray-900 border-2 border-green-500 p-6 mb-6 rounded">
          <h2 className="text-yellow-400 text-xl mb-4 underline">
            &gt; About Me
          </h2>
          <div className="space-y-2 text-green-300">
            <p>• Full-stack developer and digital creator</p>
            <p>• Passionate about retro computing and modern web tech</p>
            <p>• Building cool things on the internet since forever</p>
            <p>• Currently coding in: JavaScript, React, Node.js</p>
            <p>• Location: Cyberspace</p>
          </div>
        </div>
        <FlickerText text="HELLO WORLD" fontSize={64} />
        {/* Projects section */}
        <div className="bg-gray-900 border-2 border-cyan-500 p-6 mb-6 rounded">
          <h2 className="text-yellow-400 text-xl mb-4 underline">
            &gt; Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-600 p-3 rounded">
              <h3 className="text-cyan-400 font-bold">☾ Portfolio Website</h3>
              <p className="text-green-300 text-sm">This retro-styled portfolio with rain effects</p>
            </div>
            <div className="border border-green-600 p-3 rounded">
              <h3 className="text-cyan-400 font-bold">☾ Web Applications</h3>
              <p className="text-green-300 text-sm">Modern React applications with vintage aesthetics</p>
            </div>
            <div className="border border-green-600 p-3 rounded">
              <h3 className="text-cyan-400 font-bold">☾ Open Source</h3>
              <p className="text-green-300 text-sm">Contributing to the developer community</p>
            </div>
            <div className="border border-green-600 p-3 rounded">
              <h3 className="text-cyan-400 font-bold">☾ Digital Art</h3>
              <p className="text-green-300 text-sm">Pixel art and retro-style graphics</p>
            </div>
          </div>
        </div>
        <Flicker text="ABHINAV" fontSize={72} color="#00ff99" />
        {/* Links section */}
        <div className="bg-gray-900 border-2 border-purple-500 p-6 mb-6 rounded">
          <h2 className="text-yellow-400 text-xl mb-4 underline">
            &gt; Connect
          </h2>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
              ✩ GitHub
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
              ✩ Twitter
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
              ✩ Discord
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
              ✩ Email
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
              ✩ Blog
            </a>
          </div>
        </div>

        {/* Status/Stats */}
        <div className="bg-gray-900 border-2 border-yellow-500 p-4 mb-6 rounded">
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-400">Status: Online</span>
            <span className="text-cyan-400">Last updated: {new Date().toLocaleDateString()}</span>
            <span className="text-purple-400">Visitors: 1337</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 DIMOEN.DEV - Made with ❤️ and lots of caffeine</p>
          <p className="mt-2">
            <span className="text-green-400">{">"}</span> 
            <span className="animate-pulse">_</span>
          </p>
        </div>
      </div>
    </main>
  );
}

