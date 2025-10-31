Vite-Forge ⚡
A fast CLI tool for generating React + Tailwind + Vite projects.
Vite-Forge is a lightweight command-line tool that instantly scaffolds a React + TailwindCSS project using Vite. It handles all setup automatically — no manual configuration required.

✅ Features


Creates a clean Vite + React project


Installs and configures:


react


react-dom


tailwindcss


@tailwindcss/vite




Auto-generates:


vite.config.js (Tailwind plugin included)


src/index.css (with Tailwind import)


src/App.jsx (customizable text)




Cleans up default Vite boilerplate


Zero configuration needed



📦 Installation
Install globally:
npm install -g vite-forge


🚀 Usage
Create a new project
vite-forge myproject

Create a project with custom text inside App.jsx
vite-forge myproject "Hello world, this is Alex!"

Start the dev server
cd myproject
npm run dev


🗂️ Output Structure
myproject/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── ...
├── vite.config.js
├── package.json
└── ...


⚙️ How It Works
Under the hood, Vite-Forge performs the following steps:


Runs npm create vite@latest <projectName>


Installs React + Tailwind dependencies


Injects Tailwind plugin into vite.config.js


Creates a Tailwind-powered index.css


Clears default styles


Writes a new App.jsx using your custom message



📌 Arguments
ArgumentDescriptionprojectNameThe name of the project foldercustomTextText to display inside the React app
Example:
vite-forge portfolio "Welcome to my portfolio"


❗ Error Handling
If something goes wrong (missing directory, failed install, etc), Vite-Forge prints detailed error logs and exits gracefully.

✅ Requirements


Node.js 16+


npm



📄 License
MIT License
