const contents = document.querySelectorAll('.content')
const listItems = document.querySelectorAll('nav ul li')

listItems.forEach((item, index) =>{
    item.addEventListener('click', ()=>{
        hideAllContents()
        hideAllitems()

        // activate list item
        item.classList.add('active')
        item.classList.add('noHover')
        
        // display content
        contents[index].classList.add('show')
        contents[index].classList.remove('hide')
    })
})

function hideAllContents(){
    contents.forEach((content) =>{
        content.classList.remove('show')  
        content.classList.add('hide')
    })
}

function hideAllitems(){
    listItems.forEach((item) => {
        item.classList.remove('active')
        item.classList.remove('noHover')
    })
}

ipcRenderer.on('nav:toggle', ()=>{
    document.getElementById('nav').classList.toggle('hide')
})