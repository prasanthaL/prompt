# AIPromptNest — Claims & Copy Audit Changelog

This document tracks all copy edits made to remove unverified claims, soften exaggerated statements, correct prompt metrics to match real database numbers, and adopt neutral, honest editorial labeling.

---

## 1. Unverified Testing & Process Claims Removed

### `src/app/about/page.tsx`
- **Previous Claim**:
  > *"Prompts originate from hands-on creative experiments, community explorations, and model evaluations. Before inclusion, prompts are tested across contemporary image diffusion models—including Google Gemini, ChatGPT (DALL-E), and Midjourney—to verify descriptive coherence and styling repeatability."*
- **Reason**: The claim of formal verification across multiple proprietary models could not be independently audited or verified.
- **Replacement**:
  > *"Prompts are collected, organised into categories, cleaned up, and checked for clarity and completeness before they are published. Results can vary between AI models, so we encourage you to adapt prompts to your own needs."*

- **Previous Claim**:
  > *"Our catalog is tiered to guarantee quality: core indexed prompts receive in-depth editorial breakdowns analyzing composition, lighting, common model failure modes, and concrete variation adjustments."*
- **Reason**: Absolute guarantee of quality cannot be verified.
- **Replacement**:
  > *"Our catalog is structured to help creators find useful ideas quickly: core indexed prompts include in-depth notes analyzing composition, lighting, common model failure modes, and concrete variation adjustments. Less structured or repetitive prompts remain unindexed."*

- **Previous Wording**:
  > *"How Prompts Are Collected & Tested"*
- **Replacement**:
  > *"How Prompts Are Collected & Reviewed"*

- **Previous Wording**:
  > *"Editorial Review & Quality Tiers"*
- **Replacement**:
  > *"Organization & Quality Tiers"*

- **Previous Wording**:
  > *"AIPromptNest is an independent digital resource created and maintained by a dedicated developer and AI art enthusiast team..."*
- **Replacement**:
  > Clarified that the site is maintained by the AIPromptNest team without invented identities or credentials, and explicitly added contact info and links to `/contact` and `hello.aipromptnest@gmail.com`.

---

## 2. Real Metric Synchronization (Accurate Prompt Counts)

Actual total prompts in database: **1,113 prompts** across 34 categories.

### `src/components/Hero.tsx`
- **Previous Value**: `promptsCount = 509` (hardcoded default) and formatted as vague `K+` or `Explore thousands of Gemini & ChatGPT AI prompts...`
- **Replacement**: Default updated to `1113`, formatted cleanly as `1,100+`, and body text updated to:
  > *"Explore over 1,100 Gemini & ChatGPT AI prompts for cinematic art, realistic photography, anime characters, cyberpunk scenes, fashion editorials, fantasy worlds, and more."*

### `src/data/home-data.ts`
- **Previous Wording**: *"Explore thousands of AI image prompts across categories like cinematic, anime, fantasy, fashion, architecture, and more..."*
- **Replacement**: *"Explore over 1,100 AI image prompts across categories like cinematic, anime, fantasy, fashion, architecture, and more..."*

### `src/app/layout.tsx`
- **Previous Metadata**: *"Explore 1,000+ free Gemini AI image prompts..."* (metadata description, OG description, Twitter description)
- **Previous Schema**: *"Browse thousands of free Gemini AI prompts for image generation..."* (WebPage JSON-LD schema)
- **Replacement**: Updated all instances to *"Explore 1,100+ free Gemini AI image prompts..."* and *"Browse over 1,100 free Gemini AI prompts..."* to accurately reflect the 1,113 prompt dataset.

### `src/app/categories/page.tsx`
- **Previous Metadata**: *"Discover thousands of free Gemini AI image prompts."*
- **Previous Twitter**: *"Browse thousands of free Gemini AI image prompts organized by category."*
- **Previous Schema**: *"Browse thousands of Gemini AI prompts organized by category."*
- **Previous Hero Text**: *"Explore thousands of free AI prompts for Google Gemini and ChatGPT..."*
- **Previous Deep SEO Text**: *"Discover thousands of free Gemini AI prompts organized into specialized categories..."*
- **Replacement**: Updated all five occurrences to *"over 1,100 free Gemini AI prompts"*.

### `src/app/categories/[category]/page.tsx`
- **Previous CTA**: *"Unleash your imagination by browsing thousands of copy-and-paste templates across all creative domains."*
- **Replacement**: *"Unleash your imagination by browsing over 1,100 copy-and-paste templates across all creative domains."*

---

## 3. Neutral Editorial & Review Labels

### `EDITORIAL-REVIEW.md`
- **Previous Reviewer**: `Reviewer: AIPromptNest Editorial Team`
- **Replacement**: `Reviewer: PENDING - site owner must proofread before publishing`
- **Action Items**: Added `[ ] Reviewed by site owner` checkbox to each of the 50 indexable prompt entries.

### `src/app/prompts/[slug]/page.tsx`
- **Previous Section Title**: `Prompt Guide & Technical Analysis` / `Curated editorial breakdown of composition...`
- **Replacement**: `Usage & Variation Guide` / `Technical breakdown of composition, lighting, and variation notes for this specific prompt.`
- **Previous Card Title**: `Tested Modification / Concrete Example Tweak`
- **Replacement**: `Suggested Modification / Concrete Example Tweak`

### `src/app/prompts/[slug]/PromptDetailClient.tsx`
- **Previous Badges**: `Editorial Usage & Variation Guide` / `Curated Editorial Guide`
- **Replacement**: `Usage & Variation Guide`
- **Previous Card Title**: `Tested Adjustment Example`
- **Replacement**: `Suggested Variation Example`

---

## 4. Latest Remediations: Unverifiable Claims, Blog Audits & Category Guides

### `src/app/HomeClient.tsx`
- **Previous Wording**: *"Handpicked premium prompts from our community"*
- **Replacement**: *"Featured image prompts from the library, ready to copy and use"* (eliminated unbacked "handpicked", "premium", and "community" claims).

### `src/data/blog.json`
- **Post `ai-negative-prompt-guide`**:
  - Removed unverified test statistic: *"In testing, users who implemented targeted negative prompts reduced post-generation edits from roughly 8 steps down to 3 on portrait batches."* Replaced with neutral technical guidance on exclusion zones and directing token selection.
  - Removed unverified threshold claim: *"In testing, overstuffing the negative prompt beyond roughly 200 characters led to muted contrast and under-detail."* Replaced with direct explanation of prompt dilution and flattened details.
- **Post `chatgpt-vs-gemini-best-ai-for-image-prompts`**:
  - Replaced *"you don't need to be a prompt engineering expert—ChatGPT handles the heavy lifting"* with *"you don't need extensive prompt engineering background—ChatGPT handles much of the initial formatting."*
  - Replaced unverified user-testing limits (*"In testing, ChatGPT generated about three to five images before hitting the daily limit."* and *"Gemini and Grok both showed no such limits in testing"*) with accurate platform availability notices noting dynamic caps and subscription tier variance.
- **Post `ai-logo-design-prompts-guide`**:
  - Removed ungrounded authority claim: *"According to experienced prompt engineers, strong logo prompts read like a designer's brief, not a keyword list."* Replaced with direct advice: *"Effective logo prompts read like a designer's creative brief rather than a disconnected keyword list."*
- **Post `ai-image-prompts-for-social-media`**:
  - Removed unverifiable testing assertion: *"Curiosity, surprise, and excitement expressions consistently outperform neutral or flat expressions in click-through rate testing."* Replaced with neutral observation regarding visual engagement on social feeds.

### `src/app/categories/page.tsx`
- **Previous Wording**: *"without searching through thousands of unrelated ideas."*
- **Replacement**: *"rather than browsing through an unfiltered list."*
- **Synchronized Numbers**: Replaced all instances of "thousands" with the accurate database count ("over 1,100").

### `src/data/prompts/fashion.json`
- **Previous Wording in `failureModes`**: *"guarantees high tactile fidelity."*
- **Replacement**: *"helps achieve high tactile fidelity."*

### `src/data/category-descriptions.ts`
- **All 34 Categories**: Replaced thin 14-20 word guide texts with comprehensive 170–250 word introductions structured in 3 paragraphs (Scenes & Recurring Subjects, Core Visual Techniques with Concrete Examples, and Practical Adaptation/Model Variance Notes).
- **Quality Verification**: Audited via `scripts/audit-categories.js` ensuring 0 categories under 150 words (min: 188 words, avg: 223 words) and 0 duplicate opening sentences.

