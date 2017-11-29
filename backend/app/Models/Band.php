<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Band extends Model
{
    protected $fillable = ['name', 'genre_id'];

    public $timestamps = false;

    /**
     * Get the genre of the band.
     */
    public function genre()
    {
        return $this->belongsTo('App\Models\Genre');
    }
}
