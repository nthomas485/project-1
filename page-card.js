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
          align-items: center;
          max-width: 312px;
          border:var(--ddd-border-lg);
          border-radius: var(--ddd-radius-xl);
          padding: var(--ddd-spacing-2); 
          text-decoration: none;
          background-color: var(--ddd-theme-default-creekTeal);
          cursor: pointer;
          min-height: 360px;
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
    
        /*.image img {
        display: block;
        width: 240px;
        height: 240px;
        }*/
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
      a::after {
        content: '('attr(href)')';
      }
    }
    
        `];
  }

  render() {
    return html`
    <!-- <a href="${this.slug}" target="_blank"> </a> -->
        <div class="wrapper" @click="${()=> window.open(this.slug, '_blank')}">
        ${this.image ? html`
          <img class="image" src="${this.url}/${this.image}" alt="${this.title}"> `
        : ""
      } 
            <a href="${this.slug}" target="_blank">${this.title} </a>
            <div id="update"> ${this.lastUpdated}</div> 
            <div id="description">${this.description}</div>
            <!-- <a id="slug" href="${this.slug}" target="_blank"> slug</a> --> 
             <div ?hidden="${this.source === ''}">
             <a id="source" href="${this.source}" target="_blank"> open source</a>
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

