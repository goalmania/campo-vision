export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="block w-[7px] h-[7px] rounded-full bg-lime pulse-dot" />
      <span
        className="font-display font-bold uppercase text-[12px] md:text-[13px] text-white"
        style={{ letterSpacing: "3px" }}
      >
        DM Football Services
      </span>
    </div>
  );
}
