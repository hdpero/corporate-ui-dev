import { Component, Prop, State, Watch } from '@stencil/core';

import { store } from '../../global';
import * as themes from '../../tmp/header';

@Component({
  tag: 'c-header',
  styleUrl: 'header.scss',
  shadow: true
})
export class Header {
  @Prop() theme: any;
  @Prop() siteName:String = 'Application name';
  @Prop() siteUrl:String = '/';
  @Prop() topItems: any = [{ text: 'global', location: '/' }];
  @Prop() primaryItems: any;
  @Prop() secondaryItems: any;

  @State() currentTheme: string = this.theme || store.getState().theme;
  @State() show = false;
  // There should be a better way of solving this, either by "{ mutable: true }"
  // or "{ reflectToAttr: true }" or harder prop typing Array<Object>
  @State() _topItems: object[] = [];

  @Watch('topItems')
  setItems(items) {
    this._topItems = Array.isArray(items) ? items : JSON.parse(items);
  }

  @Watch('theme')
  updateTheme(name) {
    this.currentTheme = name;
  }

  componentWillLoad() {
    store.subscribe(() => this.currentTheme = store.getState().theme);

    this.setItems(this.topItems);
  }

  hostData() {
    return {
      class: { open: this.show }
    };
  }

  render() {
    return [
      this.currentTheme ? <style>{ themes[this.currentTheme] }</style> : '',

      <nav class='navbar navbar-expand-lg navbar-default'>
        <button
          class='navbar-toggler collapsed'
          type='button'
          onClick={() => this.show = !this.show}>
          <span class='navbar-toggler-icon'></span>
        </button>

        <a href={ this.siteUrl } class='navbar-brand collapse'></a>
        <strong class='navbar-title'>{ this.siteName }</strong>

        <div class='collapse navbar-collapse'>
          <ul class='navbar-nav ml-auto'>
            { this._topItems.map(item => (
              <li class='nav-item'>
                <a class='nav-link' href={item['location']}>
                  <span>{item['text']}</span>
                </a>
              </li>
            )) }
          </ul>
        </div>
      </nav>,

      <a href={ this.siteUrl } class='navbar-symbol'></a>,

      (this.primaryItems || this.secondaryItems)
        ? <c-navigation primary-items={this.primaryItems} secondary-items={this.secondaryItems} show={this.show}></c-navigation> : ''
    ];
  }
}
