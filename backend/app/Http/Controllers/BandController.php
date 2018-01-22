<?php

namespace App\Http\Controllers;

use App\Models\Band;
use Illuminate\Http\Request;

class BandController extends Controller
{
    /**
     * Get a list of bands with their genres.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $bands = Band::getBands();

        return response()->json(['bands' => $bands]);
    }

    /**
     * Store a newly created band.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate(request(), [
            'bandName' => 'required',
            'genreId' => 'required'
        ]);

        $band = new Band();
        $band->create($request);

        $message = 'A new band has been created.';

        return response()->json(['data' => $message]);
    }

    /**
     * Update the specified band.
     *
     * @param Request $request
     * @param         $bandId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $bandId)
    {
        $this->validate(request(), [
            'newBandName' => 'required',
            'genreId' => 'required'
        ]);

        $band = Band::findOrFail($bandId);
        $band->updateBand($request);

        $message = 'The band has been updated.';

        return response()->json(['data' => $message]);
    }

    /**
     * Remove the specified band.
     *
     * @param $bandId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($bandId)
    {
        $band = Band::findOrFail($bandId);
        $band->delete();

        $message = 'The band has been deleted.';

        return response()->json(['data' => $message]);
    }
}
