export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  image?: string;
  shayariCount?: number;
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
  usageCount?: number;
}

export interface Author {
  _id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
}

export interface Language {
  _id: string;
  name: string;
  code: string;
  nativeName?: string;
  direction?: "ltr" | "rtl";
}

export interface Shayari {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category?: Category;
  tags?: Tag[];
  author?: Author;
  createdBy?: Pick<User, "_id" | "name" | "avatar">;
  language?: Language;
  featuredImage?: string;
  featured?: boolean;
  trending?: boolean;
  status?: string;
  likes: number;
  views: number;
  shares: number;
  bookmarks: number;
  commentCount?: number;
  readingTime?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt?: string;
  publishedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "editor" | "user";
  isEmailVerified?: boolean;
}

export interface PageMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PageMeta;
}
