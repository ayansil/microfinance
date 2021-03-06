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
        $customer_id=$all['customer_id'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }
        $loans = Loan::where('is_deleted',0);

        $loans = $loans->whereHas('branch', function ($query){
          $query->where('is_deleted', '0');
        });

        $loans = $loans->whereHas('customer', function ($query) use ($customer_id){
          $query->where('is_deleted', '0')->where('customer_id',$customer_id);
        });
        $loans = $loans->orderBy('created_at','desc')->with('branch')->with('customer')->paginate(10);
        return $loans;
    }

    public function maxLoanCycle(Request $request) {
      $all = $request->all();
      $token=$all['token'];
      $customer_id=$all['customer_id'];
      if(!count(Token::where('token',$token)->get())){
          return response()->json(['status'=>0,'data'=>[]]);
      }
      $loans = Loan::where('is_deleted',0);

        $loans = $loans->whereHas('branch', function ($query){
          $query->where('is_deleted', '0');
        });

        $loans = $loans->whereHas('customer', function ($query) use ($customer_id){
          $query->where('is_deleted', '0')->where('customer_id',$customer_id);
        });
      return $loans->max('loan_cycle');

    }

    public function add(Request $request) {
        $all=$request->all();
        $token = $all['token'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }

        //$the_customer = App\Customer::where('id',$all['customer_id'])->get();
        //print_r($the_customer);
        //exit();
        $loan = new Loan;
        $loan->loan_amt = $all['loan_amt'];
        $loan->no_of_installments = $all['no_of_installments'];
        $loan->loan_start_date = $all['loan_start_date'];
        $loan->loan_percentage = $all['loan_percentage'];
        $loan->with_sc = $all['with_sc'];
        $loan->loan_cycle = $all['loan_cycle'];
        $loan->customer_id = $all['customer_id'];
        $loan->branch_id = 1;
        $loan->save();
        return $loan;

    }

    public function edit(Request $request) {
      $has_active_installments=0;
      $all=$request->all();
      $token = $all['token'];
      if(!count(Token::where('token',$token)->get())){
        return response()->json(['status'=>0,'data'=>[]]);
      }

      $loan = Loan::find($all['id']);
      if(!$loan->count()){
        return response()->json(['status'=>2,'msg'=>'No loan found with the supplied id!!']);
      }
      if ($all['is_deleted']==1 && $has_active_installments==1) {
        return response()->json(['status'=>2,'msg'=>'this customer has some active loans / maturities, please close them before deleting it!!']);
      }

      $loan->loan_amt = $all['loan_amt'];
      $loan->no_of_installments = $all['no_of_installments'];
      $loan->loan_start_date = $all['loan_start_date'];
      $loan->loan_percentage = $all['loan_percentage'];
      $loan->with_sc = $all['with_sc'];
      $loan->loan_cycle = $all['loan_cycle'];
      $loan->customer_id = $all['customer_id'];
      $loan->branch_id = 1;
      $loan->is_deleted = $all['is_deleted'];

      $loan->save();
      return $loan;
    }

}
