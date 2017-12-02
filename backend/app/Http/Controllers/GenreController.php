<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GenreController extends Controller
{

    public function genresBandsForMenu()
    {
//        $genresBands = DB::table('genres as g')
//            ->select(
//                'g.id as GenreId',
//                'g.name as GenreName',
//                'b.name as Band')
//            ->leftJoin('bands as b', 'g.id', 'b.genre_id')
//            ->groupBy('GenreId', 'Genre', 'Band')
//            ->orderBy('Genre')
//            ->get();


        $genres = Genre::all();

        $genresBands = [];

        foreach ($genres as $genre) {
            $genreName = $genre->name;
            $bands = $genre->bands->pluck('name');

            array_push($genresBands, $genreName, $bands);
        }

        return response()->json($genresBands);
    }
}
