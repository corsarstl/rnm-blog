<?php

use Illuminate\Database\Seeder;

class BandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genresBands = [
            1 => ['Green Day', 'AFI', 'The Offspring', 'Sex Pistols', 'Melvins'],
            2 => ['Radiohead', 'Nirvana', 'Foo Fighters', 'Red Hot Chilli Peppers', 'Pearl Jam'],
            3 => ['Led Zeppelin', 'Black Sabbath', 'Deep Purple', 'Aerosmith', 'Scorpions'],
            4 => ['Metallica', 'Iron Maiden', 'Megadeth', 'Judas Priest', 'Slayer'],
            5 => ['Nightwish', 'Within Temptation', 'Epica', 'Delain', 'Twilight Ophera'],
            6 => ['Rammstein', 'OOMPH!', 'Nine Inch Nails', 'KMFDM', 'Static‐X']
        ];

        foreach ($genresBands as $genre => $bands) {
            foreach ($bands as $key => $band) {
                $slug = strtolower(implode('-',explode(" ", $band)));
                DB::table('bands')->insert([
                    'name'     => $band,
                    'slug'     => $slug,
                    'genre_id' => $genre
                ]);
            }
        }
    }
}
