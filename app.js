var allLeads = []
const inputField = document.getElementById('url')
const savedInputBtn = document.getElementById('saveInput')
const savedTabBtn = document.getElementById('saveTab')
const form = document.querySelector('form')
const ulElem = document.getElementById('ulElem')
const deleteAllBtn = document.getElementById('deleteAll')
let leadsFromLocalStorage = JSON.parse(localStorage.getItem('leads-system')) 

function getSavedLeads(){
    console.log(leadsFromLocalStorage)
    if (leadsFromLocalStorage === null ) {
        leadsFromLocalStorage = [leadsFromLocalStorage]
    }
    allLeads = leadsFromLocalStorage
    console.log(allLeads)
    renderAllLeads(allLeads)
}
getSavedLeads()

savedInputBtn.addEventListener("click", function(){
    // e.preventDefault()

    if (inputField.value !== ''){
        allLeads.push(inputField.value)
        // localStorage.setItem('leads-system', JSON.stringify(allLeads))
        renderAllLeads(allLeads)
        inputField.value = ''
        inputField.focus()
        return
    }
    alert('input a valid url, you idiot')
} )

function renderAllLeads(leads){
    // getSavedLeads()
    localStorage.setItem('leads-system', JSON.stringify(leads))
    let listItems =''
    let emptyValue = 'No leads stored yet 🤔'
    // console.log(leads)
    if (leads[1] === null || leads[1] === undefined ) {
        ulElem.innerHTML = `<p style='text-align: center;'>
                                ${emptyValue}
                            </p>
            `
        return
    }


    for (let i = 1; i < leads.length; i++){
        listItems +=`<li>
                        <a target="_blank" href='${leads[i]}'>
                            ${leads[i]}
                        </a>
                        <button onClick='deleteSelectedLead(${i})' style="color: red; background: black; border: none;">
                            DEL
                        </button>
                    </li>` 
    }
    ulElem.innerHTML = listItems
}

deleteAllBtn.addEventListener("dblclick", function deleteAllLeads(){
    localStorage.setItem('leads-system', '')
    getSavedLeads()
})

function deleteSelectedLead(leadIndex){
    console.log('lead index passed ', leadIndex)
    console.log(allLeads)
    const newLeads = allLeads.filter((lead)=>  allLeads.indexOf(lead) !== leadIndex)
    console.log(newLeads)
    allLeads = newLeads
    renderAllLeads(allLeads)
}



savedTabBtn.addEventListener("click", function(){
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        function(tabs){
            let activeTabUrl = tabs[0].url

            // check if the url already exists in the array 
            for (let i = 0; i < allLeads.length; i++ ){
                if(allLeads[i] === activeTabUrl){
                    return alert('this lead url already exists!')
                }
            }
            allLeads.push(activeTabUrl)
            renderAllLeads(allLeads)
        }
    )
    
})