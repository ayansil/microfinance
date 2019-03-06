<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Token;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function login(Request $request)
    {
        $all=$request->all();
        $admin=Admin::where('email',$all['email'])->where('password',md5($all['password']))->get();
        if(count($admin)>0){
            $status=1;
            do{
                $token=rand(1000,99999);
                if(!count(Token::where('token',$token)->get())){
                    $status=0;
                }
            }
            while($status);

            $new_token = new Token;

            $new_token->token = $token;
            $new_token->admin_id = $admin[0]->id;
            $new_token->save();

            return response()->json(['status'=>1,'data'=>['token'=>$token]]);
        }
        else {
            return response()->json(['status'=>0,'data'=>[$all['email'],md5($all['password'])]]);
        };
    }
}
