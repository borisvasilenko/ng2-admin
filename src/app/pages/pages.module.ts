import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { CookieService } from 'ng2-cookies';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AuthResolver } from './login/auth.resolver';
import { AuthService } from './login/auth.service';

import { Pages } from './pages.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  providers: [
    AuthService,
    AuthResolver,
    CookieService,
  ],
  declarations: [Pages]
})
export class PagesModule {
}
