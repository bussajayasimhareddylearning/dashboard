// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {LocalSettings, Theme} from '@api/root.api';
import {LanguageConfig} from '@api/root.ui';
import {LocalSettingsService} from '@common/services/global/localsettings';
import {ThemeService} from '@common/services/global/theme';
import {environment} from '@environments/environment';
import {Config, CONFIG_DI_TOKEN} from '@root/index.config';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'kd-local-settings',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class LocalSettingsComponent implements OnInit {
  settings: LocalSettings = {} as LocalSettings;
  languages: LanguageConfig[] = [];
  selectedLanguage: string;
  themes: Theme[];
  selectedTheme: string;
  systemTheme: string;

  @ViewChild(MatSelect, {static: true}) private readonly select_: MatSelect;

  constructor(
    private readonly settings_: LocalSettingsService,
    private readonly theme_: ThemeService,
    private readonly cookies_: CookieService,
    @Inject(DOCUMENT) private readonly document_: Document,
    @Inject(CONFIG_DI_TOKEN) private readonly appConfig_: Config
  ) {}

  ngOnInit(): void {
    this.settings = this.settings_.get();

    this.languages = this.appConfig_.supportedLanguages;
    this.selectedLanguage = this.cookies_.get(this.appConfig_.languageCookieName) || this.appConfig_.defaultLanguage;

    this.themes = this.theme_.themes;
    this.selectedTheme = this.theme_.theme;
    this.systemTheme = this.theme_.systemTheme;
  }

  onThemeChange(): void {
    this.settings.theme = this.selectedTheme;
    this.settings_.handleThemeChange(this.settings.theme);
  }

  onLanguageSelected(selectedLanguage: string) {
    this.cookies_.set(this.appConfig_.languageCookieName, selectedLanguage);
    this.document_.location.reload();
  }

  isProdMode(): boolean {
    return environment.production;
  }
}
