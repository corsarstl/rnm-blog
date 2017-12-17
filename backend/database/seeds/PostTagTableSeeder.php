<?php

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class PostTagTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [];
        $limit = 1000;
        while ($limit) {
            $post = Post::all()->random(1)->first();
            $tag = Tag::all()->random(1)->first();
            $data[$post->id . $tag->id] = [
                'post_id' => $post->id,
                'tag_id' => $tag->id,
            ];
            $limit--;
        }

        foreach ($data as $item) {
            DB::table('post_tag')->insert($item);
        }
    }
}
