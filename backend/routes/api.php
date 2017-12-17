<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'ApiController@register');
Route::post('login', 'ApiController@login');
Route::post('logout', 'ApiController@logout');

Route::get('navbarMenu', 'HomeController@genresBandsForMenu');
Route::get('home', 'HomeController@latest5PostsPerGenre');

Route::get('genres/{genreSlug}', 'PostController@indexByGenre');
Route::get('{genreSlug}/{bandSlug}', 'PostController@indexByBand');
Route::get('{genreSlug}/{bandSlug}/{postId}/{postSlug}', 'PostController@show');
Route::get('slider', 'PostController@indexForSlider');




