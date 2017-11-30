<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'content',
        'image',
        'band_id'
    ];

    /**
     * Get the genre of the band.
     */
    public function band()
    {
        return $this->belongsTo('App\Models\Band');
    }

    /**
     * Get all the tags for the post.
     */
    public function tags()
    {
        return $this->hasMany('App\Models\Tag');
    }

    /**
     * Get all the comments for the post.
     */
    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }
}
