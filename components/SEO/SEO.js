import Head from 'next/head';
import appConfig from 'app.config';

/**
 * Enhanced SEO component with structured data for better SEO/AEO
 *
 * @param {object} props The props object.
 * @param {string} props.title Page title
 * @param {string} props.description Meta description
 * @param {string} props.imageUrl Open Graph image URL
 * @param {string} props.url Canonical URL
 * @param {string} props.type Content type (website, article, profile)
 * @param {object} props.article Article specific data (publishedTime, modifiedTime, author, tags)
 * @param {boolean} props.noindex Whether to prevent indexing
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({
  title,
  description,
  imageUrl,
  url,
  type = 'website',
  article,
  noindex = false,
}) {
  const siteName = appConfig.siteName || 'Tech & Leadership Blog';
  const siteDescription = appConfig.siteTagline || description;
  const defaultImage = appConfig.seo?.defaultImage || '/static/og-image.jpg';
  const twitterHandle = appConfig.seo?.twitterHandle || '@yourhandle';
  const locale = appConfig.seo?.locale || 'en_US';
  const authorName = appConfig.author?.name || 'Author';

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || siteDescription;
  const ogImage = imageUrl || defaultImage;

  // Generate structured data for SEO/AEO
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    };

    if (type === 'article' && article) {
      return {
        ...baseData,
        '@type': 'Article',
        headline: title,
        description: metaDescription,
        image: ogImage,
        author: {
          '@type': 'Person',
          name: article.author || authorName,
          url: appConfig.socialLinks?.linkedinUrl,
        },
        publisher: {
          '@type': 'Person',
          name: authorName,
          logo: {
            '@type': 'ImageObject',
            url: appConfig.author?.avatar || '/static/avatar.jpg',
          },
        },
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        keywords: article.tags?.join(', '),
      };
    }

    if (type === 'profile') {
      return {
        ...baseData,
        '@type': 'Person',
        name: authorName,
        description: appConfig.author?.bio,
        image: appConfig.author?.avatar,
        jobTitle: appConfig.author?.role,
        url: url,
        sameAs: [
          appConfig.socialLinks?.twitterUrl,
          appConfig.socialLinks?.linkedinUrl,
          appConfig.socialLinks?.githubUrl,
        ].filter(Boolean),
      };
    }

    // Default website structured data
    return {
      ...baseData,
      '@type': 'WebSite',
      name: siteName,
      description: siteDescription,
      url: url,
      author: {
        '@type': 'Person',
        name: authorName,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${url}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="author" content={authorName} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {url && <meta property="og:url" content={url} />}

      {/* Article specific Open Graph */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {url && <meta name="twitter:url" content={url} />}

      {/* Additional SEO/AEO Meta Tags */}
      <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />

      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title={`${siteName} RSS Feed`} href="/feed.xml" />

      {/* Structured Data for Search Engines (AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />
    </Head>
  );
}
