<?php
namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
class AdminSeeder extends Seeder
{
    /**Creation d'un compte administrateur par défaut pour l'application.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'alain.enspd@gmail.com'],
            [
                'prenom'            => 'AL Admin',
                'nom'               => 'JSSED',
                'password'          => 'Admin@2026!',
                'role'              => 'admin',
                'type'              => 'admin',
                'password_status'   => 'valid',
                'email_verified_at' => now(),
                'institution'       => 'ENSPD',
                'pays'              => 'Bénin',
            ]
        );
        User::updateOrCreate(
            ['email' => 'rodriguedjossou93@gmail.com'],
            [
                'prenom'            => 'RO Admin',
                'nom'               => 'JSSED',
                'password'          => 'Admin@2026!',
                'role'              => 'admin',
                'type'              => 'admin',
                'password_status'   => 'valid',
                'email_verified_at' => now(),
                'institution'       => 'ENSPD',
                'pays'              => 'Bénin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'jssed.enspd.up.2026@gmail.com'],
            [
                'prenom'            => 'JS Admin',
                'nom'               => 'JSSED',
                'password'          => 'Admin@2026!',
                'role'              => 'admin',
                'type'              => 'admin',
                'password_status'   => 'valid',
                'email_verified_at' => now(),
                'institution'       => 'ENSPD',
                'pays'              => 'Bénin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'djustino87@gmail.com'],
            [
                'prenom'            => 'DJ Admin',
                'nom'               => 'JSSED',
                'password'          => 'Admin@2026!',
                'role'              => 'admin',
                'type'              => 'admin',
                'password_status'   => 'valid',
                'email_verified_at' => now(),
                'institution'       => 'ENSPD',
                'pays'              => 'Bénin',
            ]
        );
    }
}
