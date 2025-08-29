// WireExamples.tsx - Demo component showing different wire usages
import ElectricWire from "./wire";

export default function WireExamples() {
  return (
    <div className="p-8 bg-black text-green-400">
      <h2 className="text-2xl mb-6 text-center">Electric Wire Component Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Basic Straight Wires */}
        <div className="border border-gray-700 p-4 rounded">
          <h3 className="text-lg mb-4 text-cyan-400">Straight Wires</h3>
          <div className="space-y-4">
            <ElectricWire type="straight" length="short" intensity="low" color="cyan" />
            <ElectricWire type="straight" length="medium" intensity="medium" color="green" />
            <ElectricWire type="straight" length="long" intensity="high" color="white" />
          </div>
        </div>

        {/* Curved Wires */}
        <div className="border border-gray-700 p-4 rounded">
          <h3 className="text-lg mb-4 text-cyan-400">Curved Wires</h3>
          <div className="space-y-4">
            <ElectricWire type="curved" length="short" intensity="low" color="blue" />
            <ElectricWire type="curved" length="medium" intensity="medium" color="red" />
            <ElectricWire type="curved" length="long" intensity="high" color="cyan" />
          </div>
        </div>

        {/* Special Shapes */}
        <div className="border border-gray-700 p-4 rounded">
          <h3 className="text-lg mb-4 text-cyan-400">Special Shapes</h3>
          <div className="space-y-4">
            <ElectricWire type="zigzag" length="medium" intensity="medium" color="green" />
            <ElectricWire type="L-shape" length="short" intensity="high" color="red" />
            <ElectricWire type="corner" length="medium" intensity="low" color="blue" />
          </div>
        </div>

        {/* Vertical Wires */}
        <div className="border border-gray-700 p-4 rounded">
          <h3 className="text-lg mb-4 text-cyan-400">Vertical Wires</h3>
          <div className="flex justify-around items-start h-32">
            <ElectricWire type="straight" direction="vertical" length="short" intensity="low" color="cyan" />
            <ElectricWire type="curved" direction="vertical" length="medium" intensity="medium" color="green" />
            <ElectricWire type="zigzag" direction="vertical" length="long" intensity="high" color="white" />
          </div>
        </div>

        {/* Non-animated Wires */}
        <div className="border border-gray-700 p-4 rounded">
          <h3 className="text-lg mb-4 text-cyan-400">Static (No Animation)</h3>
          <div className="space-y-4">
            <ElectricWire type="straight" length="medium" intensity="medium" color="green" animated={false} />
            <ElectricWire type="curved" length="medium" intensity="medium" color="blue" animated={false} />
            <ElectricWire type="zigzag" length="medium" intensity="medium" color="red" animated={false} />
          </div>
        </div>

        {/* Custom Positioned Wire */}
        <div className="border border-gray-700 p-4 rounded relative">
          <h3 className="text-lg mb-4 text-cyan-400">Custom Position</h3>
          <div className="relative h-32 bg-gray-900 rounded">
            {/* Example of connecting two points */}
            <div className="absolute top-4 left-4 w-4 h-4 bg-green-400 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 bg-blue-400 rounded-full"></div>
            <ElectricWire 
              from={{ x: 10, y: 10 }} 
              to={{ x: 90, y: 70 }} 
              intensity="high" 
              color="cyan" 
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div className="mt-8 p-4 border border-gray-700 rounded">
        <h3 className="text-lg mb-4 text-cyan-400">Usage Examples</h3>
        <pre className="text-sm text-gray-400 overflow-x-auto">
{`// Basic horizontal wire
<ElectricWire type="straight" length="medium" intensity="medium" color="cyan" />

// Vertical connecting wire  
<ElectricWire type="curved" direction="vertical" length="short" intensity="low" color="green" />

// Custom positioned wire between two points
<ElectricWire 
  from={{ x: 0, y: 0 }} 
  to={{ x: 100, y: 50 }} 
  intensity="high" 
  color="cyan" 
/>

// Static wire (no animation)
<ElectricWire type="zigzag" length="long" animated={false} color="red" />`}
        </pre>
      </div>
    </div>
  );
}
