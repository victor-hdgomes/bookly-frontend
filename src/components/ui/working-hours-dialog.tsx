import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export type WorkingHour = {
  day: string;
  start: string;
  end: string;
};

interface WorkingHoursDialogProps {
  value: WorkingHour[];
  onChange: (value: WorkingHour[]) => void;
  triggerLabel?: string;
}

export function WorkingHoursDialog({ value, onChange, triggerLabel = "Configurar horário" }: WorkingHoursDialogProps) {
  const handleChange = (idx: number, field: "start" | "end", val: string) => {
    const updated = value.map((item, i) =>
      i === idx ? { ...item, [field]: val } : item
    );
    onChange(updated);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Horário de Funcionamento</DialogTitle>
          <DialogDescription>
            Defina o horário de abertura e fechamento para cada dia da semana.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {value.map((item, idx) => (
            <div key={item.day} className="flex items-center gap-2">
              <span className="w-20">{item.day}</span>
              <Input
                type="time"
                value={item.start}
                onChange={e => handleChange(idx, "start", e.target.value)}
                placeholder="Início"
              />
              <span>-</span>
              <Input
                type="time"
                value={item.end}
                onChange={e => handleChange(idx, "end", e.target.value)}
                placeholder="Fim"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
