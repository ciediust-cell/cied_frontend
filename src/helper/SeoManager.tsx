import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface RouteSeo {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
}

const DEFAULT_SEO: RouteSeo = {
  title: "CIED IUST",
  description:
    "Centre for Innovation and Entrepreneurship Development (CIED), IUST. Explore programs, events, gallery, startup portfolio, and community initiatives.",
  canonicalPath: "/",
  robots: "index,follow",
};

const ROUTE_SEO: Record<string, RouteSeo> = {
  "/": {
    title: "CIED IUST | Innovation & Entrepreneurship Development",
    description:
      "Centre for Innovation and Entrepreneurship Development (CIED), IUST. Supporting innovation, startups, incubation, and entrepreneurship.",
    canonicalPath: "/",
    robots: "index,follow",
  },
  "/aboutUs": {
    title: "About CIED IUST | Mission, Vision & Leadership",
    description:
      "Learn about CIED at IUST, our mission, leadership, objectives, and impact in building a strong entrepreneurship ecosystem.",
    canonicalPath: "/aboutUs",
    robots: "index,follow",
  },
  "/programs": {
    title: "Programs | CIED IUST",
    description:
      "Explore CIED programs, incubation support, mentoring, infrastructure, and opportunities for students, startups, and innovators.",
    canonicalPath: "/programs",
    robots: "index,follow",
  },
  "/portfolio": {
    title: "Startup Portfolio | CIED IUST",
    description:
      "Discover startups supported by CIED and their innovations across diverse sectors and domains.",
    canonicalPath: "/portfolio",
    robots: "index,follow",
  },
  "/members": {
    title: "Members | CIED IUST",
    description:
      "Meet the CIED leadership, mentors, advisors, and members contributing to the entrepreneurship ecosystem at IUST.",
    canonicalPath: "/members",
    robots: "index,follow",
  },
  "/recognition": {
    title: "Recognition | CIED IUST",
    description:
      "Explore awards, milestones, and recognitions received by CIED for its impact on innovation and entrepreneurship.",
    canonicalPath: "/recognition",
    robots: "index,follow",
  },
  "/news": {
    title: "News | CIED IUST",
    description:
      "Read the latest updates, announcements, and stories from CIED and the startup ecosystem.",
    canonicalPath: "/news",
    robots: "index,follow",
  },
  "/events": {
    title: "Events | CIED IUST",
    description:
      "Browse CIED events, workshops, and opportunities for networking, learning, and collaboration.",
    canonicalPath: "/events",
    robots: "index,follow",
  },
  "/gallery": {
    title: "Gallery | CIED IUST",
    description:
      "View moments from CIED events, workshops, programs, and startup activities in our gallery.",
    canonicalPath: "/gallery",
    robots: "index,follow",
  },
  "/contactUs": {
    title: "Contact CIED IUST",
    description:
      "Get in touch with CIED at IUST for programs, incubation support, partnerships, and general inquiries.",
    canonicalPath: "/contactUs",
    robots: "index,follow",
  },
  "/coming-soon": {
    title: "Coming Soon | CIED IUST",
    description:
      "This section of the CIED website is currently under development. Please check back soon for updates.",
    canonicalPath: "/coming-soon",
    robots: "noindex,follow",
  },
};

const SITE_URL = (import.meta.env.VITE_SITE_URL || "").replace(/\/+$/, "");
const DEFAULT_OG_IMAGE = "/ciedLogo.jpeg";

const getAbsoluteUrl = (path: string): string => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (SITE_URL) {
    return `${SITE_URL}${cleanPath}`;
  }
  if (typeof window !== "undefined") {
    return `${window.location.origin}${cleanPath}`;
  }
  return cleanPath;
};

const upsertMetaByName = (name: string, content: string) => {
  let el = document.head.querySelector(
    `meta[name="${name}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertMetaByProperty = (property: string, content: string) => {
  let el = document.head.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let el = document.head.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const routeSeo = ROUTE_SEO[pathname] || {
      ...DEFAULT_SEO,
      canonicalPath: pathname || "/",
    };

    const canonicalUrl = getAbsoluteUrl(routeSeo.canonicalPath);
    const ogImageUrl = getAbsoluteUrl(DEFAULT_OG_IMAGE);

    document.title = routeSeo.title;
    upsertMetaByName("description", routeSeo.description);
    upsertMetaByName("robots", routeSeo.robots || DEFAULT_SEO.robots || "index,follow");
    upsertCanonical(canonicalUrl);

    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:locale", "en_IN");
    upsertMetaByProperty("og:site_name", "CIED");
    upsertMetaByProperty("og:title", routeSeo.title);
    upsertMetaByProperty("og:description", routeSeo.description);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", ogImageUrl);
    upsertMetaByProperty("og:image:alt", "CIED IUST logo");

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:site", "@CIED_IUST");
    upsertMetaByName("twitter:title", routeSeo.title);
    upsertMetaByName("twitter:description", routeSeo.description);
    upsertMetaByName("twitter:url", canonicalUrl);
    upsertMetaByName("twitter:image", ogImageUrl);
  }, [pathname]);

  return null;
}
