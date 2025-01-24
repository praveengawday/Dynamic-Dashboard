import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { WidgetComponent } from "../widget/widget.component";
import { DashboardserviceService } from '../../service/dashboardservice.service';
import { MatButton,  MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { wrapGrid} from 'animate-css-grid';
import { MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CustomNavbarComponent } from "../custom-navbar/custom-navbar.component";




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent, RouterModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatButton, MatIconModule, MatMenuModule, MatButtonModule, ],
  providers:[DashboardserviceService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  Store = inject(DashboardserviceService);

  dashboard = viewChild.required<ElementRef>('dashboard');
  dashboardService: any;

  exportDashboardToPDF() {
    console.log("export pdf funciton call")
    this.dashboardService.exportToPDF();
  }

  ngOnInit(){
    console.log("this is workig")
    wrapGrid(this.dashboard().nativeElement, { duration :300})
  }

}
