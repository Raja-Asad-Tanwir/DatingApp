import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
model: any = {};
  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }
register() {

this.authService.register(this.model).subscribe(() => {
this.alertifyService.success('Registration Succesfull.');
}, error => {
  this.alertifyService.error(error);
});
  this.alertifyService.message(this.model);
}
cancelled() {
  this.cancelRegister.emit(false);
  this.alertifyService.message('Cancelled');
}
}
