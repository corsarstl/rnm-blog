<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['name'];

    public $timestamps = false;

    /**
     * Get all the posts for the tag.
     */
    public function posts()
    {
        return $this->belongsToMany('App\Models\Post');
    }
}
