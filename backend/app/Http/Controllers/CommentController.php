<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except('index');
    }

    /**
     * Show all comments for selected post.
     *
     * @param int $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(int $postId)
    {
        $comments = Comment::getComments($postId);

        return response()->json(['comments' => $comments], 206);
    }
    
    /**
     * Store a newly created comment.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate(request(), [
            'commentBody' => 'required|min:1',
            'postId'      => 'required',
            'userId'      => 'required'
        ]);

        $comment = new Comment();
        $comment->create($request);

        return response()->json(['data' => $comment], 201);
    }

    /**
     * Update the specified comment.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $commentId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $commentId)
    {
        $this->validate(request(), [
            'newCommentBody' => 'required|min:1'
        ]);

        $comment = Comment::findOrFail($commentId);
        $comment->body = $request->newCommentBody;
        $comment->save();

        return response()->json(['data' => $comment]);
    }

    /**
     * Remove the specified comment.
     *
     * @param  int $commentId
     * @return \Illuminate\Http\Response
     */
    public function destroy($commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $comment->delete();

        return response()->json(null, 204);
    }
}