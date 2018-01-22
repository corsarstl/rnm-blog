<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GenreController extends Controller
{
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

        $message = 'A new genre has been created.';

        return response()->json(['data' => $message]);
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

        $message = 'The genre has been updated.';

        return response()->json(['data' => $message]);
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

        $message = 'The genre has been deleted.';

        return response()->json(['data' => $message]);
    }
}
