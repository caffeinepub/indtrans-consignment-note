import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Package, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { ConsignmentNote } from "../backend.d";
import { useGetAllConsignmentNotes } from "../hooks/useQueries";
import { generateConsignmentPdf } from "../utils/generatePdf";

const billedBadgeVariant = (billed: string) => {
  if (billed === "PAID") return "default";
  if (billed === "TO PAY") return "destructive";
  return "secondary";
};

export default function RecordsPage() {
  const { data: notes = [], isLoading } = useGetAllConsignmentNotes();
  const [search, setSearch] = useState("");

  const filtered = notes.filter(
    (n: ConsignmentNote) =>
      n.gcNo.toLowerCase().includes(search.toLowerCase()) ||
      n.consignorName.toLowerCase().includes(search.toLowerCase()) ||
      n.fromCity.toLowerCase().includes(search.toLowerCase()) ||
      n.toCity.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h2 className="font-display text-3xl font-bold text-foreground mb-1">
          Consignment Records
        </h2>
        <p className="text-muted-foreground text-sm">
          All saved goods consignment notes
        </p>
      </motion.div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          data-ocid="records.search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by GC No, consignor, city..."
          className="pl-9 h-10"
        />
      </div>

      {isLoading ? (
        <div data-ocid="records.loading_state" className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          data-ocid="records.empty_state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-1">
            {search ? "No matching records" : "No records yet"}
          </h3>
          <p className="text-muted-foreground text-sm">
            {search
              ? "Try adjusting your search terms"
              : "Create a new consignment note to get started"}
          </p>
        </motion.div>
      ) : (
        <motion.div
          data-ocid="records.table"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="space-y-3"
        >
          {filtered.map((note: ConsignmentNote, idx: number) => (
            <motion.div
              key={note.gcNo}
              data-ocid={`records.item.${idx + 1}`}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-card border border-border rounded-xl p-4 shadow-xs hover:shadow-card transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-primary text-sm">
                      {note.gcNo}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      &bull;
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {note.date}
                    </span>
                    <Badge
                      variant={billedBadgeVariant(note.billedTo)}
                      className="text-xs px-2 py-0"
                    >
                      {note.billedTo}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium text-foreground truncate">
                    {note.consignorName || "—"}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <span>{note.fromCity || "—"}</span>
                    <span>→</span>
                    <span>{note.toCity || "—"}</span>
                    {note.truckNo && (
                      <>
                        <span className="mx-1">&bull;</span>
                        <span>{note.truckNo}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {note.grandTotal && (
                    <span className="text-sm font-bold text-foreground">
                      ₹{note.grandTotal}
                    </span>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    data-ocid={`records.item.${idx + 1}`}
                    onClick={() => generateConsignmentPdf(note)}
                    className="h-8 text-xs gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    View / Print PDF
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
