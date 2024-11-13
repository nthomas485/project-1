/**
 * Copyright 2024 nthomas485
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./page-card.js"

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
    this.theme = "";
    this.created = "";
    this.lastUpdated = "";
    this.items = [];
    this.url = "";
    this.isValid = false;
    this.loading = false;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      name: { type: String },
      description: { type: String },
      logo: { type: String },
      theme: { type: String },
      created: { type: String },
      lastUpdate: { type: String },
      items: { type: Array },
      loading: { type: Boolean, reflect: true},
      url: { type: String, attribute: 'json-url' },
      isValid: { type: Boolean, reflect: true},
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
      }
      input {
        font-size: var(--ddd-font-size-20px, 20px);
        line-height: var(--ddd-lh-40, 40px);
        width: 100%;
      }
      button{
        display: inline-block;
        font-size: var(--ddd-font-size-20px, 20px);
        width: 100%;
      }
      button:hover{
        color: fuchsia;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3>${this.title}</h3>
  <details open>
      <summary>Enter Site URL</summary>
      <div class="inputs">
        <input type="text" id="text-box" placeholder="https://haxtheweb.org" @input="${this.inputChanged}" @keydown="${(e) => {if(e.key === 'Enter'){this.updateResults();}}}"/>
        <button title="Analyze" id="analyze" @click="${this.updateResults}">Analyze</button>
      </div>
    </details>
    <div class="output">
      ${this.items.map((item, index) => {
        const img = item.metadata && item.metadata.files && item.metadata.files[0] ? `https://haxtheweb.org/${item.metadata.files.url}` : '';
        return html`
          <page-card
          title="${item.title}"
          logo= "${img}"
          lastUpdated="Updated: ${this.dated(item.metadata.updated)}"
          description="${item.description}"
          slug="https://haxtheweb.org/${item.slug}"
          source="https://haxtheweb.org/${item.location}"
          created= "created: ${this.dated(item.metadata.created)}"
          ></page-card>
        `})}
    </div> 
    <div class="overview">
      
    </div>
</div>`;
  }

  dated(value){
    var date = new Date(value * 1000);
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

    hasImage(item) {
      let image = item.metadata.images;
      if (image) {
        if(image.length > 0) {
          return (this.url + image[0])
        }
      } else {
        return '';
      }
    }
  updated(changedProperties) {

    // see if value changes from user input and is not empty
    if (changedProperties.has('value')) {
      this.updateResults(this.value);
    } else if (changedProperties.has('value') && !this.value) {
      this.items = []
    }
    if (changedProperties.has('items') && this.items.length > 0 ) {
      console.log(this.items);
    }

  }
  updateResults(value) {
    //const json =  `${this.url}site.json`;
    this.value = this.shadowRoot.querySelector('#text-box').value;
    this.loading = true;
    if (!this.value.startsWith('https://') && (!this.value.endsWith('/site.json'))) {
      this.value = 'https://'+this.value+'/site.json'
    } else if (!this.value.startsWith('https://')){
      this.value = 'https://'+this.value
    } else if (!this.value.endsWith('/site.json')){
      this.value += '/site.json'
    }
    fetch(this.value).then(response => response.ok ? response.json() : {}).then(data => {//fetch(this.value).then(d => d.ok ? d.json() : {}).then(data => {

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