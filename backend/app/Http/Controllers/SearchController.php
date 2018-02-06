<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    /**
     * Show paginated results for quick search.
     *
     * @param $searchTerm
     * @return \Illuminate\Http\JsonResponse
     */
    public function quickSearch($searchTerm)
    {
        $posts = DB::table('posts as p')
            ->select(
                'p.id as postId',
                'p.title as postTitle',
                'b.name as bandName',
                'g.name as genreName')
            ->join('bands as b', 'b.id', 'p.band_id')
            ->join('genres as g', 'g.id', 'b.genre_id')
            ->where('p.title', 'like', "%$searchTerm%")
            ->orderBy('postId', 'desc')
            ->paginate(10);

        return response()->json(['results' => $posts], 206);
    }
}
