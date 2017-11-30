<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Band extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'genre_id'
    ];

    public $timestamps = false;

    /**
     * Get the genre of the band.
     */
    public function genre()
    {
        return $this->belongsTo('App\Models\Genre');
    }

    /**
     * Get all the posts for the band.
     */
    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }
}
