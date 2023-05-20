import { Component } from '@angular/core';
import { SocketService } from './services/socket-service/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todos-client';

  constructor(private socketService: SocketService) { }
}
