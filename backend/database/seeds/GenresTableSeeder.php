<?php

use Illuminate\Database\Seeder;

class GenresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'punk rock',
            'alternative rock',
            'hard rock',
            'heavy metal',
            'symphonic metal',
            'industrial metal'
        ];

        foreach ($data as $item) {
            DB::table('genres')->insert([
                'name' => $item
            ]);
        }
    }
}
