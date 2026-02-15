const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-secondary animate-[spin_1.5s_linear_infinite]" />
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
