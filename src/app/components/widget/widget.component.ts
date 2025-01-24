import { NgComponentOutlet } from '@angular/common';
import { Component, input, Input, signal } from '@angular/core';
import { MatButton,  MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button';
import { WidgetOptionsComponent } from "./widget-options/widget-options.component"; 
import { Widget } from '../../models/dashboard';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgComponentOutlet, MatButtonModule, MatIconModule, MatIconButton, MatMenuModule, WidgetOptionsComponent] ,
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  host :{
    '[style.grid-area]':'"span " + (data.rows ?? 2) + "/ span " + (data.columns ?? 2)' 
}

})
export class WidgetComponent {

  //data  = input.required<Widget>();

  @Input() data: any  // Receive the data input

  showOptions = signal(false);

  constructor(){
    
  }
  

}
