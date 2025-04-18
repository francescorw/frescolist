import { Component } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FRESCOLIST_LOGO } from './core/icons';

@Component({
  selector: 'frescolist-root',
  imports: [MatIconModule, ToolbarComponent, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frescolist';

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconLiteralInNamespace('frescolist', 'logo', sanitizer.bypassSecurityTrustHtml(FRESCOLIST_LOGO));
  }
}
