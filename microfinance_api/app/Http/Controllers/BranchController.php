<?php

namespace App\Http\Controllers;

use App\Branch;
use App\Token;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BranchController extends Controller
{

    public function branchlist(Request $request){
        $all=$request->all();
        $token=$all['token'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }
        $branches = Branch::where('is_deleted',0);
        if (trim($all['branch_name']) !== '') {
          $branches = $branches->where('branch_name','like',$all['branch_name'].'%');
        }
        if (trim($all['address']) !== '') {
          $branches = $branches->where('address','like','%'.$all['address'].'%');
        }
        $branches = $branches->orderBy('created_at','desc')->paginate(10);
        return $branches;
    }

    public function getAllBranches(Request $request) {

        $all=$request->all();
        $token=$all['token'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }
        return $branches = Branch::where('is_deleted',0)->get();

    }

    public function add(Request $request) {
        $all=$request->all();
        $token = $all['token'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }

        $branch = Branch::where('branch_name',$request->branch_name)->first();
        if($branch){
          return response()->json(['status'=>2,'msg'=>'A branch with this branch name already exists.']);
        }
        $branch = new Branch;

        $branch->branch_name = $request->branch_name;
        $branch->address = $request->address;

        $branch->save();
        return $branch;

    }

    public function edit(Request $request) {
      $has_active_loans=0;
      $all=$request->all();
      $token = $all['token'];
      if(!count(Token::where('token',$token)->get())){
        return response()->json(['status'=>0,'data'=>[]]);
      }

      $branch = Branch::find($all['id']);
      if(!$branch->count()){
        return response()->json(['status'=>2,'msg'=>'No branch found with the supplied id!!']);
      }
      if ($all['is_deleted']==1 && $has_active_loans==1) {
        return response()->json(['status'=>2,'msg'=>'this branch has some active loans / maturities under it, please close them before deleting it!!']);
      }

      $branch->branch_name = $all['branch_name'];
      $branch->address = $all['address'];
      $branch->is_deleted = $all['is_deleted'];

      $branch->save();

      return $branch;
    }

}
