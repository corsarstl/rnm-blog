<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagController extends Controller
{
    public function tagsByPostsCount()
    {
        $tags = DB::table('tags as t')
            ->select(
                't.name as tagName',
                DB::raw('COUNT(pt.post_id) as postsCount'))
            ->join('post_tag as pt', 't.id', 'pt.tag_id')
            ->groupBy('tagName')
            ->orderBy('postsCount', 'desc')
            ->take(15)
            ->get();

        return response()->json(['data' => $tags]);
    }
}