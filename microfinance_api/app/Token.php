<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    public function admin()
    {
        return $this->belongsTo('App\Admin');
    }
}
