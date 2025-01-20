import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userSvc: UserService) { }
  isCartVisible :boolean = false
  ngOnInit(): void {

    // this.userSvc.getAllUsers().subscribe()
  }

  public onCartToggle():void{
    this.isCartVisible=!this.isCartVisible
  }

}
