/**
 * 
 * ================================
 * ; Title: Nodebucket Project
 * ; Author: James Brown/Professor Krasso
 * ; Modified by: James Brown
 * ; Date: 9/25/2020
 * ; Description: Nodebucket project for web-450
 * ================================
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, 
         MatSnackBarVerticalPosition 
        } from '@angular/material/snack-bar'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: string;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //add matsnackbar if you want
  constructor(private router: Router, 
    private cookieService: CookieService, 
    private fb: FormBuilder, 
    private http: HttpClient,
    private _snackBar: MatSnackBar) { 
    }

    openSnackBar(error: string) {
      this._snackBar.open(error, 'Close', {
        duration: 7000,
        verticalPosition: 'top',
        panelClass: 'error'
      });
    }
    

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  login(){
    const empId = this.form.controls['empId'].value;
    this.http.get('/api/employees/' + empId).subscribe(res => {
      if (res) {
        this.cookieService.set('session_user', empId, 1); //set the mployee id to the cookie session_user name
        this.router.navigate(['/']);
      } else {
        this.error = 'The employee ID you entered is invalid, try again.';
        this.openSnackBar(this.error);
      }
    })
  }
}
