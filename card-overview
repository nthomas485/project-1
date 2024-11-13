import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `card-overview`
 * 
 * @demo index.html
 * @element card-overview
 */
export class cardOverview extends DDDSuper(I18NMixin(LitElement)) {
  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.owner = "";
    this.slug = "";
    this.description = "";
    this.lastUpdated = "";
    this.image = '';
    this.created = '';
  }

  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      lastUpdated: { type: String },
      description: { type: String },
      content: { type: String },
      slug: { type: String },
      image: { type: String },
      created: { type: String },
    };
  }

  static get styles() {
    return [css`

        .wrapper{
          height: 100%;
          width: 100%;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          max-width: 312px;
          border:var(--ddd-border-lg);
          border-radius: var(--ddd-radius-xl);
          padding: var(--ddd-spacing-2); 
          text-decoration: none;
          //box-sizing: border-box; 
        }
        .image {
        display: inline-block;
        }
    
        .image div {
        max-width: 200px;
        font-size: 16px;
        font-weight: bold;
        }
    
        .image img {
        display: block;
        width: 240px;
        height: 240px;
        }
        .secondaryCreator{
        display: inline-block;
      }
      a{
        text-decoration: none;
      }
      a:hover{
        text-decoration: none;
        color: fuchsia;
      }
      a:visited{
        text-decoration: none;
      a:active{
        text-decoration: none;
        color: black;
      }
    }
    
        `];
  }

  render() {
    return html`
        <div class="wrapper">
         <img class="image" src="${this.url}/${this.logo}" alt="${this.title}"> 
            <a href="${this.slug}" target="_blank">${this.title} </a>
            <div id="update"> ${this.lastUpdated}</div> 
            <div id="description">${this.description}</div>
            <!-- <a id="slug" href="${this.slug}" target="_blank"> slug</a> --> 
            <a id="source" href="${this.source}" target="_blank"> open source</a>
            <div id="create"> ${this.created}</div>
        </div> 
    
        `;
  }
  static get tag() {
    return "card-overview";
  }
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(cardOverview.tag, cardOverview);
