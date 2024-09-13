const colorsElArr = document.getElementsByClassName('color');
const seedColorEl = document.getElementById('seedColor');
const getColorSchemeBtn = document.getElementById('getColorSchemeBtn');
const colorSchemeSelect = document.getElementById('colorScheme');
const colorsEl = document.getElementById('colors');

// displays colors on load
fetchColors('7a3679', 'monochrome');

// displays color after get color scheme button click
getColorSchemeBtn.addEventListener('click', function(){
    const seedColorHexCode = (seedColorEl.value).substring(1);
    const colorScheme = colorSchemeSelect.value;
    fetchColors(seedColorHexCode, colorScheme);
});

// copies hex code of selected color on double click
colorsEl.addEventListener('dblclick', function(event){
    const copiedTextModal = document.getElementById('copiedTextModal');
    if (event.target.dataset.color) {
        navigator.clipboard.writeText(event.target.dataset.color)
            .then(() => renderModal('Success!', `You just copied ${event.target.dataset.color} to your clipboard!`))
            .catch(error => renderModal('Error!', error));
    }
})

// renders the modal with specified title and text
function renderModal(title, text) {
    document.getElementById('modalHeader').textContent = title;
    document.getElementById('modalText').textContent = text
    copiedTextModal.style.display = 'grid';
    setTimeout(function(){
        copiedTextModal.style.display = 'none';
    }, 2500);
}

// renders an array of colors with a chosen seed color and color scheme
function fetchColors(seedColorHexCode, colorScheme) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColorHexCode}&mode=${colorScheme}&count=6`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => renderColors(data.colors))
}

// displays the rendered colors in the main content
function renderColors(colorsArr) {
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