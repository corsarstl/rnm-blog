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
        $this->call(GenresTableSeeder::class);
        $this->call(BandsTableSeeder::class);
        factory(App\Models\Post::class, 400)->create();
        $this->call(TagsTableSeeder::class);
    }
}
