import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AutocompleteProps {
  label: string;
  id: string;
  ocid: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  suggestions: string[];
}

function SuggestionSelect({
  suggestions,
  onSelect,
  id,
}: {
  suggestions: string[];
  onSelect: (v: string) => void;
  id: string;
}) {
  if (suggestions.length === 0) return null;

  return (
    <select
      className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 bg-gray-50 text-gray-600 mb-1 focus:outline-none focus:border-[#1a3a5c] print:hidden"
      defaultValue=""
      onChange={(e) => {
        if (e.target.value) {
          onSelect(e.target.value);
          e.target.value = "";
        }
      }}
      id={`${id}-suggest`}
      aria-label="Select from previous entries"
    >
      <option value="" disabled>
        -- Select from previous entries --
      </option>
      {suggestions.map((s) => (
        <option key={s} value={s}>
          {s.length > 60 ? `${s.slice(0, 57)}...` : s}
        </option>
      ))}
    </select>
  );
}

export function AutocompleteField({
  label,
  id,
  ocid,
  value,
  onChange,
  placeholder,
  required = false,
  suggestions,
}: AutocompleteProps) {
  return (
    <div className="space-y-1">
      <Label
        htmlFor={id}
        className="text-xs font-semibold text-gray-600 uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <SuggestionSelect suggestions={suggestions} onSelect={onChange} id={id} />
      <Input
        id={id}
        data-ocid={ocid}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-sm h-9 bg-white"
        autoComplete="off"
      />
    </div>
  );
}

export function AutocompleteTextarea({
  label,
  id,
  ocid,
  value,
  onChange,
  placeholder,
  required = false,
  suggestions,
}: AutocompleteProps) {
  return (
    <div className="space-y-1">
      <Label
        htmlFor={id}
        className="text-xs font-semibold text-gray-600 uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <SuggestionSelect suggestions={suggestions} onSelect={onChange} id={id} />
      <Textarea
        id={id}
        data-ocid={ocid}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="resize-none text-sm h-16 bg-white"
        autoComplete="off"
      />
    </div>
  );
}
