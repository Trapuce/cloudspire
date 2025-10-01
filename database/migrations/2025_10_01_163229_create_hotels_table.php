<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('address1');
            $table->string('address2')->nullable();
            $table->string('zipcode');
            $table->string('city');
            $table->string('country');
            $table->decimal('lat', 10, 8); 
            $table->decimal('lng', 11, 8); 
            $table->text('description')->nullable();
            $table->integer('max_capacity')->unsigned(); 
            $table->decimal('price_per_night', 10, 2)->unsigned(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
