import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
    provideAnimations(),
    importProvidersFrom(
      HttpClientModule,  // HttpClientModule DEBE estar aquí
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatTooltipModule,
      MatChipsModule
    )
  ]
}).catch(err => console.error(err));