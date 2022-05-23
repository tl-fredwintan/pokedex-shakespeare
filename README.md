<div id="header" align="center">
   <img src="https://fredwin.s3.eu-west-2.amazonaws.com/pokemon-logo.svg" width="300"/> 
</div>
<div id="intro">
   <h1>
      📖Introduction
   </h1>
   <p>
      Pokémon meet Shakespeare, a simple web translation app. Search for your favourite Pokémon and be greeted with a English Shakespeare style description of your chosen Pokémon.
   </p>
</div>
<div id="intro">
   <h4>🛠️ Built using</h4>
   <img src="https://cdn.worldvectorlogo.com/logos/vitejs.svg" title="ViteJS" alt="Vite" width="40" height="40"/>&nbsp;
   <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
   <img src="https://styled-components.com/logo.png" title="styled-components" alt="styled-components" width="40" height="40"/>&nbsp;
   <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
   <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
   <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/framer_logo_icon_169149.png" title="Framer" alt="Framer" width="40" height="40"/>&nbsp;
   
</div>

<div>
   <br />
   <h4>⛈️ Lighthouse report </h4>
   <img src="https://fredwin.s3.eu-west-2.amazonaws.com/lighthouse-removebg-preview.png" title="Lighthousw" alt="Lighthouse"/>
</div>

<br />
<div id="prerequisites">
   <h1> ✍️ Prerequisites</h1>
   <p>In order to run this app in your local machine you will need to have the following installed. Docker is optional</p>
   <table>
      <tr>
         <th><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" href="https://nodejs.org/en/" title="NodeJS" alt="NodeJS" width="40" height="40"/></th>
         <th><img href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" title="npm" alt="npm" width="40" height="40"/></th>
         <th><img href="https://docs.docker.com/get-docker/" src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original.svg" title="Docker" alt="Docker" width="40" height="40"/></th>
         <th><img href="https://git-scm.com/" src="https://github.com/devicons/devicon/blob/master/icons/git/git-original.svg" title="Git" alt="Git" width="40" height="40"/></th>
      </tr>
      <tr>
         <td>✔️</td>
         <td>✔️</td>
         <td>〰️</td>
         <td>✔️</td>
      </tr>
   </table>
</div>
<br />
<div id="project">
   <h1> 📂 Project Structure </h1>
</div>

```
pokedex
├── server
|   ├── __test__                 # all Jest test cases
|   ├── api                      # api endpoint 
|   |   ├── controllers          # route controllers
|   |   ├── middlewares          # middleware helpers for caching and error logs
|   |   ├── routes               # /pokemon routes
|   |   ├── services             # external API request to PokeAPI and Funtransaltion
|   |   └── utils                # utality used within server
|   ├── config                   # configuration of external library tools winston, morgan and express
|   ├── log                      # output log collection
|   └── 
└── client
    ├── cypress                  # Cypress frontend test
    └── src
        ├── components           # different atom sized components
        ├── styles               # reusable styled-component styles
        └── views                # pages
```

<div id="spec">
   <h1> 🔄 API Specification</h1>
   Signature: GET endpoint: /pokemon/{pokemon-name}/
   
   Example: http://localhost:8080/pokemon/charizard/
   
   Output:
</div>

```
{
    "id": 6,
    "name": "charizard",
    "type": [
        {
            "slot": 1,
            "type": {
                "name": "fire",
                "url": "https://pokeapi.co/api/v2/type/10/"
            }
        },
        {
            "slot": 2,
            "type": {
                "name": "flying",
                "url": "https://pokeapi.co/api/v2/type/3/"
            }
        }
    ],
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    "description": "At which hour this pokémon expels a fie of superhot fire,  
                   the red flame at the tip of its tail burns moo intensely.",
    "translated": true
}
```

<div id="Usage">
   <h1>⚡ Usage</h1>
   <p>This will cover how to run the project locally. To begin simply clone or download the repository</p>
   <table>
      <tr>
         <th>App</th>
         <th>Ports</th>
      </tr>
      <tr>
         <td>Client</td>
         <td>http://localhost:3000</td>
      </tr>
      <tr>
         <td>Server</td>
         <td>http://localhost:8080</td>
      </tr>
   </table>
   <h2>🔌 Run in your local machine</h2>
</div>

```
git clone https://github.com/tl-fredwintan/pokedex-shakespeare.git
```

<div>
   <p>Navigate to both client & server root folder to run</p>
</div>

```
npm install
```

<div>
   <p>Once dependancies have been installed. To boot up both client and server application, go to '/client' folder and run. <b>NOTE: If you have not yet installed nodemon globally you would need to do so. 'npm install -g nodemon'</b></p>
</div>

```
npm run dev
```

<div id="Docker">
   <h2> 🐳 Create Docker images</h2>
   <p>At the root folder of this project should contain docker-compose.yml file. This will spin up two image containers called pokedex_client & pokedex_server. Each container are seperate with their own Dockerfile and but the front-end is dependant on the server. Run the command:</p>
</div>

```
docker-compose up
```

<div id="Docker">
   <h2> 🧪 Testing</h2>
   <p>Using the library <a href="https://jestjs.io/">Jest</a> & <a href="https://www.cypress.io/">Cypress</a> to conduct project testing</p>
</div>
<div>
   <h3>Client</h3>
   <h4>Using: Cypress</h4>
   <p>An end-to-end testing of each component and expected page renders. By executing the command this will run both client & server app and open Cypress window</p>
</div>

```
npm run test
```

<div>
   <h3>Server</h3>
   <h4>Using: Jest</h4>
   <p>All test are located within __test__ folder. This test covers all methods that retrieve all the data and compared with expected results.</p>
</div>

```
npm run test
```

<div id="external">
   <h1> 🌍 External API</h1>
   
   - <a href="https://pokeapi.co/">PokeAPI</a>
   
   - <a href="https://funtranslations.com/api/shakespeare">Funtranslations</a>
</div>
