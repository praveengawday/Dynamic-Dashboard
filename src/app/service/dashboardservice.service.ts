import { computed, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { SubscribersComponent } from '../components/subscribers/subscribers.component';
import { ViewsComponent } from '../components/views/views.component';
import { RevenueComponent } from '../components/revenue/revenue.component';
import { WatchTimeComponent } from '../components/watch-time/watch-time.component';
import { AnalyticsComponent } from '../components/analytics/analytics.component';
import { DynamicAnalyticsComponent } from '../components/dynamic-analytics/dynamic-analytics.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardserviceService {
  Widget = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscriber',
      content: SubscribersComponent,
      rows: 2,
      columns: 2,
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      rows: 2,
      columns: 2,
      backgroundColor: 'green',
      color: 'black',
    },
    {
      id: 3,
      label: 'Revenue',
      content: RevenueComponent,
      rows: 2,
      columns: 2,
      backgroundColor: 'yellow',
      color: 'black',
    },
    {
      id: 4,
      label: 'Watch Time',
      content: WatchTimeComponent,
      rows: 2,
      columns: 2,
      backgroundColor: 'red',
      color: 'white',
    },
    {
      id: 5,
      label: 'Analytics',
      content: AnalyticsComponent,
      rows: 2,
      columns: 2,
      backgroundColor: 'white',
      color: 'black',
    },
    {
      id: 6,
      label: 'Dynamic Analytics',
      content: DynamicAnalyticsComponent,
      rows: 2,
      columns: 2,
      backgroundColor: 'whitesmoke',
      color: 'black',
    },
  ]);

  // Added widgets
  addeddWidgets = signal<Widget[]>([]);

  // Widgets available to add (computed based on what has already been added)
  widgetToAdd = computed(() => {
    const addedIds = this.addeddWidgets().map(w => w.id);
    return this.Widget().filter(w => !addedIds.includes(w.id));
  });

  // Add a widget to the dashboard
  addWidget(widget: Widget) {
    this.addeddWidgets.set([...this.addeddWidgets(), { ...widget }]);
  }

  // Remove a widget from the dashboard
  removeWidget(id: number) {
    this.addeddWidgets.set(this.addeddWidgets().filter(w => w.id !== id));
  }

  // Update a specific widget's properties
  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addeddWidgets().findIndex(w => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addeddWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.addeddWidgets.set(newWidgets);
    }
  }

  // Move a widget to the right
  moveWidgetToRight(id: number) {
    const index = this.addeddWidgets().findIndex(w => w.id === id);
    if (index !== -1 && index < this.addeddWidgets().length - 1) {
      const newWidgets = [...this.addeddWidgets()];
      [newWidgets[index], newWidgets[index + 1]] = [newWidgets[index + 1], newWidgets[index]];
      this.addeddWidgets.set(newWidgets);
    }
  }

  // Move a widget to the left
  moveWidgetToLeft(id: number) {
    const index = this.addeddWidgets().findIndex(w => w.id === id);
    if (index > 0) {
      const newWidgets = [...this.addeddWidgets()];
      [newWidgets[index], newWidgets[index - 1]] = [newWidgets[index - 1], newWidgets[index]];
      this.addeddWidgets.set(newWidgets);
    }
  }

  constructor() {}
}
