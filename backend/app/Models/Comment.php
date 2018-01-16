<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'body',
        'post_id',
        'user_id'
    ];

    /**
     * Get the user of the comment.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Get the post for the comment.
     */
    public function post()
    {
        return $this->belongsTo('App\Models\Post');
    }

    /**
     * Store a newly created comment.
     *
     * @param $request
     * @return void
     */
    public function create($request)
    {
        $this->body = $request->commentBody;
        $this->post_id = $request->postId;
        $this->user_id = $request->userId;

        $this->save();
    }

    /**
     * Show all comments for selected post.
     *
     * @param $postId
     * @return mixed
     */
    public static function getComments($postId)
    {
        $comments = DB::table('comments as c')
            ->select(
                'c.id as commentId',
                'c.body as commentBody',
                'c.created_at as commentCreatedAt',
                'u.id as userId',
                'u.name as userName')
            ->join('users as u', 'u.id', 'c.user_id')
            ->where('c.post_id', $postId)
            ->orderBy('commentId', 'desc')
            ->paginate(5);

        return $comments;
    }
}

