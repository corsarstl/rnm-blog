<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GenreController extends Controller
{
    /**
     * Get all genres with corresponding bands for menu in navbar.
     *
     * @return \Illuminate\Http\JsonResponse
     */
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

        $genres = Genre::with(['bands' => function($query) {
            $query->orderBy('name');
        }])->get();

        return response()->json(['menuItems'=> $genres]);
    }
}
