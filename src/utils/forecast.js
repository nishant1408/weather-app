const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=31d3861750e65c30418f23533eb022f3&query='+latitude+','+longitude
    request({url:url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to weather services',undefined)
    }else if(body.error){
        callback('Weather not found')
    }else{
        callback(undefined,'Current temperature is : '+body.current.temperature)
    }
})
}

module.exports=forecast