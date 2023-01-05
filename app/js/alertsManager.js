const cpuWarningInput = document.getElementById('cpu-warning')
const cpuOverloadInput = document.getElementById('cpu-overload')
const cpuAlertFrequencyInput = document.getElementById('alert-frequency')
const saveButtonInput = document.getElementById('save-button')
const alertEnable = document.getElementById('alertEnable')

alertEnable.addEventListener('click', checkboxCliked)
ipcRenderer.on("app:init", checkboxCliked)
function checkboxCliked(){
    const checked = alertEnable.checked
    if(checked === false){
        cpuWarningInput.setAttribute('disabled', 'disabled')
        cpuOverloadInput.setAttribute('disabled', 'disabled')
        cpuAlertFrequencyInput.setAttribute('disabled', 'disabled')
        // saveButtonInput.setAttribute('disabled', 'disabled')
        // saveButtonInput.classList.add('noHover')
    }else{
        cpuWarningInput.removeAttribute('disabled')
        cpuOverloadInput.removeAttribute('disabled')
        cpuAlertFrequencyInput.removeAttribute('disabled')
        // saveButtonInput.removeAttribute('disabled')
        // saveButtonInput.classList.remove('noHover')
    }
}

document.getElementById('settings-form').addEventListener('submit', function(event){
    event.preventDefault()
    const checked = alertEnable.checked
    
    settings = {
        cpuWarning: parseInt(cpuWarningInput.value),
        cpuOverload: parseInt(cpuOverloadInput.value),
        alertFrequency: parseInt(cpuAlertFrequencyInput.value),
        enableAlerts: checked
    }
    ipcRenderer.send('settings:set', settings)
    updateConfigData(settings)
    showAlert('Settings Saved')

})

ipcRenderer.on('settings:get', (e, settings) =>{
    cpuWarningInput.value = settings.cpuWarning
    cpuOverloadInput.value = settings.cpuOverload
    cpuAlertFrequencyInput.value = settings.alertFrequency
    alertEnable.checked = settings.enableAlerts
})

function showAlert(msg){
    const alert = document.getElementById('alert')
    alert.classList.remove('hide')
    alert.classList.add('alert')

    alert.innerText = msg

    setTimeout(() =>{
        alert.classList.add('hide')
    }, 3000)
}