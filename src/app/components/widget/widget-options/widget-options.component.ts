import { Component, inject, Input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Widget } from '../../../models/dashboard';
import { DashboardserviceService } from '../../../service/dashboardservice.service';

@Component({
  selector: 'app-widget-options',
  standalone: true,
  imports: [MatButtonModule , MatIcon , MatButtonToggleModule],
  templateUrl: './widget-options.component.html',
  styleUrl: './widget-options.component.css'
})
export class WidgetOptionsComponent {


   @Input() data: any;  // Receive the data input
   Store = inject(DashboardserviceService);
  showOptions = model<boolean>(true);

  constructor(){ }
}
