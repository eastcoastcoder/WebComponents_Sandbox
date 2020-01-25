import {
  useState,
  html,
  component
} from "https://unpkg.com/haunted/haunted.js";
import "../Components/Name.js";

function Goals() {
  const [name, setName] = useState("");

  return html`
    <h2>User Page</h2>
    <mwc-button id="myButton" label="Click Me!" raised></mwc-button>

    <h3>${name}</h3>

    <p>Change name:</p>
    <full-name @change="${ev => setName(ev.detail)}"> </full-name>
  `;
}

customElements.define("my-goals", component(Goals));
