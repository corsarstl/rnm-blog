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
        $tags = Tag::orderBy('id', 'desc')->get();

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

        $message = 'A new tag has been created.';

        return response()->json(['data' => $message]);
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

        $message = 'The tag has been updated.';

        return response()->json(['data' => $message]);
    }

    /**
     * Remove the specified tag.
     *
     * @param $tagId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($tagId)
    {
        $tag = Tag::findOrFail($tagId);
        $tag->delete();

        $message = 'The tag has been deleted.';

        return response()->json(['data' => $message]);
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