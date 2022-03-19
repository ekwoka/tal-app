const { Liquid } = require('liquidjs');
const data = require('./liquid/objects/index');
const fs = require('fs');
const engine = new Liquid({
    extname: '.liquid',
    root: 'build/liquid/pages',
    layouts: 'build/liquid/layouts',
    partials: ['build/liquid/snippets','build/liquid/icons']
})

fs.mkdirSync('src/assets', { recursive: true })

fs.readdir('build/liquid/pages',async(err,files)=>{
    if(!files) return console.log('No Liquid Files Found')
    console.time('Liquid Rendered')
    let pipes = files.map(f => {
        f = f.replace('.liquid', '');
        const output = fs.createWriteStream(`src/${f}.html`);
        return engine.renderFileToNodeStream(f,data[f]||{}).then(stream => stream.pipe(output))
    })
    await Promise.all(pipes)
    console.timeEnd('Liquid Rendered')
})
