<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except('index');
//        $this->middleware('auth:api')->only(['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

        $comment->storeComment($request);

        $message = 'Your comment has been published';

        return response()->json(['data' => $message]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $commentId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $commentId)
    {
        //
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