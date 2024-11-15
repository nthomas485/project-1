/**
 * Copyright 2024 nthomas485
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./page-card.js";
import "./card-overview.js";

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
    this.placeholder = "https://haxtheweb.org";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
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
      .dropdowns{
        text-align: center;
      }
      .search-inputs{
        text-align: center;
      }
      details{
        margin-left: 100px;
      }
      button{
        display: inline-block;
        font-size: var(--ddd-font-size-20px, 20px);
        width: 100%;
      }
      button:hover{
        color: fuchsia;
      }
      .card-output{ 
        background-color: var(--ddd-theme-default-limestoneGray);
      }
      .overview{
        text-align: center;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div class="drop-downs">
  <h3>${this.title}</h3>
  <details open>
      <summary>Enter Site URL</summary>
      <div class="search-inputs">
        <input type="text" id="text-box"  placeholder="${this.placeholder}" @input="${this.inputChanged}" />
        <button title="Analyze" id="analyze" @click="${this.updateResults}">Analyze</button>
      </div>
    </details>
    </div>
    <div class="overview">
      ${this.url}
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
   </div>
    <div class="card-output">
      ${this.items.map((item, index) => {
      return html`
          <page-card
          url="${this.url}"
          title="${item.title}"
          image="${item.metadata.images[0]}"
          lastUpdated="Updated: ${this.dated(item.metadata.updated)}"
          description="${item.description}"
          slug="${this.url}/${item.slug}"
          source="${this.url}/${item.location}"
          created="created: ${this.dated(item.metadata.created)}"
          ></page-card>
        `})}
    </div> 
</div>`;
  }

  dated(input) {
    var date = new Date(input * 1000);
    return (date.toUTCString());
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#analyze').value;
  }
  /*Valid(input) {
    if (!this.url.has('/site.json')) {
      this.url += '/site.json'
      this.isValid = true
    } 
  } */

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
      console.log("hi")
      this.value = `${this.value}/site.json`
    }
    if (!this.value.startsWith('https://')) {
      this.value = `https://${this.value}`
    }
    this.url = this.value.substring(0, this.value.indexOf("site.json"))
    console.log(this.url)
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