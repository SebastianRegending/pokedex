function loadPokemonCardsHTML(cardindex, firstTypeName, frontImage, name, typeNames, id, hp, attack, defense, specialAttack, specialDefense, speed) {
    return /*html*/ `
    <div id="${cardindex}" class="pokemoncard-style bg_${firstTypeName}" onclick="loadBigPokeCard('${cardindex}', '${firstTypeName}', '${frontImage}', '${name}', '${typeNames}', '${id}', '${hp}', '${attack}', '${defense}', '${specialAttack}', '${specialDefense}', '${speed}')">
        <img src="${frontImage}" class="profile-img">
        <div class="pokemonname">${name}</div>
        <p>${typeNames}</p>
        <p class="id-size">#00${id}</p>
        </div>
        <div id="pokemonstats" class="d-none">
            <p>HP: ${hp}</p>
            <p>Attack: ${attack}</p>
            <p>Defense: ${defense}</p>
            <p>Special Attack: ${specialAttack}</p>
            <p>Special Defense: ${specialDefense}</p>
            <p>Speed: ${speed}</p>
        </div>
    </div>
    `;
}

function loadBigPokeCardHTML(cardindex, firstTypeName, frontImage, name, typeNames, id, hp, attack, defense, specialAttack, specialDefense, speed) {          
    return /*html*/ `
    <div id="big${cardindex}" class="pokemoncard-style bg_${firstTypeName}">
        <div id="close-img-wrapper">
        <img src="./assets/img/close.png" id="close-img" onclick="closeBigImage()">
        </div>     
        <img src="${frontImage}" class="profile-img">
            <div class="pokemonname">${name}</div>
            <div id="arrowwrapper">
            <img id="arrowleft" src="./assets/img/arrowleft.png" onclick="previousPokemon(${cardindex})" class="arrows">
                <p>${typeNames}</p>
                <img id="arrowright" src="./assets/img/arrowright.png" onclick="nextPokemon(${cardindex})" class="arrows">
            </div>
                    <p class="id-size">#00${id}</p>
                        <div id="pokemonstats">
                            <p>HP: ${hp}</p>
                            <p>Attack: ${attack}</p>
                            <p>Defense: ${defense}</p>
                            <p>Special Attack: ${specialAttack}</p>
                            <p>Special Defense: ${specialDefense}</p>
                            <p>Speed: ${speed}</p>
                        </div>
    </div>                           
        `;

}