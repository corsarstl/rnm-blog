<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
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
        }])->orderBy('name')->get();

        return response()->json(['Genres'=> $genres]);
    }

    /**
     * Get 5 latest posts for each genre.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function latest5PostsPerGenre()
    {
//        optimized, but can't limit number of posts for each genre, only total number of posts.

//        $latest5PostsPerGenre = Genre::with([
//            'posts' => function($query) {
//                $query->orderBy('id', 'desc')->get(['posts.id', 'title']);
//            }])->orderBy('name')->get();


        // performs 8 db queries. need to optimize.
        $genres = Genre::with('posts')->orderBy('name')->get();
        $latest5PostsPerGenre = [];

        foreach ($genres as $genre) {
            $latest5PostsPerGenre[$genre->name] = $genre->posts()->take(5)->orderBy('id', 'desc')->get(['posts.id', 'title']);
        }

        return response()->json(['data'=> $latest5PostsPerGenre]);
    }
}
