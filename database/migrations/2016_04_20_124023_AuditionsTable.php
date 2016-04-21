<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AuditionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auditions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('name');
            $table->string('description');
            $table->date('date');
            $table->string('sex');
            $table->integer('age');
            $table->string('category');
            $table->string('location');
            $table->string('type');
            $table->timestamps();
        });

        Schema::create('auditions_applications', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('auditions_id');
            $table->string('applicants');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auditions');
        Schema::dropIfExists('auditions_applications');
    }
}
