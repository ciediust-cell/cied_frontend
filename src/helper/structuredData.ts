import type { NewsItem } from "src/types/news";

interface NewsStructuredDataItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  newsDate: string;
  publishedAt: string | null;
}

const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || "").trim();
const siteUrl = configuredSiteUrl.replace(/\/+$/, "");

const resolveBaseUrl = (): string => {
  if (siteUrl) return siteUrl;
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
};

const toAbsoluteUrl = (value: string): string => {
  if (!value) return value;
  if (/^https?:\/\//i.test(value)) return value;

  const baseUrl = resolveBaseUrl();
  if (!baseUrl) return value;

  const path = value.startsWith("/") ? value : `/${value}`;
  return `${baseUrl}${path}`;
};

const toIsoDate = (value?: string | null): string | undefined => {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
};

const getSiteBase = () => {
  return resolveBaseUrl() || "https://www.ciediust.in";
};

export const buildOrganizationJsonLd = () => {
  const base = getSiteBase();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}#organization`,
    name: "Centre for Innovation and Entrepreneurship Development (CIED), IUST",
    alternateName: "CIED IUST",
    url: base,
    logo: toAbsoluteUrl("/ciedLogo.jpeg"),
    email: "cied@iust.ac.in",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Islamic University of Science and Technology",
      url: "https://www.iust.ac.in",
    },
  };
};

export const buildWebsiteJsonLd = () => {
  const base = getSiteBase();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}#website`,
    name: "CIED",
    url: base,
    publisher: {
      "@id": `${base}#organization`,
    },
  };
};

export const buildNewsCollectionJsonLd = (items: NewsStructuredDataItem[]) => {
  const base = getSiteBase();

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${base}/news#collection`,
    url: `${base}/news`,
    name: "CIED News",
    isPartOf: {
      "@id": `${base}#website`,
    },
    about: {
      "@id": `${base}#organization`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => {
        const published =
          toIsoDate(item.publishedAt) || toIsoDate(item.newsDate) || undefined;

        return {
          "@type": "ListItem",
          position: index + 1,
          url: `${base}/news${item.slug ? `#${item.slug}` : ""}`,
          item: {
            "@type": "NewsArticle",
            headline: item.title,
            description: item.excerpt,
            image: toAbsoluteUrl(item.featuredImage || "/ciedLogo.jpeg"),
            ...(published ? { datePublished: published, dateModified: published } : {}),
            publisher: {
              "@id": `${base}#organization`,
            },
          },
        };
      }),
    },
  };
};

export const buildEventsCollectionJsonLd = (items: NewsItem[]) => {
  const base = getSiteBase();

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${base}/events#collection`,
    url: `${base}/events`,
    name: "CIED Events",
    isPartOf: {
      "@id": `${base}#website`,
    },
    about: {
      "@id": `${base}#organization`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => {
        const startDate = toIsoDate(item.eventDate);
        const detailsUrl = `${base}/events${item.slug ? `#${item.slug}` : ""}`;

        return {
          "@type": "ListItem",
          position: index + 1,
          url: detailsUrl,
          item: {
            "@type": "Event",
            name: item.title,
            description: item.summary,
            ...(startDate ? { startDate } : {}),
            eventStatus: "https://schema.org/EventScheduled",
            organizer: {
              "@id": `${base}#organization`,
            },
            image: [toAbsoluteUrl(item.images[0] || "/ciedLogo.jpeg")],
            ...(item.location
              ? {
                  location: {
                    "@type": "Place",
                    name: item.location,
                  },
                }
              : {}),
            ...(item.registrationUrl
              ? {
                  offers: {
                    "@type": "Offer",
                    url: item.registrationUrl,
                    availability: "https://schema.org/InStock",
                  },
                }
              : {}),
          },
        };
      }),
    },
  };
};
