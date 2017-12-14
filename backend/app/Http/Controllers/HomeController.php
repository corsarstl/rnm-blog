<?php

namespace App\Http\Controllers;

use App\Models\Genre;
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
//        $genresBands = DB::table('genres as g')
//            ->select(
//                'g.id as GenreId',
//                'g.name as GenreName',
//                'b.name as Band')
//            ->leftJoin('bands as b', 'g.id', 'b.genre_id')
//            ->groupBy('GenreId', 'Genre', 'Band')
//            ->orderBy('Genre')
//            ->get();

        $genres = Genre::with(['bands' => function($query) {
            $query->orderBy('name');
        }])->orderBy('name')->get();

        return response()->json(['menuItems'=> $genres]);
    }

    /**
     * Get 5 latest posts for each genre.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function latest5PostsPerGenre()
    {
//        optimized, but can't limit number of posts for each genre, only total number of posts.
//        and can't get band name

//        $latest5PostsPerGenre = Genre::with([
//            'posts' => function($query) {
//                $query->take(5)->orderBy('id', 'desc')->get(['posts.id', 'title']);
//            }])->orderBy('name')->get();

//        $latest5PostsPerGenre = Genre::with('latest5Posts')->orderBy('name')->get();


//        $genres = Genre::with('posts')->orderBy('name')->get();
//        $latest5PostsPerGenre = [];
//
//        foreach ($genres as $genre) {
//            $genrePosts['posts'] = [];
//            $posts = $genre->posts()->orderBy('id', 'desc')->take(5)->get();
//
//            foreach ($posts as $post) {
//                $singePost = [];
//
//                $singePost['id'] = $post->id;
//                $singePost['title'] = $post->title;
//                $singePost['bandName'] = $post->band->name;
//
//                array_push($genrePosts['posts'], $singePost);
//            }
//
//            array_push($latest5PostsPerGenre[$genre->name], $genrePosts);
//
//        }

        $latest5PostsPerGenre = Genre::with([
            'posts' => function($query) {
                $query->with('band')
                    ->take(30)
                    ->orderBy('id', 'desc')
                    ->get();
            }])
            ->orderBy('name')
            ->get();

//        $latest5PostsPerGenre = Genre::latest5Posts()-get();



        // performs 8 db queries. need to optimize.
//        $genres = Genre::with('posts')->orderBy('name')->get();
//        $latest5PostsPerGenre = [];
//
//        foreach ($genres as $genre) {
//            $latest5PostsPerGenre['genreName'] = $genre->name;
//            $posts = $genre->posts()->take(5)->orderBy('id', 'desc');
//
//            foreach ($posts as $post) {
//                $post['id'] = $post->id;
//                $post['title'] = $post->title;
//                $post['band'] = $post->band;
//
//                array_push($latest5PostsPerGenre['genreName']['posts'], $post);
//            }
//        }

//        $genres = Genre::with(['posts'])->orderBy('name')->get();
//
//        foreach ($genres as $genre) {
//            return [
//                'genreName' => $genre->name,
//                'posts'     => $genre->posts()->orderBy('id', 'desc')->take(5)->get()
//            ];
//        }
//            $post[$genre->name] = $genre->posts()
//                ->take(5)
//                ->orderBy('id', 'desc')
//                ->get();


            return response()->json(['data'=> $latest5PostsPerGenre]);
    }
}
