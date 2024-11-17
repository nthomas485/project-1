import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `page-card`
 * 
 * @demo index.html
 * @element page-card
 */
export class pageCard extends DDDSuper(I18NMixin(LitElement)) {
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
      image: { type: String },
      created: { type: String },
      url: { type: String },
    };
  }

  static get styles() {
    return [css`

        .wrapper{
          height: 100%;
          width: 100%;
          display: inline-flex;
          flex-direction: column;
          margin-left: 10px;
          margin-top: 10px;
          gap: 16px;
          align-items: center;
          max-width: 312px;
          border:var(--ddd-border-sm);
          border-radius: var(--ddd-radius-m);
          padding: var(--ddd-spacing-3); 
          text-decoration: none;
          background-color: var(--ddd-theme-default-gradient-footer);
          cursor: pointer;
          height: 494px;
          overflow: hidden;
          //box-sizing: border-box; 
        }

        .wrapper:hover{
          transform: translateY(-30px);
          box-shadow: 0px 5px 15px;

        }
        .image {
        display: inline-block;
        height: 100%;
        width: 100%;
        }

        .title {
          font-size: 30px;
        }
        .secondaryCreator{
        display: inline-block;
      }
      a{
        text-decoration: none;
        color: var(--ddd-theme-default-skyBlue);
      }
      a:hover{
        text-decoration: none;
        color: var(--ddd-theme-default-athertonViolet);
      }
      /* a::after {
        content: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==';
      } */
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
    <!-- <a href="${this.slug}" target="_blank"> </a> -->
        <div class="wrapper" @click="${()=> window.open(this.slug, '_blank')}" >
            <a class="title" href="${this.slug}" target="_blank">${this.title} </a>
            ${this.image ? html`
          <img class="image" src="${this.url}/${this.image}" alt="${this.title}"> `
        : ""
      } 
            <div id="update"> ${this.lastUpdated}</div> 
            <div id="description">${this.description}</div>
            <!-- <a id="slug" href="${this.slug}" target="_blank"> slug</a> --> 
             <div ?hidden="${this.source === ''}">
             <a class="source" href="${this.source}" @click="${e => e.stopPropagation()}" target="_blank"> open source</a>
             </div>
            <div id="create"> ${this.created}</div>
        </div> 
    
        `;
        
  }
  static get tag() {
    return "page-card";
  }
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(pageCard.tag, pageCard);

