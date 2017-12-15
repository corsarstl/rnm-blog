<?php

namespace App\Http\Controllers;

use App\Models\Band;
use App\Models\Genre;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a list of posts for selected genre.
     *
     * @param $genreSlug
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByGenre($genreSlug)
    {
        $genre = Genre::where('slug', $genreSlug)->first();
        $posts = $genre->posts()->orderBy('id', 'desc')->get(['posts.id', 'title']);

        return response()->json(['data'=> $posts]);
    }

    /**
     * Display a list of posts for selected band.
     *
     * @param $genreSlug
     * @param $bandSlug
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByBand($genreSlug, $bandSlug)
    {
        $band = Band::where('slug', $bandSlug)->first();
        $posts = $band->posts()->orderBy('id', 'desc')->get(['posts.id', 'title']);

        return response()->json(['data'=> $posts]);
    }


}
