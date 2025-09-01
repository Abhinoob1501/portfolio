import Flicker from "@/components/flicker";
import VerticalRain from "@/components/verticalRain";
import Link from "next/link";

export default function Resume() {
  return (
    <main className="min-h-screen flex bg-black text-green-400 pixelify-font relative">
      {/* Vertical Rain Effect */}
      <VerticalRain 
        intensity={3} 
        colors={[
          "rgba(255, 255, 255, 0.9)",   // Bright white
          "rgba(255, 255, 255, 0.8)",   // White
          "rgba(255, 255, 255, 0.7)",   // Slightly transparent white
          "rgba(255, 255, 255, 0.6)",   // More transparent white
        ]} 
      />
      
      <div className="w-3/10  flex-col space-y-4 p-5 relative z-20">

        <div className="flex justify-center mt-0 mb-0"><Flicker text="RESUME" fontSize={50} /></div>
        <div className="flex justify-center mt-0 mb-0"><Flicker text="🢗" fontSize={70} /></div>
        <div className="flex justify-center ">
          <a href="/abhinav_resume.pdf">
            <svg xmlns="http://www.w3.org/2000/svg" className="hover:fill-cyan-500" viewBox="0 0 16 18" width="150" height="180" shapeRendering="crispEdges" role="img" aria-label="Pixel page">
  
  <rect x="3" y="1" width="1" height="1" fill="white"/>
  <rect x="4" y="1" width="1" height="1" fill="white"/>
  <rect x="5" y="1" width="1" height="1" fill="white"/>
  <rect x="6" y="1" width="1" height="1" fill="white"/>
  <rect x="7" y="1" width="1" height="1" fill="white"/>
  <rect x="8" y="1" width="1" height="1" fill="white"/>
  <rect x="9" y="1" width="1" height="1" fill="white"/>
  <rect x="10" y="1" width="1" height="1" fill="white"/>
  <rect x="11" y="1" width="1" height="1" fill="white"/>
  <rect x="11" y="1" width="1" height="1" fill="white"/>
  <rect x="3" y="2" width="1" height="1" fill="white"/>
  <rect x="10" y="2" width="1" height="1" fill="white"/>
  <rect x="11" y="2" width="1" height="1" fill="white"/>
  <rect x="3" y="3" width="1" height="1" fill="white"/>
  <rect x="11" y="3" width="1" height="1" fill="white"/>
  <rect x="3" y="4" width="1" height="1" fill="white"/>
  <rect x="11" y="4" width="1" height="1" fill="white"/>
  <rect x="3" y="5" width="1" height="1" fill="white"/>
  <rect x="11" y="5" width="1" height="1" fill="white"/>
  <rect x="3" y="6" width="1" height="1" fill="white"/>
  <rect x="11" y="6" width="1" height="1" fill="white"/>
  <rect x="3" y="7" width="1" height="1" fill="white"/>
  <rect x="11" y="7" width="1" height="1" fill="white"/>
  <rect x="3" y="8" width="1" height="1" fill="white"/>
  <rect x="11" y="8" width="1" height="1" fill="white"/>
  <rect x="3" y="9" width="1" height="1" fill="white"/>
  <rect x="11" y="9" width="1" height="1" fill="white"/>
  <rect x="3" y="10" width="1" height="1" fill="white"/>
  <rect x="11" y="10" width="1" height="1" fill="white"/>
  <rect x="3" y="11" width="1" height="1" fill="white"/>
  <rect x="11" y="11" width="1" height="1" fill="white"/>
  <rect x="3" y="12" width="1" height="1" fill="white"/>
  <rect x="11" y="12" width="1" height="1" fill="white"/>
  <rect x="3" y="13" width="1" height="1" fill="white"/>
  <rect x="11" y="13" width="1" height="1" fill="white"/>
  <rect x="3" y="14" width="1" height="1" fill="white"/>
  <rect x="4" y="14" width="1" height="1" fill="white"/>
  <rect x="5" y="14" width="1" height="1" fill="white"/>
  <rect x="6" y="14" width="1" height="1" fill="white"/>
  <rect x="7" y="14" width="1" height="1" fill="white"/>
  <rect x="8" y="14" width="1" height="1" fill="white"/>
  <rect x="9" y="14" width="1" height="1" fill="white"/>
  <rect x="10" y="14" width="1" height="1" fill="white"/>
  <rect x="11" y="14" width="1" height="1" fill="white"/>

  <rect x="9" y="1" width="1" height="1" fill="white"/>
  <rect x="11" y="1" width="1" height="1" fill="white"/>
  

  <rect x="4" y="3" width="1" height="1" fill="white"/>
  <rect x="5" y="3" width="1" height="1" fill="white"/>
  <rect x="6" y="3" width="1" height="1" fill="white"/>
  <rect x="7" y="3" width="1" height="1" fill="white"/>
  <rect x="8" y="3" width="1" height="1" fill="white"/>
  
  <rect x="4" y="5" width="1" height="1" fill="white"/>
  <rect x="5" y="5" width="1" height="1" fill="white"/>
  <rect x="6" y="5" width="1" height="1" fill="white"/>
  <rect x="7" y="5" width="1" height="1" fill="white"/>
  <rect x="8" y="5" width="1" height="1" fill="white"/>
  <rect x="9" y="5" width="1" height="1" fill="white"/>
  
  <rect x="4" y="7" width="1" height="1" fill="white"/>
  <rect x="5" y="7" width="1" height="1" fill="white"/>
  <rect x="6" y="7" width="1" height="1" fill="white"/>
  <rect x="7" y="7" width="1" height="1" fill="white"/>
  
  <rect x="4" y="9" width="1" height="1" fill="white"/>
  <rect x="5" y="9" width="1" height="1" fill="white"/>
  <rect x="6" y="9" width="1" height="1" fill="white"/>
  <rect x="7" y="9" width="1" height="1" fill="white"/>
  <rect x="8" y="9" width="1" height="1" fill="white"/>
  
  <rect x="4" y="11" width="1" height="1" fill="white"/>
  <rect x="5" y="11" width="1" height="1" fill="white"/>
  <rect x="6" y="11" width="1" height="1" fill="white"/>
</svg>
          </a>
        </div>
        <div className="text-center"><Link href="/" className="z-20"><Flicker text="go back" fontSize={30} /></Link></div>


      </div>
      <div
        className="w-7/10 inset-0 opacity-100 relative z-10"
        style={{
          backgroundImage: 'url(/background.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
    
        }}
      />
        
    </main>
  );
}

