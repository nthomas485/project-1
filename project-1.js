/**
 * Copyright 2024 nthomas485
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./page-card.js";
import "./card-overview.js";
import { pageCard } from "./page-card.js";

/**
 * `project-1`
 * 
 * @demo index.html
 * @element project-1
 */
export class project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.title = "";
    this.mainTitle = "HAX Search";
    this.name = "";
    this.description = "";
    this.logo = "";
    this.image = "";
    this.theme = "";
    this.created = "";
    this.lastUpdated = "";
    this.items = [];
    this.url = "";
    this.isValid = false;
    this.loading = false;
    this.placeholder = "haxtheweb.org";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      mainTitle: { type: String },
      name: { type: String },
      description: { type: String },
      logo: { type: String },
      image: { type: String },
      theme: { type: String },
      created: { type: String },
      lastUpdate: { type: String },
      items: { type: Array },
      loading: { type: Boolean, reflect: true },
      url: { type: String, attribute: 'json-url' },
      isValid: { type: Boolean, reflect: true },
      placeholder: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      summary {
        font-size: 24px;
        padding: var(--ddd-spacing-2, 8px);
        color: var(--ddd-theme-default-white);
        font-size: var(--ddd-font-size-l);
        text-align: center;
      }
      input {
        font-size: var(--ddd-font-size-20px, 20px);
        line-height: var(--ddd-lh-40, 40px);
        width: 100%;
        text-align: center;
      }
      .main-title{
        text-align: center;
      }
      .drop-downs{
        text-align: center;
      }
      .search-inputs{
        text-align: center;
      }
      details{
        margin-left: 375px;
      }
      button{
        display: inline-block;
        font-size: var(--ddd-font-size-20px, 20px);
        width: 100%;
      }
      button:hover{
        color: var(--ddd-theme-default-athertonViolet);
      }
      .card-output{ 
        background-color: var(--ddd-theme-default-black);
      }
      .overview{
        display: hidden;
        position: relative;
        text-align: center;
        //height: 190px;
        //max-height: 560px;
      }
    `];
  }

  // Lit render the HTML
  render() {
    if (this.shadowRoot.querySelector('#text-box') === ''){
      
    }
    return html`
<div class="wrapper">
  <div class="drop-downs">
    <div class="main-title" >
    <h3>${this.mainTitle}</h3>
    </div>
  <details open>
      <summary>Enter Site URL</summary>
      <div class="search-inputs">
        <input type="text" id="text-box"  placeholder="${this.placeholder}" @input="${this.inputChanged}" @keydown="${(e) => {if(e.key == 'Enter'){this.updateResults();}}}" />
        <button title="Analyze" id="analyze" @click="${this.updateResults}">Analyze</button>
      </div>
    </details>
    </div>
    ${this.value ? html`<div class="overview">
   <card-overview
    url="${this.url}"
    title="${this.title}"
    description="${this.description}"
    logo="${this.logo}"
    created="${this.created}"
    lastUpdated="${this.lastUpdated}"
    hex="${this.hex}"
    theme="${this.theme}"
    icon="${this.icon}"
   ></card-overview> 
   </div>` : ''}

   ${this.value ? html`<div class="card-output">
      ${this.items.map((item) => {
      const imageUrl = item.metadata?.images?.[0] || '';
      return html`
          <page-card
          url="${this.url}"
          title="${item.title}"
          image="${imageUrl}"
          lastUpdated="Updated: ${this.dated(item.metadata.updated)}"
          description="${item.description}"
          slug="${this.url}${item.slug}"
          source="${this.url}${item.location}"
          created="Created: ${this.dated(item.metadata.created)}"
          ></page-card>
        `})}
    </div> ` : ''}
</div>`;
  }

  dated(input) {
    var date = new Date(input * 1000);
    return (date.toUTCString());
  }

  inputChanged(e) {
    //this.value = this.shadowRoot.querySelector('#analyze').value;
    this.value = e.target.value;
  }

  getDomain() {

    try {
      const parsedUrl = new URL(this.value);
      this.url = `${parsedUrl.protocol}//${parsedUrl.host}/`;
      console.log(this.url)
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }

  updated(changedProperties) {

    // see if value changes from user input and is not empty
    if (changedProperties.has('value')) {
      this.updateResults(this.value);
    } else if (changedProperties.has('value') && !this.value) {
      this.items = []
    }
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }

  }
  updateResults(value) {
    //const json =  `${this.url}site.json`;
    this.value = this.shadowRoot.querySelector('#text-box').value;
    this.loading = true;
    if (!this.value.endsWith('/site.json')) {
      this.value += '/site.json';
    }
    if (!this.value.startsWith('https://')) {
      this.value = `https://${this.value}`;
    }
    this.url = this.getDomain(this.value);
    console.log(`Updated url: ${this.value}`)
    this.url = this.value.substring(0, this.value.indexOf("site.json"))
    //console.log(this.url)
    // this.url = this.getDomain()
    fetch(this.value).then(response => response.ok ? response.json() : {}).then(data => {//fetch(this.value).then(d => d.ok ? d.json() : {}).then(data => {
      this.title = data.title
      this.description = data.description
      this.logo = data.metadata.site.logo
      this.created = this.dated(data.metadata.site.created)
      this.lastUpdated = this.dated(data.metadata.site.updated)
      this.hex = data.metadata.theme.variables.hexCode
      this.theme = data.metadata.theme.name
      this.icon = data.metadata.theme.variables.icon
      this.items = [...data.items];
      this.loading = false;
      this.requestUpdate();
      console.log(data)
    });
  }


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(project1.tag, project1);