export type Post = {
  label: string;
  title: string;
  describe: string;
  href: string;
  create: string;
  update: string;
  image?: string;
  category?: string;
  slug: string[];
  readTime?: string;
  color?: string;
};

export type PostCollection = {
  [key: string]: Post[] | PostCollection;
};

export type ArticlePost = PostCollection;
