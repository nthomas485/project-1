import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `page-card`
 * 
 * @demo index.html
 * @element page-card
 */
export class page-card extends DDDSuper(I18NMixin(LitElement)) {
    constructor() {
        super();
        this.title = '';
        this.source = '';
        this.owner = "";
      }
    
      static get properties() {
        return {
            source: { type: String },
            title: { type: String },
            owner: { type: String },
        };
      }
    
      static get styles() {
        return [css`
        
    
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
        <a class="image" href="${this.source}" target="_blank">
        <img src="${this.source}" alt="${this.title}"/>
            <div>${this.title}</div>
            <div id="secondaryCreator">${this.owner}</div>
      </a>
        `;
      }
      static get tag() {
        return "page-card";
      }
    }
