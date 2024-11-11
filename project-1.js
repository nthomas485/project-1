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
    this.url = "https://haxtheweb.org/site.json"
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
        <input type="text" id="text-box" placeholder="Enter a .json site"/>
        <button title="Analyze" id="analyze" @click="${this.updateResults}">Analyze</button>
      </div>
    </details>
    <div class="output">
      ${this.items.map((item, index) => html`
        <page-card
        title="${item.title}"
        logo="https://haxtheweb.org/${item.metadata.images[0]}"
        lastUpdated="Updated: ${this.dated(item.metadata.updated)}"
        description="${item.description}"
        slug="https://haxtheweb.org/${item.slug}"
        source="https://haxtheweb.org/${item.location}"
        created= "created: ${this.dated(item.metadata.created)}"
        ></page-card>
        `)}
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

  updated(changedProperties) {

    // see if value changes from user input and is not empty

  }
  updateResults(value) {
    this.value = this.shadowRoot.querySelector('#text-box').value;
    this.loading = true;
    fetch(this.value).then(d => d.ok ? d.json() : {}).then(data => {

      this.items = data.items;
      this.loading = false;
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