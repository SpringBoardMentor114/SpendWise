import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../login/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  renderAdditionalContent: boolean = false;
  isSidebarOpen: boolean = false;
  // firstName = 'Om';
  // lastName = 'Tamrakar';
  email: string='';
  


  constructor(private router: Router, private userService: UserService) {
    // Subscribe to router events to detect navigation changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the home page
        this.renderAdditionalContent = event.urlAfterRedirects === '/Home';
      }
    });
  }

  ngOnInit(){
    this.email = this.userService.getUserEmail();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  

 
}
