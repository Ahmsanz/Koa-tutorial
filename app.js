const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router')
const path = require('path'); 
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());


const router = new KoaRouter(); 

// body parser middleware


// fake db, hardcored data
const things = ['dogs', 'music', 'programming', 'Aikido', 'beer']

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

app.context.name = 'Adrián'

// Router middleware
app.use(router.routes()).use(router.allowedMethods());

router.get('/', index);
router.get('/add', showAdd)
router.post('/add', add);

// FUNCTIONS
// list of things
async function index(ctx){
    await ctx.render('index', {
        title: 'Things I love:',
        things
    });
}
// show add page
async function showAdd(ctx) {
    await ctx.render('add')
}

// add new thing to list
function add(ctx) {
    const body = ctx.request.body;
    console.log(body)
    things.push(body.thing);
    ctx.redirect('/');
}



router.get('/test', ctx => ctx.body = `Hello, ${ctx.name}`)


app.listen(3000, () => console.log('Server Started...'))