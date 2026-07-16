interface ParagraphBlockProps {
  text: string;
}

export default function ParagraphBlock({ text }: ParagraphBlockProps) {
  return (
    <p className="text-foreground/75 leading-relaxed text-lg">
      {text}
    </p>
  );
}
