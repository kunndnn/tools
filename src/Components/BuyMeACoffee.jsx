import bmcLogo from "../assets/bmc-logo.svg";
import { DATA } from "../helpers/constants";

const BuyMeACoffee = ({ className = "" }) => {
  return (
    <a
      href={DATA.buyMeACoffeeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee"
      className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFDD00] shadow-md shadow-black/10 ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FFDD00]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDD00] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      <img
        src={bmcLogo}
        alt=""
        aria-hidden="true"
        className="h-7 w-auto transition-transform duration-300 group-hover:scale-110"
      />

      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-semibold text-background opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        Buy me a coffee
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-foreground" />
      </span>
    </a>
  );
};

export default BuyMeACoffee;
