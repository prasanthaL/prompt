import ParagraphBlock from "./blocks/ParagraphBlock";
import HeadingBlock from "./blocks/HeadingBlock";
import PromptBlock from "./blocks/PromptBlock";
import ComparisonBlock from "./blocks/ComparisonBlock";
import ListBlock from "./blocks/ListBlock";
import TableBlock from "./blocks/TableBlock";
import TipBlock from "./blocks/TipBlock";
import CalloutBlock from "./blocks/CalloutBlock";
import FaqBlock from "./blocks/FaqBlock";
import RelatedPromptsBlock from "./blocks/RelatedPromptsBlock";
import CardsBlock from "./blocks/CardsBlock";
import FormulaBlock from "./blocks/FormulaBlock";
import PromptGridBlock from "./blocks/PromptGridBlock";
import RelatedPostsBlock from "./blocks/RelatedPostsBlock";

// ---------------------------------------------------------------------------
// Block union type — add new types here to keep everything in sync
// ---------------------------------------------------------------------------

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3 | 4; text: string; id?: string }
  | { type: "prompt"; title?: string; prompt: string; image?: string; inGrid?: boolean; slug?: string; href?: string; category?: string }
  | { type: "comparison"; leftTitle?: string; left: string; rightTitle?: string; right: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "tip"; title?: string; text: string }
  | {
      type: "callout";
      variant?: "success" | "warning" | "info" | "error";
      title?: string;
      items?: string[];
      text?: string;
    }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "relatedPrompts"; title?: string; ids: string[] }
  // ── New types ──────────────────────────────────────────────────────────
  | { type: "cards"; items: { title: string; description?: string }[] }
  | { type: "formula"; text: string }
  | { type: "promptGrid"; categories: string[]; perCategory?: number }
  | { type: "relatedPosts"; ids: string[] };

interface BlogBlockProps {
  block: Block;
}

/**
 * Dispatches a single blog block to the correct component
 * based on the `type` property.
 */
export default function BlogBlock({ block }: BlogBlockProps) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock text={block.text} />;

    case "heading":
      return <HeadingBlock level={block.level} text={block.text} id={block.id} />;

    case "prompt":
      return (
        <PromptBlock
          title={block.title}
          prompt={block.prompt}
          image={block.image}
          inGrid={block.inGrid}
          slug={block.slug}
          href={block.href}
          category={block.category}
        />
      );

    case "comparison":
      return (
        <ComparisonBlock
          leftTitle={block.leftTitle}
          left={block.left}
          rightTitle={block.rightTitle}
          right={block.right}
        />
      );

    case "list":
      return <ListBlock items={block.items} ordered={block.ordered} />;

    case "table":
      return <TableBlock headers={block.headers} rows={block.rows} />;

    case "tip":
      return <TipBlock title={block.title} text={block.text} />;

    case "callout":
      return (
        <CalloutBlock
          variant={block.variant}
          title={block.title}
          items={block.items}
          text={block.text}
        />
      );

    case "faq":
      return <FaqBlock items={block.items} />;

    case "relatedPrompts":
      return <RelatedPromptsBlock title={block.title} ids={block.ids} />;

    // ── New cases ──────────────────────────────────────────────────────────

    case "cards":
      return <CardsBlock items={block.items} />;

    case "formula":
      return <FormulaBlock text={block.text} />;

    case "promptGrid":
      return <PromptGridBlock categories={block.categories} perCategory={block.perCategory} />;

    case "relatedPosts":
      return <RelatedPostsBlock ids={block.ids} />;

    default:
      return null;
  }
}
