import logo from "@/assets/logo-dmfs.webp";

export default function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const h = size === "sm" ? 36 : 44;
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="DM Football Services"
        style={{ height: h, width: "auto" }}
        className="select-none"
        draggable={false}
      />
      <div className="hidden sm:flex flex-col leading-tight">
        <span
          className="font-display font-black uppercase text-cis-white text-[13px]"
          style={{ letterSpacing: "0.16em" }}
        >
          DM Football
        </span>
        <span
          className="font-display font-bold uppercase text-cis-muted text-[10px] mt-0.5"
          style={{ letterSpacing: "0.22em" }}
        >
          Services
        </span>
      </div>
    </div>
  );
}
