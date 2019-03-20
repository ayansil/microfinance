<?php

namespace App\Http\Controllers;

use App\Setting;
use App\Token;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
  public function getSettings(Request $request) {
    $all = $request->all();
    $token=$all['token'];
    $raw_list=$all['raw_list'];
    $raw_list_arr=explode(',',$all['raw_list']);
    if(!count(Token::where('token',$token)->get())){
      return response()->json(['status'=>0,'data'=>[]]);
    }
    return Setting::whereIn('raw_name',$raw_list_arr)->get();
  }


}
