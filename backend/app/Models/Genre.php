<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $fillable = ['name'];

    public $timestamps = false;

    /**
     * Get the bands for the genre.
     */
    public function bands()
    {
        return $this->hasMany('App\Models\Band');
    }
}
