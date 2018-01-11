export class LatestPostsForHomepage {
  id: number;
  name: string;
  slug: string;
  posts: {
    postId: number;
    postTitle: string;
    postImage: string;
    bandName: string;
    genreName: string;
  } [];
}
