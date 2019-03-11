<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
  public function branch()
  {
    return $this->belongsTo('App\Branch');
  }
  public function customer()
  {
    return $this->belongsTo('App\Customer');
  }

}
