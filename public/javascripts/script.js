
const convertBtn = document.querySelector('#convert');
const inputEle = document.querySelector('#input_temp');
const convertedEle = document.querySelector('#converted');

convertBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let temp = inputEle.value;
    
    if(!temp.match(/\d+.?\d*[cfCF]$/g)){
        convertedEle.innerText = 'Invalid input. Valid example: 45c, 50f';
    } else {
        let isCToF = null;
        if(temp.charAt(temp.length-1).toLowerCase() === 'c') {
            isCToF = true;    
        } else {
            isCToF = false;
        }
        temp = parseFloat(temp.slice(0,-1));
        console.log(temp);

        fetch('/', {
            method: "POST",
            body:JSON.stringify({'temp':temp, 'isCToF':isCToF}),
            headers:{"Content-Type":"application/json"}
        })
        .then(response => {
            if (response.ok) { return response.json()}})
        .then(value => {
            const convertedTemp = value['temp'];
            
            if(isCToF) {
                convertedEle.innerText = convertedTemp +'f';
            } else {
                convertedEle.innerText = convertedTemp +'c';
            }
        });
    }
    
});

    
