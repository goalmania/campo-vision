import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import DemoRequestForm from "@/components/DemoRequestForm";
import { useExitIntent, suppressExitIntent } from "@/hooks/useExitIntent";

interface ExitIntentPopupProps {
  source: string;
}

/** Mounted once per page; shows the demo-request form when the visitor is about to leave. */
export default function ExitIntentPopup({ source }: ExitIntentPopupProps) {
  const [open, setOpen] = useState(false);

  const trigger = useCallback(() => setOpen(true), []);
  useExitIntent(trigger, true);

  const handleOpenChange = (next: boolean) => {
    if (!next) suppressExitIntent();
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-cis-dark border-cis-line text-cis-white max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="mb-1">
          <span className="badge-gold">Aspetta</span>
          <DialogTitle
            className="font-display font-black uppercase text-cis-white mt-3"
            style={{ fontSize: "1.6rem", lineHeight: 1 }}
          >
            Prima di andare via, parliamone.
          </DialogTitle>
          <DialogDescription className="font-body text-cis-muted text-sm mt-2">
            Lasciaci un contatto: ti richiamiamo noi con una demo su misura per la tua società, senza impegno.
          </DialogDescription>
        </div>
        <DemoRequestForm
          source={source}
          onSuccess={() => {
            suppressExitIntent();
            setTimeout(() => setOpen(false), 1800);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
