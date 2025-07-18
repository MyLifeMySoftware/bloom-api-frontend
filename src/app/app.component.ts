import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BloomDataTableComponent } from './components/bloom-data-table/bloom-data-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    BloomDataTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bloom Data Viewer';
}