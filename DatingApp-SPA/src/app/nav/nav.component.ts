import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
models: any = {};
  constructor(public authservice: AuthService, private alertifyservice: AlertifyService) { }

  ngOnInit() {
    // this.login();
  }
login() {
  this.authservice.login(this.models).subscribe(next => {
    this.alertifyservice.success('Logged In Successfuly');
  }, error => { this.alertifyservice.error(error);
});
}

loggedIn() {
  // const token = localStorage.getItem('token');
  // return !!token;
 return this.authservice.loggedIn();
}
loggedOut() {
  localStorage.removeItem('token');
  this.alertifyservice.message('Logged Out');
}
}
