import {Component, Inject, OnDestroy, OnInit} from '@angular/core';

import { LocaleService } from 'src/app/shared/_services/locale.service';
import { TranslationService } from 'src/app/shared/_services/http/translation.service';

import { MenuLinks } from 'src/app/shared/_consts/menu-links';
import { langCods, langDirection, languages } from 'src/app/shared/_consts/languages';
import { DOCUMENT } from '@angular/common';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  lang: string;

  readonly links = MenuLinks;

  readonly languages = languages;

  readonly langCods = langCods;

  private authListenerSub: Subscription;
  userIsAuthenticated = false;
  constructor(@Inject(DOCUMENT) private document: Document, private localeService: LocaleService,
              private translationsService: TranslationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
    });
    this.getTranslations();
    this.lang = this.localeService.initLang();
    this.document.body.classList.add(langDirection[this.lang]);
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  changeLang(lang: string): void {
    this.localeService.setLang(lang);
    this.changeDirection(lang);
  }

  changeDirection(lang: string): void {
    const bodyClassList = this.document.body.classList;
    bodyClassList.remove(langDirection[this.lang]);

    this.lang = lang;
    bodyClassList.add(langDirection[lang]);
  }

  getTranslations(): void {
    const translations = this.localeService.getTranslations();

    if (!translations) {
      this.translationsService.getTranslations(this.lang)
        .then(response => this.localeService.setTranslations(response));
    }
  }
}
