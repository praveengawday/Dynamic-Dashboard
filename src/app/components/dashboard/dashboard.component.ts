import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardserviceService } from '../../service/dashboardservice.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, WidgetComponent]
})
export class DashboardComponent {
  @ViewChild('dashboard', { static: false }) dashboard!: ElementRef;

  constructor(public store: DashboardserviceService) {}

  /**
   * Exports the dashboard content to a PDF.
   */
  exportDashboardToPDF(): void {
    const dashboardElement = this.dashboard.nativeElement;

    html2canvas(dashboardElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('dashboard.pdf');
    });
  }
}
