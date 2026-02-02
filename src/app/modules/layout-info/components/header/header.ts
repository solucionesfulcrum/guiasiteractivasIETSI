import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() toggleSidenav = new EventEmitter();


  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
