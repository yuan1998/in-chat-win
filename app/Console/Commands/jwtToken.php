<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;

class jwtToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'yuan:create-token';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'create token';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $userId = $this->ask('Input User ID');

        $user = User::find($userId);

        if(!$user)
            return $this->error('User is Not Exist');

        $ttl = 365*24*60;
        $this->info(\Auth::guard('api')->setTTL($ttl)->fromUser($user));

    }
}
