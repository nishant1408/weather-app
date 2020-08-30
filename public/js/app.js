const weatherForm=document.querySelector('form')
const url="http://localhost:3000"
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    document.querySelector('#error').innerHTML='Loading...'
    document.querySelector('#location').innerHTML=''
    document.querySelector('#forecast').innerHTML=''
    const address=document.querySelector('#address').value
    fetch(url+'/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                document.querySelector('#error').innerHTML=data.error
            }else{
                document.querySelector('#error').innerHTML=''
                document.querySelector('#location').innerHTML=data.location
                document.querySelector('#forecast').innerHTML=data.forecast
            }
        })
    })
})