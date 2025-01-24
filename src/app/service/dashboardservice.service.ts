import { computed, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { SubscribersComponent } from '../components/subscribers/subscribers.component';
import { ViewsComponent } from '../components/views/views.component';
import { RevenueComponent } from '../components/revenue/revenue.component';
import { WatchTimeComponent } from '../components/watch-time/watch-time.component';
import { AnalyticsComponent } from '../components/analytics/analytics.component';
import { DynamicAnalyticsComponent } from '../components/dynamic-analytics/dynamic-analytics.component';
import { jsPDF } from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class DashboardserviceService {

  exportToPDF() {
    const doc = new jsPDF();
    let yOffset = 10;  // Vertical offset for positioning

    // Loop through all the added widgets and add them to the PDF
    this.addeddWidgets().forEach(widget => {
      doc.text(widget.label, 10, yOffset);  // Add widget label as text to the PDF
      yOffset += 10;  // Space between widgets

      // You can customize this part to include more detailed widget content if needed
    });

    doc.save('dashboard.pdf');  // Save the PDF with the filename 'dashboard.pdf'
  }


  // Initialize signal correctly
  Widget = signal<Widget[]>([
    {
      id: 1,
      label: 'subscriber',
      content: SubscribersComponent,
      rows : 2,
      columns :2,
      backgroundColor : '#003f5c',
      color : 'whitesmoke'
    },
    {
      id: 2,
      label: 'views',
      content: ViewsComponent,
      rows : 2,
      columns :2,
      backgroundColor : 'green',
      color : 'black'
    },
    {
      id: 3,
      label: 'revenue',
      content: RevenueComponent,
      rows : 2,
      columns :2,
      backgroundColor : 'yellow',
      color : 'black'
    },
    {
      id: 4,
      label: 'watch time',
      content: WatchTimeComponent,
      rows : 2,
      columns :2,
      backgroundColor : 'red',
      color : 'white'
    },
    {
      id: 5,
      label: 'Analytics',
      content: AnalyticsComponent,
      rows : 2,
      columns :2,
      backgroundColor : 'white',
      color : 'black'
    },
    {
      id: 6,
      label: 'Dymanic - Analytics',
      content: DynamicAnalyticsComponent,
       rows : 2,
       columns :2,
      backgroundColor : 'whitesmoke',
      color : 'black'
    },
  
  ]);

  addeddWidgets = signal<Widget[]>([
    {
      id: 1,
      label: 'subscriber',
      content: SubscribersComponent,
      rows : 2,
      columns :2,
      backgroundColor : '#003f5c',
      color : 'whitesmoke'
    },
    {
      id: 2,
      label: 'views',
      content: ViewsComponent,
      rows : 2,
      columns :2,
      backgroundColor : 'green',
      color : 'black'
    },
    {
      id: 3,
      label: 'revenue',
      content: RevenueComponent,
      rows : 2,
      columns :2,
      backgroundColor : 'yellow',
      color : 'black'
    },
    {
      id: 4,
      label: 'watch time',
      content: WatchTimeComponent,
      rows : 2,
      columns :2,
      backgroundColor : 'red',
      color : 'white'
    },
    {
      id: 5,
      label: 'Analytics',
      content: AnalyticsComponent,
       rows : 2,
       columns :2,
      backgroundColor : 'white',
      color : 'black'
    },
    {
      id: 6,
      label: 'Dymanic - Analytics',
      content: DynamicAnalyticsComponent,
       rows : 2,
       columns :2,
      backgroundColor : 'whitesmoke',
      color : 'black'
    },
   
  ]);

  widgetToAdd = computed(() =>{
    const addedIds = this.addeddWidgets().map(w => w.id);
    return this.Widget().filter( w => !addedIds.includes(w.id))
  })

  addWidget( w: Widget){
    this.addeddWidgets.set([...this.addeddWidgets() ,{ ...w}])
  }

  updateWidget(id: number, widget: Partial<Widget>) {
 
    const index = this.addeddWidgets().findIndex(w => w.id === id);
     
    if (index !== -1) { 
       const newWidgets = [...this.addeddWidgets()];
       newWidgets [index] = { ...newWidgets[index], ...widget };
       this.addeddWidgets.set(newWidgets);
    }
  }



  moveWidgetToRight(id: number) {
    console.log("right");
    const index = this.addeddWidgets().findIndex(w => w.id === id);
    if (index === this.addeddWidgets().length - 1) {
      return; // Do nothing if it's already the last widget
    }
  
    const newWidgets = [...this.addeddWidgets()];
    // Swap the widget with the next one
    [newWidgets[index], newWidgets[index + 1]] = [newWidgets[index + 1], newWidgets[index]];
    this.addeddWidgets.set(newWidgets); // Update the state
  }
  

 

  moveWidgetToLeft(id: number) {
    
    const index = this.addeddWidgets().findIndex(w => w.id === id);
    if (index === 0) {
      return; // Do nothing if it's already the first widget
    }
  
    const newWidgets = [...this.addeddWidgets()];
    // Swap the widget with the previous one
    [newWidgets[index], newWidgets[index - 1]] = [newWidgets[index - 1], newWidgets[index]];
    this.addeddWidgets.set(newWidgets); // Update the state
  }
  
  removeWidget(id : number){
    this.addeddWidgets.set(this.addeddWidgets().filter( w=> w.id !== id))
  }

  constructor() { }
}
