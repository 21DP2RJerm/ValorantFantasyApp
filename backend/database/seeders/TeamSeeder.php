<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = [
            [
                'name' => 'Paper Rex',
                'region' => 'Pacific',
                'logo' => 'paperrex.png',
            ],
            [
                'name' => 'DRX',
                'region' => 'Pacific',
                'logo' => 'drx.png',
            ],

            [
                'name' => 'EDward Gaming',
                'region' => 'China',
                'logo' => 'edg.png',
            ],
            [
                'name' => 'FunPlus Phoenix',
                'region' => 'China',
                'logo' => 'fpx.png',
            ],

            [
                'name' => 'Fnatic',
                'region' => 'EMEA',
                'logo' => 'fnatic.png',
            ],
            [
                'name' => 'Team Liquid',
                'region' => 'EMEA',
                'logo' => 'teamliquid.png',
            ],

            [
                'name' => 'Sentinels',
                'region' => 'Americas',
                'logo' => 'sentinels.png',
            ],
            [
                'name' => 'LOUD',
                'region' => 'Americas',
                'logo' => 'loud.png',
            ],
        ];

        foreach ($teams as $team) {
            $source = database_path('seeders/assets/' . $team['logo']);
            $destination = public_path($team['logo']);

            if (!File::exists($destination)) {
                File::ensureDirectoryExists(dirname($destination));
                File::copy($source, $destination);
            }

            DB::table('teams')->insert([
                'name' => $team['name'],
                'region' => $team['region'],
                'logo' => $team['logo'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
