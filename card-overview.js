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
    this.logo = '';
    this.created = '';
    this.hex = '';
    this.theme = '';
    this.icon = '';
    this.url = '';
  }

  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      lastUpdated: { type: String },
      description: { type: String },
      content: { type: String },
      slug: { type: String },
      logo: { type: String },
      created: { type: String },
      hex: { type: String },
      theme: { type: String },
      icon: { type: String },
      url: { type: String },
    };
  }

  static get styles() {
    return [css`

        .wrapper{
          width: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-left: -12px;
          align-items: center;
          //max-height: 360px;
          border:var(--ddd-border-lg);
          border-radius: var(--ddd-radius-m);
          padding: var(--ddd-spacing-2); 
          text-decoration: none;
          background-color: var(--site-hex-code, --ddd-theme-accent);
          margin-bottom: var(--ddd-spacing-2);
        }
         .logo {
        display: flex; /* Center logo content */
        justify-content: center;
        align-items: center;
        max-width: 560px; /* Match image size */
        max-height: 260px; /* Match image size */
        overflow: hidden; /* Ensure images don't overflow */
        } 
    
        .image div {
        max-width: 200px;
        font-size: 16px;
        font-weight: bold;
        }
    
        .logo img {
          width: 100%; /* Scale to fit container */
          height: auto; /* Maintain aspect ratio */
          object-fit: cover; /* Ensure consistent cropping */
        }
        .title{
          font-size: 35px;
          color: black;
        }
        .info{
          color: black;
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
    <div class="wrapper" style="--site-hex-code: ${this.hex}">

      <div class="logo" ?hidden="${this.logo === ''}">
        ${this.logo ? html`<img src="${this.url}/${this.logo}" alt=''>` : ''}
      </div>

      <div class="text"> 
        <div class="title" ?hidden="${this.title === ''}">
          ${this.title !== '' ? html`<a href="${this.title}" target="_blank"></a>` : " "} 
            <span class="icon" ?hidden="${this.icon === ''}">
              <simple-icon icon="${this.icon}"></simple-icon>
            </span> 
            ${this.title}
      </div>
    </div>

    <div ?hidden="${this.theme === ''}">
      <div class="info">
        <span class="label">Theme</span>
        <span>: ${this.theme}</span>
      </div>
    </div>

    <div ?hidden="${this.description === ''}">
      <div class="info">
        <span class="label">Description</span>
        <span>: ${this.description}</span>
      </div>
    </div>

    <div ?hidden="${this.created === ''}">
      <div class="info">
        <span class="label">Created</span>
        <span>: ${this.created}</span>
      </div>
    </div>

    <div ?hidden="${this.lastUpdated === ''}">
      <div class="info">
        <span class="label">Updated</span>
        <span>: ${this.lastUpdated}</span>
      </div>
    </div>

          </div>
        <!-- <div class="wrapper">
         <img class="image" src="${this.url}/${this.logo}" alt="${this.title}"> 
            <a href="${this.slug}" target="_blank">${this.title} </a>
            <div id="update"> ${this.lastUpdated}</div> 
            <div id="description">${this.description}</div>
             <a id="slug" href="${this.slug}" target="_blank"> slug</a> 
            <a id="source" href="${this.source}" target="_blank"> open source</a>
            <div id="create"> ${this.created}</div>
        </div> -->
    
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
