<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'image', 'band_id'];

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
}
