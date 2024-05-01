<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class usuario extends Model
{
    use HasFactory;

    // protected $table = 'usuarios';
    protected $fillable = ['Name', 'LastName', 'email', 'password', 'phone', 'address', 'city', 'oper'];

}
