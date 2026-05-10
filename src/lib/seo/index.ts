// src/lib/seo/index.ts
export { SEO_CONFIG, absoluteUrl, getSameAs } from './config';
export { buildPageMetadata } from './metadata';
export {
  organizationJsonLd,
  websiteJsonLd,
  bookJsonLd,
  personJsonLd,
  courseJsonLd,
  breadcrumbJsonLd,
} from './jsonld';
