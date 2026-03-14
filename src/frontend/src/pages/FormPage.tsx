import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2, Save } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ConsignmentNote } from "../backend.d";
import { useCreateConsignmentNote } from "../hooks/useQueries";
import { generateConsignmentPdf } from "../utils/generatePdf";

const emptyForm = (): ConsignmentNote => ({
  gcNo: "",
  date: "",
  fromCity: "",
  toCity: "",
  truckNo: "",
  consignorName: "",
  consignorAddress: "",
  consignorGST: "",
  consigneeName: "",
  consigneeAddress: "",
  consigneeGST: "",
  description: "",
  noOfArticles: "",
  modePacking: "",
  invoiceNo: "",
  invoiceDate: "",
  invoiceValue: "",
  weightActual: "",
  weightChanded: "",
  rate: "",
  freight: "",
  advance: "",
  hamaali: "",
  stChange: "",
  duty: "",
  taxes: "",
  grandTotal: "",
  amountToPayRs: "",
  amountToPayP: "",
  amountPaidRs: "",
  amountPaidP: "",
  remarks: "",
  billedTo: "TO PAY",
});

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px flex-1 bg-gray-200" />
      <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 px-2">
        {children}
      </h3>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

function FieldGroup({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return <div className={`grid gap-4 ${className}`}>{children}</div>;
}

function Field({
  label,
  id,
  ocid,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  required = false,
}: {
  label: string;
  id: string;
  ocid: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
}) {
  return (
    <div className="space-y-1">
      <Label
        htmlFor={id}
        className="text-xs font-semibold text-gray-600 uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {multiline ? (
        <Textarea
          id={id}
          data-ocid={ocid}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="resize-none text-sm h-16 bg-white"
        />
      ) : (
        <Input
          id={id}
          type={type}
          data-ocid={ocid}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-sm h-9 bg-white"
        />
      )}
    </div>
  );
}

export default function FormPage() {
  const [form, setForm] = useState<ConsignmentNote>(emptyForm());
  const { mutateAsync: save, isPending } = useCreateConsignmentNote();

  const update = (field: keyof ConsignmentNote) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.gcNo.trim()) {
      toast.error("G.C. No. is required");
      return;
    }
    try {
      await save(form);
      toast.success("Consignment note saved successfully!");
      setForm(emptyForm());
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  const handleGeneratePdf = () => {
    if (!form.gcNo.trim()) {
      toast.error("Please fill in G.C. No. before generating PDF");
      return;
    }
    generateConsignmentPdf(form);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Card - Dark Navy Blue matching the reference screenshot */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ backgroundColor: "#1a3a5c" }}
        className="rounded-xl p-6 mb-8 shadow-lg"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <img
              src="/assets/uploads/IMG-20250909-WA0012-1-1.jpg"
              alt="INDTRANS logo"
              style={{ height: 64, width: "auto", objectFit: "contain" }}
            />
            <div>
              <h1 className="font-bold text-2xl tracking-tight text-white">
                INDTRANS FREIGHT
              </h1>
              <h1 className="font-bold text-2xl tracking-tight text-white">
                SOLUTIONS
              </h1>
              <p className="text-white/70 text-xs mt-1">
                103, Grohitam Premises APMC market Sector 19 Vashi, Navi Mumbai
                400703
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-white/80">
            <div className="font-bold text-white">GST: 27AAJF1355P1ZQ</div>
            <div className="text-white/80">PAN: AAJF1355SP</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Shipment Info */}
        <motion.section
          variants={sectionVariants}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          <SectionTitle>Shipment Information</SectionTitle>
          <FieldGroup className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            <Field
              label="G.C. No."
              id="gcNo"
              ocid="gcno.input"
              value={form.gcNo}
              onChange={update("gcNo")}
              placeholder="e.g. GC-001"
              required
            />
            <Field
              label="Date"
              id="date"
              ocid="date.input"
              value={form.date}
              onChange={update("date")}
              type="date"
              required
            />
            <Field
              label="From City"
              id="fromCity"
              ocid="from.input"
              value={form.fromCity}
              onChange={update("fromCity")}
              placeholder="Mumbai"
            />
            <Field
              label="To City"
              id="toCity"
              ocid="to.input"
              value={form.toCity}
              onChange={update("toCity")}
              placeholder="Delhi"
            />
            <Field
              label="Truck No."
              id="truckNo"
              ocid="truck.input"
              value={form.truckNo}
              onChange={update("truckNo")}
              placeholder="MH12AB1234"
            />
          </FieldGroup>
        </motion.section>

        {/* Consignor + Consignee */}
        <motion.section
          variants={sectionVariants}
          className="grid md:grid-cols-2 gap-4"
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <SectionTitle>Consignor (Sender)</SectionTitle>
            <div className="space-y-3">
              <Field
                label="Name"
                id="consignorName"
                ocid="consignor.name.input"
                value={form.consignorName}
                onChange={update("consignorName")}
                placeholder="Company / Person Name"
              />
              <Field
                label="Address"
                id="consignorAddress"
                ocid="consignor.textarea"
                value={form.consignorAddress}
                onChange={update("consignorAddress")}
                placeholder="Full address..."
                multiline
              />
              <Field
                label="GST No."
                id="consignorGST"
                ocid="consignor.gst.input"
                value={form.consignorGST}
                onChange={update("consignorGST")}
                placeholder="27AAAAA0000A1ZX"
              />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <SectionTitle>Consignee (Receiver)</SectionTitle>
            <div className="space-y-3">
              <Field
                label="Name"
                id="consigneeName"
                ocid="consignee.name.input"
                value={form.consigneeName}
                onChange={update("consigneeName")}
                placeholder="Company / Person Name"
              />
              <Field
                label="Address"
                id="consigneeAddress"
                ocid="consignee.textarea"
                value={form.consigneeAddress}
                onChange={update("consigneeAddress")}
                placeholder="Full address..."
                multiline
              />
              <Field
                label="GST No."
                id="consigneeGST"
                ocid="consignee.gst.input"
                value={form.consigneeGST}
                onChange={update("consigneeGST")}
                placeholder="27AAAAA0000A1ZX"
              />
            </div>
          </div>
        </motion.section>

        {/* Goods Details */}
        <motion.section
          variants={sectionVariants}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          <SectionTitle>Goods Details</SectionTitle>
          <FieldGroup className="grid-cols-1 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <Field
                label="Description (Said to Contain)"
                id="description"
                ocid="goods.description.textarea"
                value={form.description}
                onChange={update("description")}
                placeholder="e.g. Electronics, Furniture..."
                multiline
              />
            </div>
            <Field
              label="No. of Articles"
              id="noOfArticles"
              ocid="goods.articles.input"
              value={form.noOfArticles}
              onChange={update("noOfArticles")}
              placeholder="e.g. 5"
            />
            <Field
              label="Mode of Packing"
              id="modePacking"
              ocid="goods.packing.input"
              value={form.modePacking}
              onChange={update("modePacking")}
              placeholder="e.g. Boxes, Cartons"
            />
          </FieldGroup>
        </motion.section>

        {/* Invoice */}
        <motion.section
          variants={sectionVariants}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          <SectionTitle>Invoice Details</SectionTitle>
          <FieldGroup className="grid-cols-1 sm:grid-cols-3">
            <Field
              label="Invoice No."
              id="invoiceNo"
              ocid="invoice.no.input"
              value={form.invoiceNo}
              onChange={update("invoiceNo")}
              placeholder="INV-2024-001"
            />
            <Field
              label="Invoice Date"
              id="invoiceDate"
              ocid="invoice.date.input"
              value={form.invoiceDate}
              onChange={update("invoiceDate")}
              type="date"
            />
            <Field
              label="Invoice Value (Rs.)"
              id="invoiceValue"
              ocid="invoice.value.input"
              value={form.invoiceValue}
              onChange={update("invoiceValue")}
              placeholder="0.00"
            />
          </FieldGroup>
        </motion.section>

        {/* Weight & Rate */}
        <motion.section
          variants={sectionVariants}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          <SectionTitle>Weight &amp; Rate</SectionTitle>
          <FieldGroup className="grid-cols-1 sm:grid-cols-3">
            <Field
              label="Weight Actual (Kgs)"
              id="weightActual"
              ocid="weight.actual.input"
              value={form.weightActual}
              onChange={update("weightActual")}
              placeholder="0.00"
            />
            <Field
              label="Weight Chanded (Kgs)"
              id="weightChanded"
              ocid="weight.chanded.input"
              value={form.weightChanded}
              onChange={update("weightChanded")}
              placeholder="0.00"
            />
            <Field
              label="Rate (Rs. per Kg/MT)"
              id="rate"
              ocid="rate.input"
              value={form.rate}
              onChange={update("rate")}
              placeholder="0.00"
            />
          </FieldGroup>
        </motion.section>

        {/* Charges */}
        <motion.section
          variants={sectionVariants}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          <SectionTitle>Charges</SectionTitle>
          <FieldGroup className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            <Field
              label="Freight (Rs.)"
              id="freight"
              ocid="charges.freight.input"
              value={form.freight}
              onChange={update("freight")}
              placeholder="0.00"
            />
            <Field
              label="Advance (Rs.)"
              id="advance"
              ocid="charges.advance.input"
              value={form.advance}
              onChange={update("advance")}
              placeholder="0.00"
            />
            <Field
              label="Hamaali"
              id="hamaali"
              ocid="charges.hamaali.input"
              value={form.hamaali}
              onChange={update("hamaali")}
              placeholder="0.00"
            />
            <Field
              label="S.T. Change"
              id="stChange"
              ocid="charges.stchange.input"
              value={form.stChange}
              onChange={update("stChange")}
              placeholder="0.00"
            />
            <Field
              label="Duty"
              id="duty"
              ocid="charges.duty.input"
              value={form.duty}
              onChange={update("duty")}
              placeholder="0.00"
            />
            <Field
              label="Taxes"
              id="taxes"
              ocid="charges.taxes.input"
              value={form.taxes}
              onChange={update("taxes")}
              placeholder="0.00"
            />
            <div className="col-span-2 lg:col-span-2">
              <Field
                label="Grand Total (Rs.)"
                id="grandTotal"
                ocid="charges.total.input"
                value={form.grandTotal}
                onChange={update("grandTotal")}
                placeholder="0.00"
              />
            </div>
          </FieldGroup>
        </motion.section>

        {/* Payment */}
        <motion.section
          variants={sectionVariants}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          <SectionTitle>Payment Details</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <Field
              label="Amount to Pay (Rs.)"
              id="amountToPayRs"
              ocid="payment.topay.rs.input"
              value={form.amountToPayRs}
              onChange={update("amountToPayRs")}
              placeholder="0"
            />
            <Field
              label="Amount to Pay (P.)"
              id="amountToPayP"
              ocid="payment.topay.p.input"
              value={form.amountToPayP}
              onChange={update("amountToPayP")}
              placeholder="00"
            />
            <Field
              label="Amount Paid (Rs.)"
              id="amountPaidRs"
              ocid="payment.paid.rs.input"
              value={form.amountPaidRs}
              onChange={update("amountPaidRs")}
              placeholder="0"
            />
            <Field
              label="Amount Paid (P.)"
              id="amountPaidP"
              ocid="payment.paid.p.input"
              value={form.amountPaidP}
              onChange={update("amountPaidP")}
              placeholder="00"
            />
          </div>
          <Field
            label="Remarks"
            id="remarks"
            ocid="payment.remarks.textarea"
            value={form.remarks}
            onChange={update("remarks")}
            placeholder="Any additional remarks..."
            multiline
          />
        </motion.section>

        {/* Billed To */}
        <motion.section
          variants={sectionVariants}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          <SectionTitle>Billed To</SectionTitle>
          <div className="flex gap-3 flex-wrap">
            {(["TO PAY", "PAID", "TO BE BILLED"] as const).map((option) => (
              <button
                key={option}
                type="button"
                data-ocid={"billed.toggle"}
                onClick={() => update("billedTo")(option)}
                className={`px-6 py-2 rounded-lg border-2 text-sm font-bold tracking-wide transition-all duration-150 ${
                  form.billedTo === option
                    ? "bg-[#1a3a5c] text-white border-[#1a3a5c] shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#1a3a5c]/50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Action Buttons */}
        <motion.div
          variants={sectionVariants}
          className="flex flex-col sm:flex-row gap-4 pt-2 pb-8"
        >
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="flex-1 h-12 text-base font-semibold bg-[#1a3a5c] hover:bg-[#152f4a] text-white"
            data-ocid="form.submit_button"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Record
              </>
            )}
          </Button>
          <Button
            onClick={handleGeneratePdf}
            variant="outline"
            className="flex-1 h-12 text-base font-semibold border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c]/10"
            data-ocid="form.primary_button"
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
