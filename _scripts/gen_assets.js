import {$} from "bun"

let assets = await $`ls ../assets/gauntlets/`.text()
assets = assets.split('\n')
assets.forEach(async (a)=>{
    let name = a.split(".")
    await $`echo "import ${name[0].charAt(0).toUpperCase()+name[0].slice(1)} from './${a}'" >> ../assets/gauntlets/index.js`
})