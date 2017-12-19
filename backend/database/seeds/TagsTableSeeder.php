<?php

use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            'Blue Horizon',
            'Incus Records',
            'Silvertone Records',
            'Standby Records',
            'Loose Music',
            'Clay Records',
            'LO-MAX Records',
            'Deltasonic',
            'Dance to the Radio',
            'Tru Thoughts',
            'No Masters',
            'Perfecto Records',
            'Willkommen Records',
            'Full Time Hobby',
            'Radiant Future Records',
            'Glass Records',
            'Trash Aesthetics',
            'Native Records',
            'TNSrecords',
            'Bassguitar',
            'Instrumental music',
            'Musicians',
            'Brooklyn',
            'Artist',
            'Singer Life',
            'Vocals',
            'Guitar',
            'Guitar Solo',
            'New Artist',
            'Live Music',
            'Music Industry',
            'Entertainment',
            'Music Producer',
            'Percusion',
            'Amplifier',
            'Drums',
            'Song Lyrics',
            'New Album',
            'Music Festival'
        ];

        foreach ($tags as $tag) {
            DB::table('tags')->insert([
                'name' => $tag
            ]);
        }
    }
}
