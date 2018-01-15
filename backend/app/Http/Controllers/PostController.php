<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    /**
     * Display a list of posts for selected genre.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByGenre(Request $request)
    {
        $posts = Post::showPostsByGenre($request->genreSlug);

        return response()->json(['posts' => $posts]);
    }

    /**
     * Display a list of posts for selected band.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByBand(Request $request)
    {
        $posts = Post::showPostsByBand($request->bandSlug);

        return response()->json(['posts' => $posts]);
    }

    /**
     * Display a list of posts for selected tag.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByTag(Request $request)
    {
        $posts = Post::showPostsByTag($request->tagId);

        return response()->json(['posts' => $posts]);
    }

    /**
     * Display a list of 3 latest posts for slider.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexForSlider()
    {
        $posts = Post::showPostsForSlider();

        return response()->json(['data' => $posts]);
    }

    /**
     * Display a list of 5 popular posts with most number of comments.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function hotPosts()
    {
        $posts = Post::showHotPosts();

        return response()->json(['data' => $posts]);
    }

    /**
     * Show the post with request id.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $post = Post::showSingePost($request->postId);

        return response()->json(['data' => $post]);
    }
}