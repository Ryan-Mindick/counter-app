/**
 * Copyright 2025 Ryan-Mindick
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0

    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true},
      min: { type: Number, reflect: true},
      max: { type: Number, reflect: true },
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
      
      :host([count="18"]) {
        color: var(--ddd-theme-default-futureLime)
      }

      :host([count="21"]) {
        color: var(--ddd-theme-default-futureLime)
      }
      
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .counter {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-xxl));
      }
    `];
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties.has("count")) {
      console.log("count changed to: ", this.count);
      if (this.count === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  // Lit render the HTML
  render() {
    return html`
      <confetti-container id="confetti">
      <div class="counter">${this.count}</div>
      <div class="buttons">
        <button @click="${this.decrease}" ?disabled="${this.min === this.count}">-1</button>
        <button @click="${this.reset}">Reset</button>
        <button @click="${this.increase}" ?disabled="${this.max === this.count}">+1</button>
      </div>
    </confetti-container>
    `;
  }

  increase() {
    this.count++;
  }

  decrease() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);