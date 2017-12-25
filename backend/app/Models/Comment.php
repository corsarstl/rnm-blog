<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}

