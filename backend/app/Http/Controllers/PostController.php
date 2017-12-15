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
        $posts = Genre::with([
            'posts' => function ($query) {
                $query->with('band')
                    ->orderBy('id', 'desc')
                    ->get();
            }])
            ->where('slug', $genreSlug)
            ->get();

        return response()->json(['data' => $posts]);
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
        $posts = Band::with([
            'posts' => function ($query) {
                $query->orderBy('id', 'desc')
                      ->get();
            }])
            ->where('slug', $bandSlug)
            ->get();

        return response()->json(['data' => $posts]);
    }
}
