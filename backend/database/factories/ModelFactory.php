<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name'           => $faker->name,
        'email'          => $faker->unique()->safeEmail,
        'password'       => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Models\Post::class, function (Faker\Generator $faker) {

    return [
        'title'      => $faker->sentence($nbWords = 5, $variableNbWords = true),
        'content'    => $faker->text($maxNbChars = 1000),
        'image' => function () {
            $imageId = Faker\Factory::create()->numberBetween($min = 1, $max = 20);
            $imageName = $imageId . '.jpg';

            return $imageName;
        },
        'band_id'    => function () {
            return \App\Models\Band::all()->random()->id;
        },
    ];
});