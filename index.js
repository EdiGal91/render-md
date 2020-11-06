const fs = require('fs')
const util = require('util')
const express = require('express')
const marked = require('marked')

const readFileAsync = util.promisify(fs.readFile)

const app = express()

app.engine('md', async (filePath, options, callback) => {
  try {
    const content = (await readFileAsync(filePath))
                          .toString()
                          .replace('{title}', options.title)
    const rendered = marked(content)
    callback(null, rendered)
  } catch(err) {
    callback(err)
  }
})

app.set('views', 'views')
app.set('view engine', 'md')

app.get('/', (req, res) => res.render('index', { title: req.query.title || 'Default Title' }))

app.listen(3050, () => { console.log('Server runnning on port 3050'); })

