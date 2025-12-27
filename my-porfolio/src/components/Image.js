const DEFAULT_EXTENSIONS = ["png", "svg", "jpg", "jpeg", "webp"];

export default function Image({
  src,               // "/images/image-0" or "/images/image-0.png"
  alt,
  className,
  extensions = DEFAULT_EXTENSIONS,
}) {
  const publicUrl = process.env.PUBLIC_URL || "";

  const match = src.match(/^(.*?)(?:\.(\w+))?$/);
  const base = match[1];
  const initialExt = match[2];

  const orderedExtensions = initialExt
    ? [initialExt, ...extensions.filter(e => e !== initialExt)]
    : extensions;

  return (
    <img
      className={className}
      alt={alt}
      src={`${publicUrl}${base}.${orderedExtensions[0]}`}
      onError={(e) => {
        const img = e.currentTarget;

        const tried = img.dataset.tried
          ? img.dataset.tried.split(",")
          : [];

        const nextExt = orderedExtensions.find(
          ext => !tried.includes(ext)
        );

        if (!nextExt) return;

        img.dataset.tried = [...tried, nextExt].join(",");
        img.src = `${publicUrl}${base}.${nextExt}`;
      }}
    />
  );
}
