<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
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

    /**
     * Display a list of posts for selected genre.
     *
     * @param string $genreSlug
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByGenre(string $genreSlug)
    {
        $posts = Post::showPostsByGenre($genreSlug);

        return response()->json(['posts' => $posts]);
    }

    /**
     * Display a list of posts for selected band.
     *
     * @param string $bandSlug
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByBand(string $bandSlug)
    {
        $posts = Post::showPostsByBand($bandSlug);

        return response()->json(['posts' => $posts]);
    }

    /**
     * Display a list of posts for selected tag.
     *
     * @param int $tagId
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByTag(int $tagId)
    {
        $posts = Post::showPostsByTag($tagId);

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

    /**
     * @param int $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $postId)
    {
        $post = Post::showSingePost($postId);

        return response()->json(['data' => $post]);
    }

    /**
     * Store newly created post.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate(request(), [
            'title'   => 'required|min:20',
            'content' => 'required|min:1000',
            'image'   => 'required',
            'bandId'  => 'required',
            'tags' => 'required'
        ]);

        $post = new Post();
        $post->create($request);

        $awsS3credentials['accessKeyId'] = env('AWS_S3_ACCESS_KEY_ID');
        $awsS3credentials['secretAccessKey'] = env('AWS_S3_SECRET_ACCESS_KEY');

        return response()->json(['credentials' => $awsS3credentials]);
    }
}