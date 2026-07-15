import BlogBlock, { type Block } from "./BlogBlock";

interface BlogRendererProps {
  blocks: Block[];
}

/**
 * Renders an ordered list of blog content blocks.
 * Consecutive prompt blocks with images are grouped into a 2-column grid.
 */
export default function BlogRenderer({ blocks }: BlogRendererProps) {
  const renderedElements: React.ReactNode[] = [];
  let currentGroup: Extract<Block, { type: "prompt" }>[] = [];

  const flushGroup = (key: string | number) => {
    if (currentGroup.length === 0) return;

    if (currentGroup.length === 1) {
      renderedElements.push(
        <BlogBlock key={`single-${key}`} block={currentGroup[0]} />
      );
    } else {
      renderedElements.push(
        <div key={`grid-${key}`} className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          {currentGroup.map((block, idx) => (
            <BlogBlock key={idx} block={{ ...block, inGrid: true }} />
          ))}
        </div>
      );
    }
    currentGroup = [];
  };

  blocks.forEach((block, index) => {
    if (block.type === "prompt" && block.image) {
      currentGroup.push(block);
    } else {
      flushGroup(index);
      renderedElements.push(<BlogBlock key={index} block={block} />);
    }
  });
  flushGroup("final");

  return <div className="space-y-5">{renderedElements}</div>;
}
