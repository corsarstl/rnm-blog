<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagController extends Controller
{

    /**
     * Display a list of tags with the number of related posts.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function popularTags()
    {
        $tags = Tag::showPopularTags();

        return response()->json(['data' => $tags]);
    }
}