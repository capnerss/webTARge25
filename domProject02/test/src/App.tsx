
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

import './App.css'

function App() {

  //naitab koike DOMi elemente, mis on lehel olemas. See on nagu veebilehe struktuuri kaart, mis naitab koiki elemente ja nende suhteid uksteisega. See voib olla kasulik, kui
  //soovite moista, kuidas leht on ules ehitatud ja kuidas
  //erinevad elemendid omavahel seotud on.
//console.log(document)
  //console.dir("h1");
  //document.title = "DOM-i pealkiri on muudetud"
 // document.body.style = 'background: red;';
//document.querySelector("h1").textContent= "TTTT"
const username: string = "See ei ole DOM"
  return (
    <>
      <section id="center">
        <h1 id="dom-Title">
          {username === "" ? "Mis on DOM!" : username}</h1>
        <p>DOM  on document object model.
        On voimlik teha staatiline leht dunamiliseks. JS/TS on voimalik manipulererida DOM-i, millega saab muuta sisu, struktuuri ja vaadet
          <br/>
          <br/>
          Kui vaadate index.html, siis naeite erinevaid elemente,
          mis suhtlevad DOM-iga. Naiteks div id="root" /div on koht,
          kuhu React rakendus renderdatakse. Kui React rakendus kaivitub,
          siis see loob DOM-i elemendid ja renderdab need #root divi sisse,
          voimaldades teil naha ja suhelda nende elementidega veebilehel.
          <br/>
          <br/>
          Nt, html sees on head ja title. Body sees on h1, p, a jne.
        </p>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
