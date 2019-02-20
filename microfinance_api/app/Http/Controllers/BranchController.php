<?php

namespace App\Http\Controllers;

use App\Branch;
use App\Token;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BranchController extends Controller
{

    public function list(Request $request){
        $all=$request->all();
        $token=$all['token'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }
        return Branch::orderBy('created_at','desc')->paginate(10);
    }

    public function add(Request $request) {
        $all=$request->all();
        $token = $all['token'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }

        $branch = new Branch;

        $branch->branch_name = $request->branch_name;
        $branch->address = $request->address;

        $branch->save();
        return $branch;

    }

}
