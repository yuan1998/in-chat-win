<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class CreateTransformer extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'yuan:transformer {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'create Transformer';

    /**
     * Create a new command instance.
     *
     * @return void
     */

    public function getStub()
    {
        return __DIR__ . '/Stubs/transformer.stub';
    }


    public function getPath($name)
    {
        $name = Str::replaceFirst($this->rootNamespace(), '', $name);

        return $this->laravel['path'] . '/' . str_replace('\\', '/', $name) . 'Transformer.php';
    }

    public function buildClass($name)
    {
        $stub = $this->files->get($this->getStub());
        return $this->replaceClass($this->replaceInstance($stub,$name),$name);
    }

    public function replaceInstance($stub, $name)
    {
        $class = str_replace($this->getNamespace($name) . '\\', '', $name);
        return str_replace('dummyInstance', lcfirst($class), $stub);
    }

    public function getDefaultNamespace($root)
    {
        return "$root\Transformers";
    }



}
