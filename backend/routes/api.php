<?php

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

// Registration, authorisation routes
Route::post('register', 'ApiController@register');
Route::post('login', 'ApiController@login');
Route::post('logout', 'ApiController@logout');

Route::get('navbarMenu', 'GenreController@genresBandsForMenu');

//Search routes
Route::get('quickSearch/{searchTerm}', 'SearchController@quickSearch');

// Comments routes
Route::get('comments/{postId}', 'CommentController@index');
Route::post('comments', 'CommentController@store');
Route::put('comments/{commentId}', 'CommentController@update');
Route::delete('comments/{commentId}', 'CommentController@destroy');

// Posts routes
Route::group(
    ['prefix' => 'posts'],
    function ()
{
    Route::get('byGenre/{genreSlug}', 'PostController@indexByGenre');
    Route::get('byBand/{bandSlug}', 'PostController@indexByBand');
    Route::get('byTag/{tagId}', 'PostController@indexByTag');
    Route::get('slider', 'PostController@indexForSlider');
    Route::get('hotPosts', 'PostController@hotPosts');
    Route::get('home', 'PostController@latestPostsForHome');
    Route::get('show/{postId}', 'PostController@show');
});

// Tags routes
Route::get('popularTags', 'TagController@popularTags');


// ****** ADMIN ROUTES *****

Route::post('admin/login', 'ApiController@adminLogin');

Route::group(
    [
        'prefix' => 'admin',
        'middleware' => 'admin'
    ], function()
{
    // Genres
    Route::get('genres', 'GenreController@index');
    Route::post('genres', 'GenreController@store');
    Route::put('genres/{genreId}', 'GenreController@update');
    Route::delete('genres/{genreId}', 'GenreController@destroy');

    // Bands
    Route::get('bands', 'BandController@index');
    Route::post('bands', 'BandController@store');
    Route::put('bands/{bandId}', 'BandController@update');
    Route::delete('bands/{bandId}', 'BandController@destroy');

    // Tags
    Route::get('tags', 'TagController@index');
    Route::post('tags', 'TagController@store');
    Route::put('tags/{tagId}', 'TagController@update');
    Route::delete('tags/{tagId}', 'TagController@destroy');

    // Posts
    Route::get('posts/bandsForNewPost', 'BandController@bandsForNewPost');
    Route::get('posts/tagsForNewPost', 'TagController@tagsForNewPost');
    Route::post('posts', 'PostController@store');
});