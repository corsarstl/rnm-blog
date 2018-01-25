<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Band extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
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
     * Get all the home for the band.
     */
    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }

    public function create($request)
    {
        $this->name = $request->bandName;
        $bandNameLowerCase = strtolower($request->bandName);
        $this->slug = implode("-", explode(" ", $bandNameLowerCase));
        $this->genre_id = $request->genreId;

        $this->save();
    }

    /**
     * Update the specified band.
     *
     * @param $request
     */
    public function updateBand($request)
    {
        $this->name = $request->newBandName;
        $bandNameLowerCase = strtolower($request->newBandName);
        $this->slug = implode("-", explode(" ", $bandNameLowerCase));
        $this->genre_id = $request->genreId;

        $this->save();
    }

    /**
     * Get a list of paginated bands with their genres.
     *
     * @return mixed
     */
    public static function getBands()
    {
        $bands = DB::table('bands as b')
            ->select(
                'b.id as bandId',
                'b.name as bandName',
                'g.id as genreId',
                'g.name as genreName')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->orderBy('bandId', 'desc')
            ->paginate(10);

        return $bands;
    }

    /**
     * Get a list of bands for select field in form to create new post.
     *
     * @return mixed
     */
    public static function getBandsForNewPost()
    {
        $bands = DB::table('bands as b')
            ->select(
                'b.id as bandId',
                'b.name as bandName',
                'g.id as genreId',
                'g.name as genreName')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->orderBy('bandId', 'desc')
            ->get();

        return $bands;
    }
}
