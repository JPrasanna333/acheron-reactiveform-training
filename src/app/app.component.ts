import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from './user.entity';
import { ageRangeValidators } from './validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Reactive Forms Demo';
  passWordLength = 2 // api 
  user?:IUser;
  minAge = 20; 
  maxAge = 50; 
  login: FormGroup;

  constructor(private fb: FormBuilder) {

    this.login = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password :new FormControl("",[Validators.required, Validators.minLength(this.passWordLength)]),
      address : new FormGroup({
        street : new FormControl("",[Validators.required]),
        city : new FormControl("",[Validators.required])
      }),
      age : new FormControl("",[ageRangeValidators(this.minAge, this.maxAge)]),
      phonenumber : new FormControl(),
      notfication: new FormControl('email')
    });

    // this.login = this.fb.group({
    //   email:[""],
    //   password :[""],
    //   address : this.fb.group({
    //     street:[],
    //     city:[]
    //   })
    // })
  }

  ngOnInit(): void {
    // api 
    this.user = {
      email:"debugmode@outlook.com",
      address : {
        city : "Gurgaon",
        street : "Sector 47"
      }
    }

  //  this.login.patchValue(this.user);

  this.readNotificationValue();
  }

  Login():void{
   console.log(this.login.value);
   console.log(this.login.valid);
  }

  readNotificationValue(){


    const phone = this.login.get('phonenumber');
    this.login.get('notfication')?.valueChanges.subscribe(
      (data:any)=>{
        console.log(data);
        if(data == 'email'){
          phone?.clearValidators();
        }
        else if(data == 'phone'){
          phone?.setValidators([Validators.required]);
        }
        phone?.updateValueAndValidity();
      }
    )
  }
}
