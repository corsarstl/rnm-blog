<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Post;
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
        $genres = Genre::showGenresBandsForMenu();

        return response()->json(['data'=> $genres]);
    }

    /**
     * Get 5 latest posts for each genre.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function latest5PostsPerGenre()
    {
        $posts = Post::showLatest5PostsPerGenre();

        return response()->json(['data'=> $posts]);
    }
}
