import VerticalRain from "@/components/verticalRain";

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
      
      {/* SVG Background */}
      <div className="w-3/10 p-5 relative z-20">
        <h1 className="text-3xl font-bold ">Resume</h1>
        <p className="text-lg ">Download my resume:</p>
        <a href="/path/to/resume.pdf" className="text-cyan-400 hover:text-cyan-300 underline">
          ✩ Resume PDF
        </a>
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
