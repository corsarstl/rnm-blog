<?php

namespace App\Http\Controllers;

use App\Models\Band;
use App\Models\Comment;
use App\Models\Genre;
use App\Models\Post;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

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

    /**
     * Show the post with request id.
     *
     * @param $genreSlug
     * @param $bandSlug
     * @param $id
     * @param $titleSlug
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($genreSlug, $bandSlug, $id, $titleSlug)
    {
        $post = Post::with(['band', 'comments' => function($q) {
            $q->orderBy('id', 'desc')
                ->with('user')
                ->get();
        }])
            ->where('id', $id)
            ->first();

//        $postToShow = [];
//        $postToShow['id'] = $post->id;
//        $postToShow['title'] = $post->title;
//        $postToShow['content'] = $post->content;
//        $postToShow['image'] = Post::POST_IMAGE_URL. $post->image;
        $post['image'] = Post::POST_IMAGE_URL. $post->image;

//        $postToShow['genre'] = $post->band->genre->name;
//        $postToShow['band'] = $post->band->name;
//        $postToShow['tags'] = $post->tags;
//        $postToShow['comments'] = $post->comments;

        return response()->json(['data' => $post]);
//        return response()->json(['data' => $postToShow]);
    }
}
