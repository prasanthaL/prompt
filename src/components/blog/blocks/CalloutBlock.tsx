import { CheckCircle2, AlertCircle, Info, XCircle } from "lucide-react";

type CalloutVariant = "success" | "warning" | "info" | "error";

interface CalloutBlockProps {
  variant?: CalloutVariant;
  title?: string;
  items?: string[];
  text?: string;
}

const variantMap: Record<
  CalloutVariant,
  { border: string; bg: string; icon: string; text: string; iconEl: React.ReactNode }
> = {
  success: {
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    icon: "text-green-400",
    text: "text-green-300",
    iconEl: <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />,
  },
  warning: {
    border: "border-yellow-400/30",
    bg: "bg-yellow-400/5",
    icon: "text-yellow-400",
    text: "text-yellow-300",
    iconEl: <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />,
  },
  info: {
    border: "border-blue-400/30",
    bg: "bg-blue-400/5",
    icon: "text-blue-400",
    text: "text-blue-300",
    iconEl: <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />,
  },
  error: {
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    icon: "text-red-400",
    text: "text-red-300",
    iconEl: <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />,
  },
};

export default function CalloutBlock({
  variant = "info",
  title,
  items,
  text,
}: CalloutBlockProps) {
  const v = variantMap[variant];

  return (
    <div className={`my-6 rounded-2xl border ${v.border} ${v.bg} p-5 space-y-3`}>
      {title && (
        <p className={`font-bold text-sm ${v.text}`}>{title}</p>
      )}
      {text && (
        <p className="text-foreground/75 leading-relaxed text-sm">{text}</p>
      )}
      {items && items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              {v.iconEl}
              <span className="text-foreground/75 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
