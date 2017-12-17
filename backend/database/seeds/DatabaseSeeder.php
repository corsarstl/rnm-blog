<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\User::class, 100)->create();
        $this->call(GenresTableSeeder::class);
        $this->call(BandsTableSeeder::class);
        factory(App\Models\Post::class, 1000)->create();
        $this->call(TagsTableSeeder::class);
        $this->call(PostTagTableSeeder::class);
        factory(App\Models\Comment::class, 5000)->create();
    }
}
