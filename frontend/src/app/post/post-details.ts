export class PostDetails {
  id: number;
  title: string;
  content: string;
  image: string;
  band: {
    name: string;
  };
  tags: {
    name: string;
  }[];
  // tags: string[];
  comments: {
    id: number;
    body: string;
    created_at: string;
    user: {
      name: string;
    }
  }[];
}
