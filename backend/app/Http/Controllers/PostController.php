<?php

namespace App\Http\Controllers;

use App\Models\Band;
use App\Models\Comment;
use App\Models\Genre;
use App\Models\Post;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\DB;

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
     * Display a list of 3 latest posts for slider.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexForSlider()
    {
        $posts = Post::with(['band.genre'])
            ->orderBy('id', 'desc')
            ->take(3)
            ->get();

        foreach ($posts as $post) {
            $post['image'] = Post::POST_IMAGE_URL. $post->image;
        }

        return response()->json(['data' => $posts]);
    }

    /**
     * Display a list of 5 popular posts with most number of comments.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function popularPosts()
    {
//        $posts = Post::withCount('comments')
//            ->orderBy('comments_count', 'desc')
//            ->take(5)
//            ->get(['id', 'title', 'comments_count']);

//        $posts = Post::withCount(['band', 'comments'])
//            ->orderBy('comments_count', 'desc')
//            ->take(5)
//            ->get('title');

        $posts = DB::table('posts as p')
            ->select(
                'p.id as postId',
                'p.title as postTitle',
                'b.slug as bandSlug',
                'g.slug as genreSlug',
                DB::raw('COUNT(c.id) as commentsCount'))
            ->join('comments as c', 'p.id', 'c.post_id')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->groupBy('postId', 'postTitle', 'bandSlug', 'genreSlug')
            ->orderBy('commentsCount', 'desc')
            ->take(5)
            ->get();

        return response()->json(['data' => $posts]);
    }

    /**
     * Show the post with request id.
     *
     * @param $genreSlug
     * @param $bandSlug
     * @param $postId
     * @param $postSlug
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($genreSlug, $bandSlug, $postId, $postSlug)
    {
        $post = Post::with(['band', 'tags', 'comments' => function($q) {
            $q->orderBy('id', 'desc')
                ->with('user')
                ->get();
        }])
            ->where('id', $postId)
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
