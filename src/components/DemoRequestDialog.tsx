import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import DemoRequestForm from "@/components/DemoRequestForm";

interface DemoRequestDialogProps {
  source: string;
  children: ReactNode;
}

/** Wraps DemoRequestForm in a modal, triggered by any element passed as children. */
export default function DemoRequestDialog({ source, children }: DemoRequestDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-cis-dark border-cis-line text-cis-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeaderText />
        <DemoRequestForm source={source} onSuccess={() => setTimeout(() => setOpen(false), 1800)} />
      </DialogContent>
    </Dialog>
  );
}

function DialogHeaderText() {
  return (
    <div className="mb-1">
      <span className="badge-green">Richiedi una demo</span>
      <DialogTitle
        className="font-display font-black uppercase text-cis-white mt-3"
        style={{ fontSize: "1.6rem", lineHeight: 1 }}
      >
        Parliamo della tua società.
      </DialogTitle>
      <DialogDescription className="font-body text-cis-muted text-sm mt-2">
        Lasciaci i tuoi contatti: ti richiamiamo per una demo personalizzata, senza impegno.
      </DialogDescription>
    </div>
  );
}
