<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $players = [
            ['name' => 'Boudewijn', 'last_name' => 'van der Lende', 'in_game_name' => 'Boo',         'team_id' => 1, 'logo' => '1745945142png', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Tomas',       'last_name' => 'Rosell',           'in_game_name' => 'RieNs',       'team_id' => 1, 'logo' => '1745945142.png', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Javier',      'last_name' => 'Frómeta',         'in_game_name' => 'MiniBoo',     'team_id' => 1, 'logo' => '1745945142.png', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Simon',       'last_name' => 'Varga',           'in_game_name' => 'Wo0t',        'team_id' => 1, 'logo' => '1745945142.png', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Benjy',       'last_name' => 'Fish',            'in_game_name' => 'benjyfishy',  'team_id' => 1, 'logo' => '1745945142png', 'created_at' => $now, 'updated_at' => $now],

            // FNATIC (team_id = 2)
            ['name' => 'Elliot',      'last_name' => 'vaneryck',        'in_game_name' => 'crashies',    'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Jake',        'last_name' => 'Buggy',           'in_game_name' => 'Boaster',     'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Aurelien',    'last_name' => 'Deprez',          'in_game_name' => 'Chronicle',   'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Joran',       'last_name' => 'de Goede',        'in_game_name' => 'kaajak',      'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Gui',         'last_name' => 'Souza',           'in_game_name' => 'Alfajer',     'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],

            ['name' => 'Patrik',      'last_name' => 'Miklík',          'in_game_name' => 'paTiTek',    'team_id' => 6, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Jakub',       'last_name' => 'Pacek',           'in_game_name' => 'nAts',       'team_id' => 6, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Keiko',       'last_name' => 'Kim',             'in_game_name' => 'Keiko',      'team_id' => 6, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Kamil',       'last_name' => 'Jezierski',       'in_game_name' => 'kamo',       'team_id' => 6, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Serhii',      'last_name' => 'Kononenko',       'in_game_name' => 'Serial',     'team_id' => 6, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
        ];

        DB::table('players')->insert($players);
    }
}
