const path=require('path')
const express=require('express')
const hbs=require('hbs')
const publicdirectorypath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const geocode=require('../src/utils/geocode')
const forecast=require('../src/utils/forecast')

const app=express()

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Nishant Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Nishant Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Nishant Kumar'
    })
})

app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
        return res.send({
            error:'Location is imp'
        })
    }
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                latitude,
                longitude,
                location,
                forecast:forecastdata
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error Page',
        message:'This help page is not found',
        name:'Nishant Kumar'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error Page',
        message:'404 Page',
        name:'Nishant Kumar'
    })
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})