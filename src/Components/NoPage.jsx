import { Link } from "react-router-dom";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

function NoPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="glass p-12 rounded-[2.5rem] border border-white/10 shadow-2xl max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-amber-500 to-red-500 opacity-50" />
        
        <div className="flex justify-center">
          <div className="relative">
            <div className="p-6 bg-red-500/10 rounded-full text-red-500 animate-pulse">
              <AlertTriangle size={64} />
            </div>
            <div className="absolute -top-2 -right-2 bg-white text-slate-900 text-xs font-black px-2 py-1 rounded-lg shadow-lg rotate-12">
              WAIT!
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-8xl font-black bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold">Lost in the Hub?</h2>
          <p className="text-muted-foreground">
            Oops! The tool you're looking for doesn't exist or has moved to another dimension.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            to="/" 
            className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
          >
            <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
            Back to Dashboard
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full py-4 bg-white/5 border border-white/10 text-muted-foreground font-semibold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Previous Page
          </button>
        </div>

        {/* Decorative background blurs */}
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export default NoPage;
