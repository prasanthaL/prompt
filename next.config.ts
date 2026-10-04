import type { NextConfig } from "next";

function getRedirects() {
  const siteUrlStr = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aipromptnest.com";
  let canonicalHost = "";
  let protocol = "https";

  try {
    const parsed = new URL(siteUrlStr);
    canonicalHost = parsed.hostname.toLowerCase();
    protocol = parsed.protocol.replace(":", "") || "https";
  } catch {
    canonicalHost = siteUrlStr.replace(/^https?:\/\//, "").split("/")[0].split(":")[0].toLowerCase();
  }

  const redirectsList = [];

  // Only emit host redirects for non-local domains with at least one dot
  const isLocalOrIp =
    !canonicalHost ||
    canonicalHost === "localhost" ||
    canonicalHost.endsWith(".local") ||
    /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(canonicalHost);

  if (!isLocalOrIp && canonicalHost.includes(".")) {
    let oppositeHost = "";
    if (canonicalHost.startsWith("www.")) {
      oppositeHost = canonicalHost.slice(4);
    } else {
      oppositeHost = `www.${canonicalHost}`;
    }

    // Never emit a redirect whose source host equals its destination host
    if (oppositeHost && oppositeHost !== canonicalHost) {
      redirectsList.push({
        source: "/:path*",
        has: [
          {
            type: "host" as const,
            value: oppositeHost,
          },
        ],
        destination: `${protocol}://${canonicalHost}/:path*`,
        permanent: true,
      });
    }
  }

  // Keep permanent legacy redirect
  redirectsList.push({
    source: "/jackpot",
    destination: "/discover",
    permanent: true,
  });

  return redirectsList;
}

const nextConfig: NextConfig = {
  async redirects() {
    return getRedirects();
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Allow all quality levels used across the app
    qualities: [75, 85, 90, 95, 100],
    // Larger breakpoints for high-DPI / retina screens
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Finer steps for fill/thumbnail images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
