<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'content',
        'image',
        'band_id'
    ];

    /**
     * Get the genre of the band.
     */
    public function band()
    {
        return $this->belongsTo('App\Models\Band');
    }

    /**
     * Get all the tags for the post.
     */
    public function tags()
    {
        return $this->belongsToMany('App\Models\Tag');
    }

    /**
     * Get all the comments for the post.
     */
    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }

    public function genre()
    {
        return $this->band()->genre();
    }

    /**
     * Display a list of posts for selected genre.
     *
     * @param $genreSlug
     * @return mixed
     */
    public static function showPostsByGenre($genreSlug)
    {
        $posts = DB::table('posts as p')
            ->select(
                'p.id as postId',
                'p.title as postTitle',
                'p.content as postContent',
                'p.image as postImage',
                'b.name as bandName',
                'g.slug as genreSlug')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->where('g.slug', $genreSlug)
            ->orderBy('postId', 'desc')
            ->paginate(10);

        foreach ($posts as $post) {
            $post->postContent = self::createPostContentPreview($post->postContent);
        }

        return $posts;
    }

    /**
     * Display a list of posts for selected band.
     *
     * @param $bandSlug
     * @return mixed
     */
    public static function showPostsByBand($bandSlug)
    {
        $posts = DB::table('posts as p')
            ->select(
                'p.id as postId',
                'p.title as postTitle',
                'p.content as postContent',
                'p.image as postImage',
                'b.name as bandName',
                'g.slug as genreSlug')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->where('b.slug', $bandSlug)
            ->orderBy('postId', 'desc')
            ->paginate(10);

        foreach ($posts as $post) {
            $post->postContent = self::createPostContentPreview($post->postContent);
        }

        return $posts;
    }

    /**
     * Display a list of posts for selected tag.
     *
     * @param $tagId
     * @return mixed
     */
    public static function showPostsByTag($tagId)
    {
        $posts = DB::table('posts as p')
            ->select(
                'p.id as postId',
                'p.title as postTitle',
                'p.content as postContent',
                'p.image as postImage',
                'b.name as bandName',
                'g.slug as genreSlug')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->join('post_tag as pt', 'p.id', 'pt.post_id')
            ->join('tags as t', 't.id', 'pt.tag_id')
            ->where('t.id', $tagId)
            ->orderBy('postId', 'desc')
            ->paginate(10);

        foreach ($posts as $post) {
            $post->postContent = self::createPostContentPreview($post->postContent);
        }

        return $posts;
    }

    /**
     * Display a list of 3 latest posts for slider.
     *
     * @return mixed
     */
    public static function showPostsForSlider()
    {
        $posts = DB::table('posts as p')
            ->select(
                'p.id as postId',
                'p.title as postTitle',
                'p.image as postImage',
                'b.slug as bandSlug',
                'g.slug as genreSlug')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->orderBy('postId', 'desc')
            ->take(3)
            ->get();

        return $posts;
    }

    /**
     * Display a list of 5 popular posts with most number of comments.
     *
     * @return mixed
     */
    public static function showHotPosts()
    {
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

        return $posts;
    }

//    public static function showLatest5PostsPerGenre()
//    {
//        $posts = Genre::with([
//            'posts' => function($query) {
//                $query->with('band')
//                    ->take(30)
//                    ->orderBy('id', 'desc')
//                    ->get();
//            }])
//            ->orderBy('name')
//            ->get();
//
//        return $posts;
//    }

    /**
     * Get 4 latest posts per genre for homepage.
     *
     * @param $genreId
     * @return mixed
     */
    public static function show4LatestPostsForGenre($genreId)
    {
        $posts = DB::table('posts as p')
            ->select(
                'p.id as postId',
                'p.title as postTitle',
                'p.image as postImage',
                'b.name as bandName',
                'g.id as genreId',
                'g.name as genreName')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->where('g.id', $genreId)
            ->orderBy('postId', 'desc')
            ->take(4)
            ->get();

        return $posts;
    }

    /**
     * Show the post with request id.
     *
     * @param $postId
     * @return mixed
     */
    public static function showSingePost($postId)
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
            ->select(
                'p.id as postId',
                'p.title as postTitle',
                'p.content as postContent',
                'p.image as postImage',
                'b.name as bandName',
                'g.name as genreName')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->where('p.id', $postId)
            ->get();

        $tags = DB::table('tags as t')
            ->select(
                't.id as tagId',
                't.name as tagName')
            ->join('post_tag as pt', 't.id', 'pt.tag_id')
            ->where('pt.post_id', $postId)
            ->get();

        $post['info'] = $postInfo[0];
        $post['tags'] = $tags;

        return $post;
    }

    /**
     * Store newly created post.
     *
     * @param array $request
     * @return void.
     */
    public function create($request)
    {
        $this->title = $request->title;
        $this->content = $request->content;
        $this->image = $request->image;
        $this->band_id = $request->bandId;

        $this->save();

        $this->tags()->sync($request->tags);
    }

    /**
     * Shortens full post content to show in posts lists for genres, bands and tags.
     *
     * @param string $content
     * @return string
     */
    private static function createPostContentPreview(string $content)
    {
        $contentArray = str_split($content);
        $contentPreviewArray = [];

        for ($i = 0; $i < 320; $i++) {
            $contentPreviewArray[] = $contentArray[$i];
        }

        $contentPreviewString = implode('', $contentPreviewArray);

        return $contentPreviewString;
    }
}
