# AIPromptNest — AdSense Low Value Content Fix

This update targets the Google AdSense **Low value content** warning without rewriting the 1,090 prompt JSON records by hand.

## What changed

- Added `src/lib/prompt-content.ts` to create prompt-specific editorial guidance from each prompt's actual text.
- Prompt detail pages now include server-rendered sections for:
  - Prompt Guide / overview
  - Best use cases
  - How to customize
  - Prompt breakdown
  - Tips for better results
  - Responsible-use guidance
- Existing `about` and `howToUse` fields are still respected when they exist.
- Removed the `PromptNest` naming from prompt-page metadata and use `AIPromptNest` consistently.
- Prompt structured data now identifies AIPromptNest as the publisher/organization rather than every record being presented as an individual person.
- Prompt-page metadata no longer says every prompt was written by `Admin`.
- Sitemap/indexing quality gate now requires a source prompt of at least 60 words, in addition to the existing high-quality and placeholder checks.
- Updated the content audit script to use the same 60-word indexing threshold.

## Important

This is a quality improvement, not an AdSense approval guarantee. After deployment, review the live pages, Search Console coverage, and the AdSense policy page before requesting another review.

Do not claim that content was written by a human if it was generated automatically. The new guide is deterministic and derived from the actual prompt text; it should be reviewed as part of normal editorial QA.
