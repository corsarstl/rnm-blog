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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByGenre(Request $request)
    {
        $posts = DB::table('posts as p')
            ->select('p.id as postId',
                     'p.title as postTitle',
                     'b.name as bandName',
                     'g.slug as genreSlug')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->where('g.slug', $request->genreSlug)
            ->orderBy('postId', 'desc')
            ->get();

        return response()->json(['data' => $posts]);
    }

    /**
     * Display a list of posts for selected band.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByBand(Request $request)
    {
        $posts = DB::table('posts as p')
            ->select('p.id as postId',
                     'p.title as postTitle',
                     'b.name as bandName',
                     'g.slug as genreSlug')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->where('b.slug', $request->bandSlug)
            ->orderBy('postId', 'desc')
            ->get();

        return response()->json(['data' => $posts]);
    }

    /**
     * Display a list of posts for selected tag.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByTag(Request $request)
    {
        $posts = DB::table('posts as p')
            ->select('p.id as postId',
                     'p.title as postTitle',
                     'b.name as bandName',
                     'g.slug as genreSlug')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->join('post_tag as pt', 'p.id', 'pt.post_id')
            ->join('tags as t', 't.id', 'pt.tag_id')
            ->where('t.id', $request->tagId)
            ->orderBy('postId', 'desc')
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
        $posts = DB::table('posts as p')
            ->select('p.id as postId',
                     'p.title as postTitle',
                     'p.image as postImage',
                     'b.slug as bandSlug',
                     'g.slug as genreSlug')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->orderBy('postId', 'desc')
            ->take(3)
            ->get();

        return response()->json(['data' => $posts]);
    }

    /**
     * Display a list of 5 popular posts with most number of comments.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function hotPosts()
    {
        $posts = DB::table('posts as p')
            ->select('p.id as postId',
                     'p.title as postTitle',
                     'b.slug as bandSlug',
                     'g.slug as genreSlug',
                     DB::raw('COUNT(c.id) as commentsCount'))
            ->join('comments as c', 'p.id', 'c.post_id')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->groupBy('postId')
            ->orderBy('commentsCount', 'desc')
            ->take(5)
            ->get();

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
//        leave it here just to show that I tried to become friends with Eloquent eager loading,
//        but fetching to much unnecessary info :))

//        $post = Post::with(['band', 'tags', 'comments' => function($q) {
//            $q->orderBy('id', 'desc')
//                ->with('user')
//                ->get();
//        }])
//            ->where('id', $request->postId)
//            ->first();

        $postInfo = DB::table('posts as p')
            ->select('p.id as postId',
                     'p.title as postTitle',
                     'p.content as postContent',
                     'p.image as postImage',
                     'b.name as bandName',
                     'g.name as genreName')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->where('p.id', $request->postId)
            ->groupBy('postId')
            ->get();

        $tags = DB::table('tags as t')
            ->select('t.id as tagId',
                     't.name as tagName')
            ->join('post_tag as pt', 't.id', 'pt.tag_id')
            ->where('pt.post_id', $request->postId)
            ->groupBy('tagId')
            ->get();

        $comments = DB::table('comments as c')
            ->select('c.id as commentId',
                     'c.body as commentBody',
                     'c.created_at as commentCreatedAt',
                     'u.id as userId',
                     'u.name as userName')
            ->join('users as u', 'u.id', 'c.user_id')
            ->where('c.post_id', $request->postId)
            ->groupBy('commentId')
            ->orderBy('commentId', 'desc')
            ->get();

        $post['postInfo'] = $postInfo;
        $post['postTags'] = $tags;
        $post['postComments'] = $comments;

        return response()->json(['data' => $post]);
    }
}