import { Component, computed, signal} from '@angular/core';
import { MatButton,  MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CustomNavbarComponent } from "./components/custom-navbar/custom-navbar.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatMenuModule, MatButtonModule, CustomNavbarComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DynamicDashbaord';

  collapsed = signal(false);

  sidenavwidth = computed(() => this.collapsed() ? '64px' : '250px' );
}
