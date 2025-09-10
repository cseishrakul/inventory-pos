<?php

namespace App\Manager;

use App\Models\Area;
use App\Models\District;
use App\Models\Division;
use Illuminate\Support\Facades\Http;

class ScriptManager
{
    public function getLocationData()
    {
        $url = "https://member.daraz.com.bd/locationtree/api/getSubAddressList?countryCode=BD&page=addressEdit";
        $response = Http::withOptions(['verify' => false])->get($url);
        $divisions = $response->json();

        if (!isset($divisions['module']) || !is_array($divisions['module'])) {
            dd('Divisions API did not return expected data', $divisions);
        }

        foreach ($divisions['module'] as $key => $division) {
            if ($key == 0) {
                $division_data = [
                    'name' => $division['name'] ?? null,
                    'original_id' => $division['id'] ?? null,
                ];

                $created_div = Division::create($division_data);

                $district_url = 'https://member.daraz.com.bd/locationtree/api/getSubAddressList?countryCode=BD&addressId=' . ($division['id'] ?? '') . '&page=addressEdit';
                $dist_response = Http::withOptions(['verify' => false])->get($district_url);
                $districts = $dist_response->json();

                if (!isset($districts['module']) || !is_array($districts['module'])) {
                    continue; // skip if no districts returned
                }

                foreach ($districts['module'] as $district) {
                    $district_data = [
                        'division_id' => $created_div->id,
                        'name' => $district['name'] ?? null,
                        'original_id' => $district['id'] ?? null,
                    ];

                    $created_dist = District::create($district_data);

                    $area_url = 'https://member.daraz.com.bd/locationtree/api/getSubAddressList?countryCode=BD&addressId=' . ($district['id'] ?? '') . '&page=addressEdit';
                    $area_response = Http::withOptions(['verify' => false])->get($area_url);
                    $areas = $area_response->json();

                    if (!isset($areas['module']) || !is_array($areas['module'])) {
                        continue; // skip if no areas returned
                    }

                    foreach ($areas['module'] as $area) {
                        $area_data = [
                            'district_id' => $created_dist->id,
                            'name' => $area['name'] ?? null,
                            'original_id' => $area['id'] ?? null,
                        ];
                        Area::create($area_data);
                    }
                }
            }
        }

        echo "0 Location data imported successfully!";
    }
}
