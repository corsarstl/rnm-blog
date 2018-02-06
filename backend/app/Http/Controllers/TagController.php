<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagController extends Controller
{
    /**
     * Get all tags.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tags = Tag::orderBy('id', 'desc')->paginate(10);

        return response()->json(['tags' => $tags], 206);
    }

    /**
     * Get a list of tags for select field in form to create new post.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function tagsForNewPost()
    {
        $tags = Tag::all();

        return response()->json(['tags' => $tags]);
    }

    /**
     * Store a newly created tag.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate(request(), [
            'tagName' => 'required'
        ]);

        $tag = new Tag();
        $tag->name = $request->tagName;
        $tag->save();

        return response()->json(['data' => $tag], 201);
    }

    /**
     * Update the specified tag.
     *
     * @param Request $request
     * @param         $tagId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $tagId)
    {
        $this->validate(request(), [
            'newTagName' => 'required'
        ]);

        $tag = Tag::findOrFail($tagId);
        $tag->name = $request->newTagName;
        $tag->save();

        return response()->json(['data' => $tag]);
    }

    /**
     * Remove the specified tag and post-tag relation.
     *
     * @param $tagId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($tagId)
    {
        $tag = Tag::findOrFail($tagId);
        $tag->delete();

        DB::table('post_tag')
            ->where('tag_id', $tagId)
            ->delete();

        return response()->json(null, 204);
    }
    
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