import { Component, computed, Input, input, signal } from '@angular/core';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { sign } from 'crypto';

export type MenuItem  ={
  icon : string,
  label: string,
  route? :any
}

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [MatListModule , MatIconModule,  CommonModule],
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.css'
})
export class CustomNavbarComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon :'comment',
      label :'Comments',
      route : 'comments'
    },
    {
      icon :'analytics',
      label :'Analytics',
      route : 'analytics'
    },
    {
      icon :'video_library',
      label :'Videos',
      route : 'Videos'
    },
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32px' : '100px');

}
