<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Token;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    public function customerlist(Request $request){
        $all=$request->all();
        $token=$all['token'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }
        $customers = Customer::where('is_deleted',0);
        if (trim($all['first_name']) !== '') {
          $customers = $customers->where('first_name','like',$all['first_name'].'%');
        }
        if (trim($all['last_name']) !== '') {
          $customers = $customers->where('last_name','like',$all['last_name'].'%');
        }
        if (trim($all['address']) !== '') {
          $customers = $customers->where('address','like','%'.$all['address'].'%');
        }
        if (trim($all['phone']) !== '') {
          $customers = $customers->where('phone','like',$all['phone'].'%');
        }
        if (trim($all['nominee_first_name']) !== '') {
          $customers = $customers->where('nominee_first_name','like',$all['nominee_first_name'].'%');
        }
        if (trim($all['nominee_last_name']) !== '') {
          $customers = $customers->where('nominee_last_name','like',$all['nominee_last_name'].'%');
        }
        if (trim($all['nominee_relation']) !== '') {
          $customers = $customers->where('nominee_relation','like',$all['nominee_relation'].'%');
        }
        if (trim($all['branch_name']) !== '') {
          $branch_name = $all['branch_name'];
          $customers = $customers->whereHas('branch', function ($query) use ($branch_name) {
            $query->where('branch_name', 'like', $branch_name.'%');
          });
        }
        $customers = $customers->whereHas('branch', function ($query){
          $query->where('is_deleted', '0');
        });
        $customers = $customers->orderBy('created_at','desc')->with('branch')->paginate(10);
        return $customers;
    }

    public function add(Request $request) {
        $all=$request->all();
        $token = $all['token'];
        if(!count(Token::where('token',$token)->get())){
            return response()->json(['status'=>0,'data'=>[]]);
        }


        $customer = new Customer;

        $customer->first_name = $request->first_name;
        $customer->last_name = $request->last_name;
        $customer->address = $request->address;
        $customer->phone = $request->phone;
        $customer->nominee_first_name = $request->nominee_first_name;
        $customer->nominee_last_name = $request->nominee_last_name;
        $customer->nominee_relation = $request->nominee_relation;
        $customer->branch_id = $request->branch_id;

        $customer->save();
        return $customer;

    }

    public function edit(Request $request) {
      $has_active_loans=0;
      $all=$request->all();
      $token = $all['token'];
      if(!count(Token::where('token',$token)->get())){
        return response()->json(['status'=>0,'data'=>[]]);
      }

      $customer = Customer::find($all['id']);
      if(!$customer->count()){
        return response()->json(['status'=>2,'msg'=>'No customer found with the supplied id!!']);
      }
      if ($all['is_deleted']==1 && $has_active_loans==1) {
        return response()->json(['status'=>2,'msg'=>'this customer has some active loans / maturities, please close them before deleting it!!']);
      }

      $customer->first_name = $request->first_name;
      $customer->last_name = $request->last_name;
      $customer->address = $request->address;
      $customer->phone = $request->phone;
      $customer->nominee_first_name = $request->nominee_first_name;
      $customer->nominee_last_name = $request->nominee_last_name;
      $customer->nominee_relation = $request->nominee_relation;
      $customer->branch_id = $request->branch_id;
      $customer->is_deleted = $all['is_deleted'];


      $customer->save();

      return $customer;
    }

}
