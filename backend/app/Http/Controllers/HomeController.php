<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Post;

class HomeController extends Controller
{
    /**
     * Get all genres with corresponding bands for menu in navbar.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function genresBandsForMenu()
    {
        $genres = Genre::showGenresBandsForMenu();

        return response()->json(['data'=> $genres]);
    }

    /**
     * Get 4 latest posts for each genre.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function latestPostsForHome()
    {
        $genres = Genre::all();

        foreach ($genres as $genre) {
            $genre['posts'] = Post::show4LatestPostsForGenre($genre->id);
        }

        return response()->json(['data'=> $genres]);
    }
}
