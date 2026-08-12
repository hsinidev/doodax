export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // HTML or Markdown content
    author: string;
    date: string; // ISO date string
    category: string;
    tags: string[];
    imageUrl?: string;
    faq?: {
        question: string;
        answer: string;
    }[];
    relatedTools?: string[]; // IDs or fileNames of related tools
}
