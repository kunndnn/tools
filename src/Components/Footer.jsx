import BuyMeACoffee from "./BuyMeACoffee";

const Footer = () => {
  return (
    <footer className="py-10 mt-auto border-t border-white/10 glass">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center">
        <BuyMeACoffee />

        <div
          className="h-px w-14 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          aria-hidden="true"
        />

        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary font-semibold">ToolsHub</span>. All
          rights reserved. Made with{" "}
          <span className="text-red-500 animate-pulse">❤️</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
