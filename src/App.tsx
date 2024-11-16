import {useState} from "react";
import reactLogo from "./assets/react.svg";
import {invoke} from "@tauri-apps/api/core";
import {confirm as C} from '@tauri-apps/plugin-dialog';
import isTauri from './isTauri'
import "./App.css"

function App() {
    const [greetMsg, setGreetMsg] = useState("")
    const [name, setName] = useState("")

  async function greet() {
      setGreetMsg(isTauri ? await invoke("greet", {name}) : "Hello! You've been greeted from JS!, " + name)
  }

    async function dialog() {
        let confirmation: boolean
        if (isTauri) {
            confirmation = await C(
                'This action cannot be reverted. Are you sure?',
                {title: 'Tauri', kind: 'warning'}
            )
        } else {
            confirmation = confirm(
                'This action cannot be reverted. Are you sure?'
            )
        }
        console.log(confirmation);
    }


  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
            e.preventDefault()
            greet()
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
        <button type={"button"} onClick={dialog}>Show msg</button>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
