<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
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
            'commentBody' => 'required|min:2',
            'postId'      => 'required',
            'userId'      => 'required'
        ]);

        $comment = new Comment();
        $comment->create($request);

        $message = 'Your comment has been published';

        return response()->json(['data' => $message]);
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
            'newCommentBody' => 'required|min:2'
        ]);

        $comment = Comment::findOrFail($commentId);
        $comment->body = $request->newCommentBody;
        $comment->save();

        $message = 'Your comment has been updated';

        return response()->json(['data' => $message]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $commentId
     * @return \Illuminate\Http\Response
     */
    public function destroy($commentId)
    {
        //
    }
}