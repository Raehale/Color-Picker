const colorsElArr = document.getElementsByClassName('color');
const seedColorEl = document.getElementById('seedColor');
const getColorSchemeBtn = document.getElementById('getColorSchemeBtn');
const colorSchemeSelect = document.getElementById('colorScheme');
const colorsEl = document.getElementById('colors');

// displays colors on load
renderColorsArr('7a3679', 'monochrome');

// displays color after get color scheme button click
getColorSchemeBtn.addEventListener('click', function(){
    const seedColorHexCode = (seedColorEl.value).substring(1);
    const colorScheme = colorSchemeSelect.value;
    renderColorsArr(seedColorHexCode, colorScheme);
});

// copies hex code of selected color on double click
colorsEl.addEventListener('dblclick', function(event){
    const copiedTextModal = document.getElementById('copiedTextModal');
    if (event.target.dataset.color) {
        navigator.clipboard.writeText(event.target.dataset.color);
        // alert(`You just coppied ${event.target.dataset.color} to your clipboard!`)
        document.getElementById('modalText').innerHTML = `You just copied ${event.target.dataset.color} to your clipboard!`
        copiedTextModal.style.display = 'grid';
        setTimeout(function(){
            copiedTextModal.style.display = 'none';
        }, 2500);
    }
})

// renders an array of colors with a chosen seed color and color scheme
function renderColorsArr(seedColorHexCode, colorScheme) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColorHexCode}&mode=${colorScheme}&count=6`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => displayColors(data.colors))
}

// displays the rendered colors in the main content
function displayColors(colorsArr) {
    const displayedColors = colorsArr.map(function(color){
        return /*HTML*/ `
                <div class="color">
                    <div class="color-bar" style="background-color: ${color.hex.value}" data-color="${color.hex.value}"></div>
                    <div class="color-info">
                        <p class="color-hex-code" data-color="${color.hex.value}">${color.hex.value}</p>
                        <p class="color-name" data-color="${color.hex.value}">${color.name.value}</p>
                    </div>
                </div>
            `;
    });
    colorsEl.innerHTML = displayedColors.join('');
}