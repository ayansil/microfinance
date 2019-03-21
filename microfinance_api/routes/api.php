<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


## authentications
Route::post('login', 'AdminController@login');

## settings
Route::post('getSettings', 'SettingsController@getSettings');


## branch management
Route::post('branchlist', 'BranchController@branchlist');

Route::post('addbranch', 'BranchController@add');

Route::post('editbranch', 'BranchController@edit');

Route::post('getallbranches','BranchController@getAllBranches');

## customer management
Route::post('customerlist', 'CustomerController@customerlist');

Route::post('addcustomer', 'CustomerController@add');

Route::post('editcustomer', 'CustomerController@edit');

Route::post('fetchCustomer', 'CustomerController@fetchCustomer');

## loan management
Route::post('loanlist', 'LoanController@loanlist');

Route::post('addloan', 'LoanController@add');

Route::post('editloan', 'LoanController@edit');

Route::post('fetchMaxCycle', 'LoanController@maxLoanCycle');

