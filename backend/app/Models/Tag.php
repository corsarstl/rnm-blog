<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tag extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    public $timestamps = false;

    /**
     * Get all the home for the tag.
     */
    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }

    /**
     * Display a list of tags with the number of related posts.
     *
     * @return mixed
     */
    public static function showPopularTags()
    {
        $tags = DB::table('tags as t')
            ->select(
                't.id as tagId',
                't.name as tagName',
                DB::raw('COUNT(pt.post_id) as postsCount'))
            ->join('post_tag as pt', 't.id', 'pt.tag_id')
            ->groupBy('tagId', 'tagName')
            ->orderBy('postsCount', 'desc')
            ->get();

        return $tags;
    }
}
