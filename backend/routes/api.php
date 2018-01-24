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

// Registration, authorisation routes
Route::post('register', 'ApiController@register');
Route::post('login', 'ApiController@login');
Route::post('logout', 'ApiController@logout');

Route::get('navbarMenu', 'HomeController@genresBandsForMenu');
Route::get('home', 'HomeController@latestPostsForHome');

//Search routes
Route::get('quickSearch/{searchTerm}', 'SearchController@quickSearch');

// Comments routes
Route::get('comments/{postId}', 'CommentController@index');
Route::post('comments', 'CommentController@store');
Route::put('comments/{commentId}', 'CommentController@update');
Route::delete('comments/{commentId}', 'CommentController@destroy');

// Posts routes
Route::get('genres/{genreSlug}', 'PostController@indexByGenre');
Route::get('tags/{tagId}/{tagSlug}', 'PostController@indexByTag');
Route::get('posts/{genreSlug}/{bandSlug}', 'PostController@indexByBand');
Route::get('posts/{genreSlug}/{bandSlug}/{postId}/{postSlug}', 'PostController@show');
Route::get('slider', 'PostController@indexForSlider');
Route::get('hotPosts', 'PostController@hotPosts');

// Tags routes
Route::get('popularTags', 'TagController@popularTags');


// ****** ADMIN ROUTES *****

Route::post('admin/login', 'ApiController@adminLogin');

// Genres
Route::get('admin/genres', 'GenreController@index');
Route::post('admin/genres', 'GenreController@store');
Route::put('admin/genres/{genreId}', 'GenreController@update');
Route::delete('admin/genres/{genreId}', 'GenreController@destroy');

// Bands
Route::get('admin/bands', 'BandController@index');
Route::post('admin/bands', 'BandController@store');
Route::put('admin/bands/{bandId}', 'BandController@update');
Route::delete('admin/bands/{bandId}', 'BandController@destroy');

// Tags
Route::get('admin/tags', 'TagController@index');
Route::post('admin/tags', 'TagController@store');
Route::put('admin/tags/{tagId}', 'TagController@update');
Route::delete('admin/tags/{tagId}', 'TagController@destroy');

// Posts
Route::post('admin/posts', 'PostController@store');