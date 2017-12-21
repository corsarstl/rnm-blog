<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'slug'
    ];

    public $timestamps = false;

    /**
     * Get the bands for the genre.
     */
    public function bands()
    {
        return $this->hasMany('App\Models\Band');
    }

    /**
     * Get all the posts for the genre.
     */
    public function posts()
    {
        return $this->hasManyThrough('App\Models\Post', 'App\Models\Band');
    }

    /**
     * Get all genres with corresponding bands for menu in navbar.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public static function showGenresBandsForMenu()
    {
        $genres = Genre::with(['bands' => function($q) {
            $q->orderBy('name')->get();
        }])->orderBy('name')->get();

        return $genres;
    }
}
