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
            // Team Heretics (team_id = 1)
            ['name' => 'Boudewijn', 'last_name' => 'van der Lende', 'in_game_name' => 'Boo',         'team_id' => 1, 'logo' => '1745945142png', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Tomas',       'last_name' => 'Rosell',           'in_game_name' => 'RieNs',       'team_id' => 1, 'logo' => '1745945142.png', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Javier',      'last_name' => 'Frómeta',         'in_game_name' => 'MiniBoo',     'team_id' => 1, 'logo' => '1745945142.png', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Simon',       'last_name' => 'Varga',           'in_game_name' => 'Wo0t',        'team_id' => 1, 'logo' => '1745945142.png', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Benjy',       'last_name' => 'Fish',            'in_game_name' => 'benjyfishy',  'team_id' => 1, 'logo' => '1745945142png', 'created_at' => $now, 'updated_at' => $now],

            // FNATIC (team_id = 2)
            ['name' => 'Elliot',      'last_name' => 'vaneryck',        'in_game_name' => 'crashies',    'team_id' => 2, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Jake',        'last_name' => 'Buggy',           'in_game_name' => 'Boaster',     'team_id' => 2, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Aurelien',    'last_name' => 'Deprez',          'in_game_name' => 'Chronicle',   'team_id' => 2, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Joran',       'last_name' => 'de Goede',        'in_game_name' => 'kaajak',      'team_id' => 2, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Gui',         'last_name' => 'Souza',           'in_game_name' => 'Alfajer',     'team_id' => 2, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],

            // Natus Vincere (team_id = 3)
            ['name' => 'Polina',      'last_name' => 'Kudelina',        'in_game_name' => 'ANGE1',      'team_id' => 3, 'logo' => '1745945142.png',      'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Shao',        'last_name' => 'Zhang',           'in_game_name' => 'Shao',       'team_id' => 3, 'logo' => '1745945142.png',      'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Aleksandr',   'last_name' => 'Gailitis',        'in_game_name' => 'koalanoob',  'team_id' => 3, 'logo' => '1745945142.png',      'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Ruxanda',     'last_name' => 'Ignatova',        'in_game_name' => 'Ruxic',      'team_id' => 3, 'logo' => '1745945142.png',      'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Hirosh',      'last_name' => 'Tanaka',          'in_game_name' => 'hiro',       'team_id' => 3, 'logo' => '1745945142.png',      'created_at' => $now, 'updated_at' => $now],

            // Team Vitality (team_id = 4)
            ['name' => 'Israr',       'last_name' => 'Ali',             'in_game_name' => 'Sayf',       'team_id' => 4, 'logo' => '1745945142.png',  'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Michael',     'last_name' => 'Vu',              'in_game_name' => 'Derke',      'team_id' => 4, 'logo' => '1745945142.png',  'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Nicolas',     'last_name' => 'Garnier',         'in_game_name' => 'Less',       'team_id' => 4, 'logo' => '1745945142.png',  'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Kyle',        'last_name' => 'Sarela',          'in_game_name' => 'Kicks',      'team_id' => 4, 'logo' => '1745945142.png',  'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Valeriy',     'last_name' => 'Reznikov',        'in_game_name' => 'CyvOph',     'team_id' => 4, 'logo' => '1745945142.png',  'created_at' => $now, 'updated_at' => $now],

            // Team Liquid (team_id = 5)
            ['name' => 'Patrik',      'last_name' => 'Miklík',          'in_game_name' => 'paTiTek',    'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Jakub',       'last_name' => 'Pacek',           'in_game_name' => 'nAts',       'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Keiko',       'last_name' => 'Kim',             'in_game_name' => 'Keiko',      'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Kamil',       'last_name' => 'Jezierski',       'in_game_name' => 'kamo',       'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Serhii',      'last_name' => 'Kononenko',       'in_game_name' => 'Serial',     'team_id' => 5, 'logo' => '1745945142.png',    'created_at' => $now, 'updated_at' => $now],
        ];

        DB::table('players')->insert($players);
    }
}
