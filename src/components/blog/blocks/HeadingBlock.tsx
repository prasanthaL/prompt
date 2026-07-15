interface HeadingBlockProps {
  level: 2 | 3 | 4;
  text: string;
  id?: string;
}

export default function HeadingBlock({ level, text, id }: HeadingBlockProps) {
  const base =
    "font-bold tracking-tight scroll-mt-28 text-foreground";

  if (level === 2) {
    return (
      <h2
        id={id}
        className={`${base} text-3xl md:text-4xl mt-14 mb-4 border-l-4 border-primary pl-5`}
      >
        {text}
      </h2>
    );
  }

  if (level === 3) {
    return (
      <h3 id={id} className={`${base} text-xl md:text-2xl mt-10 mb-3`}>
        {text}
      </h3>
    );
  }

  return (
    <h4 id={id} className={`${base} text-lg mt-8 mb-2 text-primary/90`}>
      {text}
    </h4>
  );
}
