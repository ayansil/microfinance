<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
  public function branch()
  {
    return $this->belongsTo('App\Branch');
  }
  public function loans()
  {
    return $this->hasMany('App\Loan');
  }
}
