import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  getWelcomeMessage() {
    return "Nanba! This service call working perfectly! 🔥";
  }
}
