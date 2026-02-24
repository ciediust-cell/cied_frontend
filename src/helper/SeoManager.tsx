import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface RouteSeo {
  title: string;
  description: string;
  canonicalPath: string;
}

const DEFAULT_SEO: RouteSeo = {
  title: "CIED",
  description:
    "Centre for Innovation and Entrepreneurship Development (CIED), IUST. Explore programs, events, gallery, startup portfolio, and community initiatives.",
  canonicalPath: "/",
};

const ROUTE_SEO: Record<string, RouteSeo> = {
  "/": {
    title: "CIED",
    description:
      "Centre for Innovation and Entrepreneurship Development (CIED), IUST. Supporting innovation, startups, incubation, and entrepreneurship.",
    canonicalPath: "/",
  },
  "/aboutUs": {
    title: "About CIED",
    description:
      "Learn about CIED at IUST, our mission, leadership, objectives, and impact in building a strong entrepreneurship ecosystem.",
    canonicalPath: "/aboutUs",
  },
  "/programs": {
    title: "Programs | CIED",
    description:
      "Explore CIED programs, incubation support, mentoring, infrastructure, and opportunities for students, startups, and innovators.",
    canonicalPath: "/programs",
  },
  "/portfolio": {
    title: "Startup Portfolio | CIED",
    description:
      "Discover startups supported by CIED and their innovations across diverse sectors and domains.",
    canonicalPath: "/portfolio",
  },
  "/members": {
    title: "Members & Recognition | CIED",
    description:
      "Meet the CIED leadership and members, and explore recognitions, milestones, and achievements.",
    canonicalPath: "/members",
  },
  "/news": {
    title: "News | CIED",
    description:
      "Read the latest updates, announcements, and stories from CIED and the startup ecosystem.",
    canonicalPath: "/news",
  },
  "/events": {
    title: "Events | CIED",
    description:
      "Browse CIED events, workshops, and opportunities for networking, learning, and collaboration.",
    canonicalPath: "/events",
  },
  "/gallery": {
    title: "Gallery | CIED",
    description:
      "View moments from CIED events, workshops, programs, and startup activities in our gallery.",
    canonicalPath: "/gallery",
  },
  "/contactUs": {
    title: "Contact CIED",
    description:
      "Get in touch with CIED at IUST for programs, incubation support, partnerships, and general inquiries.",
    canonicalPath: "/contactUs",
  },
  "/coming-soon": {
    title: "Coming Soon | CIED",
    description:
      "This section of the CIED website is currently under development. Please check back soon for updates.",
    canonicalPath: "/coming-soon",
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
    upsertCanonical(canonicalUrl);

    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:site_name", "CIED");
    upsertMetaByProperty("og:title", routeSeo.title);
    upsertMetaByProperty("og:description", routeSeo.description);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", ogImageUrl);

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", routeSeo.title);
    upsertMetaByName("twitter:description", routeSeo.description);
    upsertMetaByName("twitter:image", ogImageUrl);
  }, [pathname]);

  return null;
}
