<h1>About</h1>

<h3 style="color:white">Performer: <span style="color:#ccc">Nguyễn Đức Toàn</span></h3>
<h3 style="color:white">Topic: <span style="color:#ccc">Build a website like Pinterest <a href="https://pinterest.com">(www.pinterest.com)</a></span></h3>
<h3 style="color:white">Requirement:</h3>
<ul>
  <li>Connect to metamask.</li>
  <li>Convert image link to NFT under existing contract.</li>
  <li>The profile page can show the NFTs that the user has created.</li>
  <li>Home page showing images from NFT contract.</li>
  <li>UI/UX: refer to Pinterest's UI/UX.</li>
</ul>
<h3 style="color:white">Date: <span style="color:#ccc">05/06/2023 - 15/06/2023</span></h3>
<h3 style="color:white">Status: <span style="color:#d4edbc">Complete</span></h3>

<br>
<h1>Project</h1>

<h2 style="color:white">Pinterest Clone Project</h2>
<p style="text-align: justify">This project is a clone of Pinterest that allows users to connect with Metamask, convert image links into NFTs using a pre-existing contract, display user-created NFTs on their profile page, and display NFT images on the home page. The user interface and user experience are based on Pinterest.</p>

<h2 style="color:white">Directory Structure</h2>
<p>+ Project folder structure: <b>By kind</b></p>
<p>+ The project is divided into 2 parts: <b>Client uses Reactjs, Server uses NodeJS</b></p>

<h3 style="color:white">Client's folder:</h3>
<ul>
  <li>client\public: contains the file <b>index.html.</b></li>
  <li>client\src\components: contains React components.</li>
  <li>client\src\contracts: contains the Solidity smart contracts that define the rules and behaviors of the blockchain application.</li>
  <li>client\src\layouts: website layouts include Header.</li>
  <li>client\src\pages: the pagination of the website includes: Home page and Profile page.</li>
  <li>client\src\redux: manage redux of website, here is imageModal.</li>
  <li>client\src\sass: reset some properties in bootstrap and responsive.</li>
  <li>App.tsx: create website layouts and navigate the website's pages</li>
  <li>index.tsx: is responsible for rendering the top-level component of the application, typically the App component, to the DOM. It also sets up the Redux store.</li>
</ul>

<h3 style="color:white">Server's folder:</h3>
<ul>
  <li>server\json: contains JSON files including: tokenId, image link and image information.</li>
  <li>server\index.js: used to set up the server, define routes, and start listening for incoming requests.</li>
</ul>

<h2 style="color:white">Table of Contents</h2>
<ul>
  <li>Installation</li>
  <li>Usage</li>
  <li>Technologies Used</li>
  <li>Contributing</li>
  <li>License</li>
</ul>

<h2 style="color:white">Installation</h2>
<p style="color:white">To install and run the client and server, follow these steps:</p>
<ol>
  <li>Clone the repository:</li>
  <pre><code>https://github.com/tndTool/PinterestNFT.git</code></pre>

  <li>Install the dependencies for the client and server:</li>
  <pre><code>cd pinterest-clone/client
npm install
-------------------------
cd ../server
npm install</code></pre>

  <li>Start the client and server:</li>
    <pre><code>cd ../client
npm start
--------------------------
cd ../server
npm start</code></pre>

  <li>Open your web browser and go to <b>http://localhost:3000</b> to view the client.</li>
</ol>

<h2 style="color:white">Usage</h2>
<p style="color:white">To use the application, follow these steps:</p>
<ol>
  <li>Connect to Metamask by clicking the "Connect" button on the home page.</li>
  <li>Convert an image link to an NFT by clicking the "Create Pin" button on the home page and entering the image link.</li>
  <li>View your created NFTs on your profile page by clicking the "Profile" button on the navigation bar.</li>
  <li>View all NFTs on the home page.</li>
</ol>

<h2 style="color:white">Technologies Used</h2>
<p style="color:white">The following technologies were used to build this project:</p>
<ul>
  <li>ReactJS</li>
  <li>NodeJS</li>
  <li>Metamask</li>
  <li>Ethereum</li>
  <li>Solidity</li>
</ul>

<h2 style="color:white">Contributing</h2>
<p>Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.</p>

<h2 style="color:white">License</h2>
<p>This project is licensed under the <b>MIT License.</b></p>
