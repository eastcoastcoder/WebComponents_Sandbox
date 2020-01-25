// import styles from './style.css';
import {
  useState,
  html,
  component
} from "https://unpkg.com/haunted/haunted.js?module";

// Dependencies
import "https://unpkg.com/@material/mwc-button/mwc-button.js?module";
import "https://unpkg.com/@material/mwc-tab-bar/mwc-tab-bar.js?module";
import "https://unpkg.com/@material/mwc-top-app-bar-fixed/mwc-top-app-bar-fixed.js?module";

// Psudeo-Routes
import "./Components/Name.js";
import "./Pages/Goals.js";
import "./Pages/Bio.js";

function App() {
  const [page, setPage] = useState(0);

  // Naive function to avoid using a router
  const renderPage = () => {
    switch(page) {
        case 0:
          return html`<my-bio></my-bio>`
        case 1:
          return html`<my-goals></my-goals>`
        case 2:
          return;
        case 3:
           return;
      default:
        return;
    }
  }

  return html`
    <link rel="stylesheet" href="./src/style.css">
    <mwc-top-app-bar-fixed id="bar">
      <mwc-tab-bar slot="actionItems">
        <mwc-tab @click=${e => setPage(0)} label="bio"></mwc-tab>
        <mwc-tab @click=${e => setPage(1)} label="goals"></mwc-tab>
        <mwc-tab @click=${e => setPage(2)} label="projects"></mwc-tab>
        <mwc-tab @click=${e => setPage(3)} label="contact"></mwc-tab>
      </mwc-tab-bar>
    </mwc-top-app-bar-fixed>
    ${renderPage()}
  `;
}

customElements.define("my-app", component(App));
