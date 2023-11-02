let fromText = document.querySelector('.from-text');
let toText = document.querySelector('.to-text');
let exchangeIcon = document.querySelector('.change');
let selectTag = document.querySelectorAll('select');
let fromVoice = document.querySelector('.from');
let toVoice = document.querySelector('.to');
let copy = document.querySelector('.copy');
let countValue = document.querySelector('.count');

selectTag.forEach((get, con) =>{
    for (let country_code in language) {
        let selected;
        if(con == 0 && country_code == "en-GB"){ 
            selected = "selected";} 
        else if (con == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>
        ${language[country_code]}</option>`;
        // console.log(option);
        get.insertAdjacentHTML("beforeend",option);
}});

fromText.addEventListener('input', () => {
    let content = fromText.value;
    fromContent = selectTag[0].value;
    transContent = selectTag[1].value;

    let transLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;
    fetch(transLink).then(translate => translate.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
    })
});

exchangeIcon.addEventListener('click',() => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

fromVoice.addEventListener('click', function() {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = selectTag[0].value;
    speechSynthesis.speak(fromTalk);

});

toVoice.addEventListener('click', function() {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(toText.value);
    fromTalk.lang = selectTag[1].value;
    speechSynthesis.speak(fromTalk);
});

copy.addEventListener('click', function(){
    navigator.clipboard.writeText(toText.value)
})

fromText.addEventListener('keyup', () =>{
    countValue.innerHTML = `${fromText.value.length}/5,000`;
});