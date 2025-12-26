import { Helmet } from "react-helmet-async";

export default function SEO({
    title,
    description,
    canonical,
    image,
}) {
    return (
        <Helmet>
            <title>{title}</title>

            <meta name="description" content={description} />

            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {image && <meta property="og:image" content={image} />}
            {canonical && <meta property="og:url" content={canonical} />}
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
}
