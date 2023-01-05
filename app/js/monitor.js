const { ipcRenderer } = require("electron")
const path = require('path')
const osu = require('node-os-utils')
const cpu = osu.cpu
const mem = osu.mem
const os  = osu.os


let cpuOverload
let cpuWarningLoad
let alertFrequency

localStorage.removeItem('lastNotify')

ipcRenderer.on('settings:get', (e, settings) => {updateConfigData(settings)})

function updateConfigData(settings){
    cpuWarningLoad = +settings.cpuWarning
    cpuOverload = +settings.cpuOverload
    alertFrequency = +settings.alertFrequency
}

// Run every 2 seconds
setInterval(() => {
    // CPU Usage
    cpu.usage().then((info) =>{
        document.getElementById('cpu-usage').innerText = info.toFixed(2) + "%"
        document.getElementById('cpu-progress').style.width = parseInt(info).toString() + "%"
        
        if(info < cpuWarningLoad){
            document.getElementById('cpu-progress').style.background = '#30c88b';
        }else{
            if(info < cpuOverload){
                document.getElementById('cpu-progress').style.background = '#EEEE00';
            }else{
                document.getElementById('cpu-progress').style.background = '#CC0000';
            }
        }

        //check overload
        if(info >= cpuOverload && runNotify(alertFrequency)){
            notifyUser({
                title: "CPU Overload",
                body: `CPU is over ${cpuOverload}%`,
                icon: path.join(__dirname,'img','icon.png'),
            })
            localStorage.setItem('lastNotify', +new Date())
            // console.log("Notified " + new Date(parseInt(localStorage.getItem('lastNotify'))))
        }
    })
    //CPU Free
    cpu.free().then((info) =>{
        document.getElementById('cpu-free').innerText = info.toFixed(2) + "%"
    })
    // Uptime
    document.getElementById("sys-uptime").innerText = convertSecondsToTime(os.uptime())

}, 2000);

// Set model
document.getElementById('cpu-model').innerText = cpu.model()

// Computer Name
document.getElementById('comp-name').innerText = os.hostname()

// OS
document.getElementById('os').innerText = os.type() + " " + os.arch()

// System Memory
mem.info().then((info) =>{
    document.getElementById('mem-total').innerText = Math.ceil(info.totalMemMb/1024) + " GB"
})

//Show days, hours, min and sec
function convertSecondsToTime(seconds){
    seconds = +seconds
    const days = parseInt(seconds/(24*60*60))
    const hours = parseInt((seconds % (24*60*60))/(60*60))
    const minuts = parseInt((seconds % (60*60))/(60))
    const sec = parseInt((seconds % (60)))

    return days + "d " + hours + "h " + minuts + "m " + sec + "s"
}

// Send notification
function notifyUser(options){
    new Notification(options.title, options)
}

//Ceck how much time has passsed since notification
function runNotify(frequency){
    if(localStorage.getItem('lastNotify') === null){
        //Store timestamp
        localStorage.setItem('lastNotify', +new Date())
        if(document.getElementById('alertEnable').checked === true){
            return true;
        }else{
            return false;
        }
    }
    const notifyTime = new Date(parseInt(localStorage.getItem('lastNotify')))
    const now = new Date()
    const difTime = Math.abs(now - notifyTime)
    const minutesPassed = Math.ceil(difTime / (60 * 1000))
    if(minutesPassed > frequency){
        if(document.getElementById('alertEnable').checked === true){
            return true;
        }else{
            return false;
        }
    }

}