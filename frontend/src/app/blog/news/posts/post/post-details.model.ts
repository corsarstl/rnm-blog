export class PostDetails {
  info: {
    postId: number;
    postTitle: string;
    postContent: string;
    postImage: string;
    bandName: string;
    genreName: string;
  };
  tags: {
    tagId: number;
    tagName: string;
  } [];
}
