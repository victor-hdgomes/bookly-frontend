import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NotesSectionProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export function NotesSection({ notes, onNotesChange }: NotesSectionProps) {
  const { t } = useTranslation("booking");

  return (
    <div className="space-y-2">
      <Label htmlFor="notes">{t("confirm.notes")}</Label>
      <Textarea
        id="notes"
        placeholder={t("confirm.notesPlaceholder")}
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        rows={3}
        className="resize-none"
      />
    </div>
  );
}
