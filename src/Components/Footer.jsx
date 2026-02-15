const Footer = () => {
  return (
    <footer className="py-8 mt-auto border-t border-white/10 glass text-center">
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} <span className="text-primary font-semibold">ToolsHub</span>. 
        All rights reserved. Made with <span className="text-red-500 animate-pulse">❤️</span>
      </p>
    </footer>
  );
};

export default Footer;
