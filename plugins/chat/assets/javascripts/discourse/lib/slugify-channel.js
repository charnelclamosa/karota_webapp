import { slugify } from "discourse/lib/utilities";

export default function slugifyChannel(channel) {
  if (channel.slug) {
    return channel.slug;
  }
<<<<<<< HEAD

  if (!channel.escapedTitle && !channel.title) {
    return "-";
  }

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  const slug = slugify(channel.escapedTitle || channel.title);
  const resolvedSlug = (
    slug.length
      ? slug
      : channel.title.trim().toLowerCase().replace(/\s|_+/g, "-")
  ).slice(0, 100);

  if (!resolvedSlug) {
    return "-";
  }

  return resolvedSlug;
}
