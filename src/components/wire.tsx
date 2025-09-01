// ElectricWire.tsx - Small modular wire component for connecting elements
interface ElectricWireProps {
  className?: string;
  type?: 'straight' | 'curved' | 'zigzag' | 'L-shape' | 'corner';
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  length?: 'short' | 'medium' | 'long';
  intensity?: 'low' | 'medium' | 'high';
  color?: 'cyan' | 'green' | 'blue' | 'white' | 'red';
  animated?: boolean;
  from?: { x: number; y: number };
  to?: { x: number; y: number };
}

export default function ElectricWire({ 
  className = '',
  type = 'straight',
  direction = 'horizontal',
  length = 'medium',
  intensity = 'medium',
  color = 'cyan',
  animated = true,
  from,
  to
}: ElectricWireProps) {
  
  // Wire configurations
  const config = {
    low: { wireWidth: 1, sparkWidth: 0.5, dash: 8, gap: 15, speed: '3s' },
    medium: { wireWidth: 1.5, sparkWidth: 0.8, dash: 12, gap: 20, speed: '2s' },
    high: { wireWidth: 2, sparkWidth: 1, dash: 16, gap: 25, speed: '1s' }
  };

  const colors = {
    cyan: '#00ffff',
    green: '#00ff99',
    blue: '#0099ff',
    white: '#ffffff',
    red: '#ff3366'
  };

  const lengths = {
    short: 40,
    medium: 80,
    long: 120
  };

  const { wireWidth, sparkWidth, dash, gap, speed } = config[intensity];
  const wireColor = colors[color];
  const wireLength = lengths[length];
  
  // Generate unique IDs for filters and gradients
  const uniqueId = Math.random().toString(36).substr(2, 9);

  // Calculate wire path based on type and direction
  const getWirePath = () => {
    const w = wireLength;
    const h = direction === 'vertical' ? wireLength : 20;
    
    // If custom from/to coordinates are provided
    if (from && to) {
      return `M${from.x},${from.y} L${to.x},${to.y}`;
    }

    switch (type) {
      case 'straight':
        return direction === 'vertical' 
          ? `M10,0 L10,${h}` 
          : direction === 'diagonal'
          ? `M0,0 L${w},${h/2}`
          : `M0,10 L${w},10`;
      
      case 'curved':
        return direction === 'vertical'
          ? `M10,0 Q15,${h/3} 10,${h/2} T10,${h}`
          : `M0,10 Q${w/3},5 ${w/2},10 T${w},10`;
      
      case 'zigzag':
        return direction === 'vertical'
          ? `M10,0 L15,${h/4} L5,${h/2} L15,${3*h/4} L10,${h}`
          : `M0,10 L${w/4},5 L${w/2},15 L${3*w/4},5 L${w},10`;
      
      case 'L-shape':
        return direction === 'vertical'
          ? `M10,0 L10,${h/2} L${w/2},${h/2}`
          : `M0,10 L${w/2},10 L${w/2},${h}`;
      
      case 'corner':
        return `M0,10 Q${w/2},10 ${w/2},${h/2} Q${w/2},${h} ${w},${h}`;
      
      default:
        return `M0,10 L${w},10`;
    }
  };

  const path = getWirePath();
  const viewBox = from && to 
    ? `${Math.min(from.x, to.x) - 5} ${Math.min(from.y, to.y) - 5} ${Math.abs(to.x - from.x) + 10} ${Math.abs(to.y - from.y) + 10}`
    : direction === 'vertical' 
    ? `0 0 20 ${wireLength}` 
    : `0 0 ${wireLength} 20`;

  return (
    <div className={`inline-block ${className}`}>
      <svg 
        viewBox={viewBox}
        className="w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          minWidth: direction === 'vertical' ? '20px' : `${wireLength}px`,
          minHeight: direction === 'vertical' ? `${wireLength}px` : '20px',
          maxWidth: direction === 'vertical' ? '30px' : `${wireLength + 40}px`,
          maxHeight: direction === 'vertical' ? `${wireLength + 40}px` : '30px'
        }}
      >
        <defs>
          <filter id={`glow-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id={`electric-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={wireColor} stopOpacity="0.7"/>
            <stop offset="25%" stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="50%" stopColor={wireColor} stopOpacity="1"/>
            <stop offset="75%" stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="100%" stopColor={wireColor} stopOpacity="0.7"/>
          </linearGradient>
        </defs>

        <style>{`
          .wire-${uniqueId} { 
            fill: none; 
            stroke: #1a1a2e; 
            stroke-width: ${wireWidth}; 
            stroke-linecap: round; 
            stroke-linejoin: round; 
            opacity: 0.4;
          }
          .spark-${uniqueId} { 
            fill: none; 
            stroke: url(#electric-${uniqueId}); 
            stroke-width: ${sparkWidth}; 
            stroke-linecap: round; 
            stroke-linejoin: round;
            filter: url(#glow-${uniqueId}); 
            ${animated ? `stroke-dasharray: ${dash} ${gap}; animation: run-${uniqueId} ${speed} linear infinite;` : ''}
          }
          .spark-${uniqueId}.alt { 
            opacity: 0.7; 
            ${animated ? `animation-delay: calc(${speed} * -0.5);` : ''}
          }
          ${animated ? `@keyframes run-${uniqueId} { 
            from { stroke-dashoffset: 0; } 
            to { stroke-dashoffset: -${dash + gap}; } 
          }` : ''}
        `}</style>

        {/* Base wire */}
        <path className={`wire-${uniqueId}`} d={path} />
        
        {/* Electric sparks */}
        {animated && (
          <>
            <path className={`spark-${uniqueId}`} d={path} />
            <path className={`spark-${uniqueId} alt`} d={path} />
          </>
        )}
      </svg>
    </div>
  );
}

// Background Electric Wires component for full-page effects
interface BackgroundElectricWiresProps {
  className?: string;
  position?: 'top' | 'bottom' | 'middle';
  intensity?: 'low' | 'medium' | 'high';
}

export function BackgroundElectricWires({ 
  className = '', 
  position = 'top',
  intensity = 'medium'
}: BackgroundElectricWiresProps) {
  
  const positionClasses = {
    top: 'absolute top-0 left-0 right-0 z-0',
    middle: 'absolute top-1/2 left-0 right-0 z-0 -translate-y-1/2',
    bottom: 'absolute bottom-0 left-0 right-0 z-0'
  };

  return (
    <div className={`${positionClasses[position]} ${className} overflow-hidden`}>
      <div className="flex flex-col gap-4 w-full">
        <ElectricWire type="straight" length="long" intensity={intensity} color="cyan" className="w-full opacity-30" />
        <ElectricWire type="curved" length="long" intensity={intensity} color="green" className="w-full opacity-20" />
        <ElectricWire type="zigzag" length="long" intensity={intensity} color="blue" className="w-full opacity-25" />
      </div>
    </div>
  );
}
