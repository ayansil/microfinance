<?php

namespace App\Http\Controllers;

use App\Loan;
use App\Token;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoanController extends Controller
{

    public function loanlist(Request $request){
        $all=$request->all();
        $token=$all['token'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }
        $loans = Loan::where('is_deleted',0);

        $loans = $loans->whereHas('branch', function ($query){
          $query->where('is_deleted', '0');
        });

        $loans = $loans->whereHas('customer', function ($query){
          $query->where('is_deleted', '0');
        });
        $loans = $loans->orderBy('created_at','desc')->with('branch')->with('customer')->paginate(10);
        return $loans;
    }

    // public function add(Request $request) {
    //     $all=$request->all();
    //     $token = $all['token'];
    //     if(!count(Token::where('token',$token)->get())){
    //         return response()->json(['status'=>0,'data'=>[]]);
    //     }


    //     $customer = new Customer;

    //     $customer->first_name = $request->first_name;
    //     $customer->last_name = $request->last_name;
    //     $customer->address = $request->address;
    //     $customer->phone = $request->phone;
    //     $customer->nominee_first_name = $request->nominee_first_name;
    //     $customer->nominee_last_name = $request->nominee_last_name;
    //     $customer->nominee_relation = $request->nominee_relation;
    //     $customer->branch_id = $request->branch_id;

    //     $customer->save();
    //     return $customer;

    // }

    // public function edit(Request $request) {
    //   $has_active_loans=0;
    //   $all=$request->all();
    //   $token = $all['token'];
    //   if(!count(Token::where('token',$token)->get())){
    //     return response()->json(['status'=>0,'data'=>[]]);
    //   }

    //   $customer = Customer::find($all['id']);
    //   if(!$customer->count()){
    //     return response()->json(['status'=>2,'msg'=>'No customer found with the supplied id!!']);
    //   }
    //   if ($all['is_deleted']==1 && $has_active_loans==1) {
    //     return response()->json(['status'=>2,'msg'=>'this customer has some active loans / maturities, please close them before deleting it!!']);
    //   }

    //   $customer->first_name = $request->first_name;
    //   $customer->last_name = $request->last_name;
    //   $customer->address = $request->address;
    //   $customer->phone = $request->phone;
    //   $customer->nominee_first_name = $request->nominee_first_name;
    //   $customer->nominee_last_name = $request->nominee_last_name;
    //   $customer->nominee_relation = $request->nominee_relation;
    //   $customer->branch_id = $request->branch_id;
    //   $customer->is_deleted = $all['is_deleted'];


    //   $customer->save();

    //   return $customer;
    // }

}
