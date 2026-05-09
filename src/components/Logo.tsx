import logo from "@/assets/logo-dmfs.png";

export default function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const h = size === "sm" ? 28 : 36;
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={logo}
        alt="DM Football Services"
        style={{ height: h, width: "auto" }}
        className="select-none"
        draggable={false}
      />
      <div className="hidden sm:flex flex-col leading-none">
        <span
          className="font-display font-black uppercase text-cis-white text-[11px]"
          style={{ letterSpacing: "0.18em" }}
        >
          DM Football
        </span>
        <span
          className="font-display font-bold uppercase text-cis-muted text-[9px] mt-0.5"
          style={{ letterSpacing: "0.24em" }}
        >
          Services
        </span>
      </div>
    </div>
  );
}
