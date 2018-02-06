<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GenreController extends Controller
{
    /**
     * Get all genres with corresponding bands for menu in navbar.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function genresBandsForMenu()
    {
        $genres = Genre::showGenresBandsForMenu();

        return response()->json(['data'=> $genres]);
    }

    /**
     *
     * Get all genres.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $genres = Genre::orderBy('id', 'desc')->get(['id', 'name']);

        return response()->json(['genres' => $genres]);
    }

    /**
     * Store a newly created genre.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate(request(), [
            'genreName' => 'required'
        ]);

        $genre = new Genre();
        $genre->create($request);

        return response()->json(['data' => $genre], 201);
    }

    /**
     * Update the specified genre.
     *
     * @param Request $request
     * @param         $genreId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $genreId)
    {
        $this->validate(request(), [
            'newGenreName' => 'required'
        ]);

        $genre = Genre::findOrFail($genreId);
        $genre->updateGenre($request);

        return response()->json(['data' => $genre]);
    }

    /**
     * Remove the specified genre.
     *
     * @param $genreId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($genreId)
    {
        $genre = Genre::findOrFail($genreId);
        $genre->delete();

        return response()->json(null, 204);
    }
}
