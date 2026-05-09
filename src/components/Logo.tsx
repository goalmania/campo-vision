export default function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const txt = size === "sm" ? "text-[15px]" : "text-[17px]";
  const dot = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";
  return (
    <div className="flex items-center gap-2">
      <span
        className={`font-display font-black uppercase ${txt} text-cis-white`}
        style={{ letterSpacing: "0.16em" }}
      >
        CIS
      </span>
      <span className={`${dot} rounded-full bg-cis-green pulse-dot`} />
    </div>
  );
}
