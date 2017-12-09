<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a list of posts for selected genre.
     *
     * @param $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByGenre($slug)
    {
        $genre = Genre::where('slug', $slug)->get();

        $posts = $genre->posts()->orderBy('id', 'desc')->get(['posts.id', 'title']);

        return response()->json(['data'=> $posts]);
    }
}
