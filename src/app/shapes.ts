export class BlogPost {
  title: string;
  content: string;
  dateTime: number;
  description?: string;
  id: string;
  comments: Comment[];
  tags: string[];
  slug: string;
}

export class Comment {
  text: string;
  dateTime: number;
  author: string;
}
