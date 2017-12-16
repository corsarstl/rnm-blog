<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    public $timestamps = false;

    /**
     * Get all the home for the tag.
     */
    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }
}
