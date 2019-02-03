import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
register() {

this.authService.register(this.model).subscribe(() => {
console.log('Registration Succesfull.');
}, error => {
  console.log(error);
});
  console.log(this.model);
}
cancelled() {
  this.cancelRegister.emit(false);
  console.log('Cancelled');
}
}