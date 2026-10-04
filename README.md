This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Domain setup

The site canonical domain is determined by the `NEXT_PUBLIC_SITE_URL` environment variable (e.g. `https://www.aipromptnest.com` or `https://aipromptnest.com`).
- `NEXT_PUBLIC_SITE_URL` must match the **PRIMARY domain** configured in your hosting dashboard (e.g. Vercel, Cloudflare, Netlify).
- Next.js automatically derives the canonical host from `NEXT_PUBLIC_SITE_URL` and redirects the opposite variant (e.g. bare apex -> www, or www -> bare apex) to prevent duplicate content.
- Ensure that the opposite variant is NOT also configured to redirect in your hosting provider's dashboard to avoid circular redirect loops.

