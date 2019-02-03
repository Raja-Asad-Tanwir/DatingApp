import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
models: any = {};
  constructor(private authservice: AuthService) { }

  ngOnInit() {
    // this.login();
  }
login() {
  this.authservice.login(this.models).subscribe(next => {
    console.log('logged in successfully.');
  }, error => { console.log('Wrong credentials');
});
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !!token;
}
loggedOut() {
  localStorage.removeItem('token');
  console.log('Logged Out');
}
}
