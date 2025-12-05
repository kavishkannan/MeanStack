import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [MatCardModule]
})

export class Home {

  constructor(private messageService: MessageService) { }

  today = new Date();
  message = "Angular learning with my nanba!";
  result = "";
  
  router = inject(Router);

  sayHello() {
    this.result = "Hello nanba! 👋 Angular work aagiduchu!";
  }

  getWelcome() {
    this.result = this.messageService.getWelcomeMessage();
  }

  go(path: string) {
    this.router.navigate([path]);
  }

}
