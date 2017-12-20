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
  comments: {
    commentId: number;
    commentBody: string;
    commentCreatedAt: string;
    userId: number;
    userName: string;
  } [];
}
