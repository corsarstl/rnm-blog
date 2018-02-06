<?php

namespace App\Http\Controllers;

use App\Models\Post;

class SearchController extends Controller
{
    /**
     * Show paginated results for quick search.
     *
     * @param string $searchTerm
     * @return \Illuminate\Http\JsonResponse
     */
    public function quickSearch(string $searchTerm)
    {
        $posts = Post::showPostsForQuickSearch($searchTerm);

        return response()->json(['results' => $posts], 206);
    }
}
