const breeds = ['labrador', 'poodle', 'husky', 'beagle', 'bulldog'];

function getWikipediaTitle(breed) {
    const titleMapping = {
        'labrador': 'Labrador_Retriever',
        'poodle': 'Poodle',
        'husky': 'Husky',
        'beagle': 'Beagle',
        'bulldog': 'Bulldog'
    };
    return titleMapping[breed] || breed;
}

function getDogApiBreed(breed) {
    const breedMapping = {
        'labrador': 'retriever',
        'poodle': 'poodle',
        'husky': 'husky',
        'beagle': 'beagle',
        'bulldog': 'bulldog/english'
    };
    return breedMapping[breed] || breed;
}

function createWikiItem(breed) {
    const wikiItem = document.createElement('div');
    wikiItem.className = 'wiki-item';

    const wikiHeader = document.createElement('h1');
    wikiHeader.className = 'wiki-header';
    wikiHeader.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);

    const wikiContent = document.createElement('div');
    wikiContent.className = 'wiki-content';

    const wikiText = document.createElement('p');
    wikiText.className = 'wiki-text';
    wikiText.textContent = 'Loading breed information...';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    const wikiImg = document.createElement('img');
    wikiImg.className = 'wiki-img';
    wikiImg.src = '';

    imgContainer.appendChild(wikiImg);
    wikiContent.appendChild(wikiText);
    wikiContent.appendChild(imgContainer);
    wikiItem.appendChild(wikiHeader);
    wikiItem.appendChild(wikiContent);

    // Fetch dog image using correct breed format
    const dogApiBreed = getDogApiBreed(breed);
    fetch(`https://dog.ceo/api/breed/${dogApiBreed}/images/random`)
        .then(response => response.json())
        .then(data => {
            wikiImg.src = data.message;
        })
        .catch(error => {
            console.error('Error fetching dog image:', error);
        });

    // Fetch Wikipedia text
    const wikiTitle = getWikipediaTitle(breed);
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`)
        .then(response => response.json())
        .then(data => {
            wikiText.textContent = data.extract || `Information about ${breed} dogs.`;
        })
        .catch(error => {
            console.error('Error fetching Wikipedia text:', error);
            wikiText.textContent = `Information about ${breed} dogs.`;
        });

    return wikiItem;
}

function init() {
    const container = document.getElementById('container');
    breeds.forEach(breed => {
        const wikiItem = createWikiItem(breed);
        container.appendChild(wikiItem);
    });
}

// Start the application
init();