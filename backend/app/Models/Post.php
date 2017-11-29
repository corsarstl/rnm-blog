<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'band_id'];

    /**
     * Get the genre of the band.
     */
    public function band()
    {
        return $this->belongsTo('App\Models\Band');
    }
}
