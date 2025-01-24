import { Component ,  OnInit } from '@angular/core';
import { Chart, registerables, ChartTypeRegistry } from 'chart.js';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dynamic-analytics',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dynamic-analytics.component.html',
  styleUrl: './dynamic-analytics.component.css'
})
export class DynamicAnalyticsComponent implements OnInit {

  chart: any;  // Declare the chart variable
  chartType: 'bar' | 'pie' = 'bar';  // Default chart type is pie

  // Static data representing students and their favorite colors
  studentsData = [
    { name: 'John', favColor: 'Blue' },
    { name: 'Jane', favColor: 'Red' },
    { name: 'Jim', favColor: 'Blue' },
    { name: 'Jack', favColor: 'Green' },
    { name: 'Jill', favColor: 'Blue' },
    { name: 'Joe', favColor: 'Red' },
    { name: 'Mary', favColor: 'Green' },
    { name: 'Mia', favColor: 'Yellow' },
    { name: 'Mason', favColor: 'Red' }
  ];

  ngOnInit(): void {
    this.processChartData(this.studentsData);
  }

  // Process the data to create a structure suitable for the chart
  processChartData(data: any[]): void {
    const colorGroups: { [key: string]: number } = {};

    data.forEach(student => {
      const color = student.favColor;
      if (!colorGroups[color]) {
        colorGroups[color] = 0;
      }
      colorGroups[color]++;
    });

    this.createChart(colorGroups);  // Create chart after processing data
  }

  // Create and render the chart using Chart.js
  createChart(colorGroups: { [key: string]: number }): void {
    // Register Chart.js components (required for later versions of Chart.js)
    Chart.register(...registerables);

    // Prepare chart data
    const labels = Object.keys(colorGroups);  // The labels will be the favorite colors
    const data = Object.values(colorGroups);  // The data will be the number of students in each color group

    // Destroy the previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    // Create the chart instance, casting chartType to the appropriate type
    this.chart = new Chart('canvas', {
      type: this.chartType as keyof ChartTypeRegistry,  // Cast the type to a valid chart type
      data: {
        labels: labels,  // Labels for x-axis (favorite color)
        datasets: [{
          label: 'Number of Students',
          data: data,  // Number of students in each favorite color group
          backgroundColor: this.chartType === 'pie' ? 'rgba(192, 75, 95, 0.6)' : 'rgba(75, 192, 192, 0.6)',  // Color for Pie or Bar
          borderColor: 'rgba(75, 192, 192, 1)',  // Bar border color
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: this.chartType === 'bar' ? {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        } : {},  // Show scales only for Bar chart
        plugins: {
          legend: {
            display: false  // Hide legend if not needed
          }
        }
      }
    });
  }

  // This method is called when the radio button selection changes
  updateChart(): void {
    // Recreate the chart with the new chart type
    this.processChartData(this.studentsData);  // Reprocess the static data to update the chart
  }
}