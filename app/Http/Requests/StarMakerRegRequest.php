<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class StarMakerRegRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'city'=>'required',
            'company_name'=>'required',
            'email'=>'required|email',
            'password'=>'required',
            'username'=>'required',
            'state'=>'required',
            'logo_image'=>'required'
        ];
    }
}
