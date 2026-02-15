import { useRef, useEffect, useState } from "react";
import { Camera, Video, VideoOff, Maximize2, Monitor } from "lucide-react";

const LiveCamera = () => {
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
      }
    } catch (error) {
      console.error(`Error accessing camera: `, error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Camera size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Live Camera</h2>
              <p className="text-muted-foreground text-sm">Real-time camera feed preview</p>
            </div>
          </div>
          <button
            onClick={isActive ? stopCamera : startCamera}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg ${
              isActive 
                ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white" 
                : "bg-primary text-white hover:opacity-90 shadow-primary/20"
            }`}
          >
            {isActive ? <VideoOff size={18} /> : <Video size={18} />}
            {isActive ? "Stop Camera" : "Start Camera"}
          </button>
        </div>

        <div className="relative aspect-video rounded-3xl overflow-hidden glass border border-white/10 bg-black/40 shadow-inner group">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {!isActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-pulse">
              <div className="p-6 bg-white/5 rounded-full border border-white/10">
                <Monitor size={48} className="text-muted-foreground/30" />
              </div>
              <p className="text-muted-foreground/50 font-medium">Camera is offline</p>
            </div>
          )}

          {isActive && (
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="px-3 py-1.5 glass rounded-lg flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live Feed
              </div>
              <button className="p-2 glass rounded-lg text-white hover:bg-white/20 transition-colors">
                <Maximize2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveCamera;
