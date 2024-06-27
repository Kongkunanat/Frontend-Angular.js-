import { Component, ChangeDetectorRef, OnDestroy,ViewChild , AfterViewInit} from '@angular/core'; /// viewChild
import { RouterOutlet , RouterLink, RouterLinkActive ,Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive,MatSidenav,MatToolbarModule, MatIconModule,MatListModule ,MatSidenavModule,
    NgIf,
    NgFor,
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy  {


  // @ViewChild('snav') snavRef: MatSidenav;

 // snavRef = viewChild.required<MatSidenav>('snav');

 @ViewChild('snav', { static: false }) snavRef!: MatSidenav;

  mobileQuery: MediaQueryList;
  fillerContent = 'test';
  fillerNav: Array<{ title: string, path: string}> = [
    { title: 'Firstpage', path: 'Firstpage' }
  ];
  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  openSnackBar(message: string, action: string ) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });

  }

  navLinkClick(route: string) {
    if (this.mobileQuery.matches) {
      this.snavRef.close().then(() => {
        this.router.navigate([route]);
      });
    } else {
      this.router.navigate([route]);
    }
  }
}
