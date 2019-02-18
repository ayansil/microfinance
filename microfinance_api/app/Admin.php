<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    public function tokens()
    {
        return $this->hasMany('App\Token');
    }
}
