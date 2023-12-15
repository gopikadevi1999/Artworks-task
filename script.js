document.addEventListener('DOMContentLoaded', function () {
    const artworksContainer = document.getElementById('artworksContainer');

    fetchArtworks()
        .then(artworks => displayArtworks(artworks))
        .catch(error => console.error('Error fetching artworks:', error));

    function fetchArtworks() {
        return new Promise((resolve, reject) => {
            fetch('https://api.artic.edu/api/v1/artworks')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => resolve(data.data))
                .catch(error => reject(error));
        });
    }

    function displayArtworks(artworks) {
        artworks.forEach(artwork => {
            const artworkCard = createArtworkCard(artwork);
            artworksContainer.appendChild(artworkCard);
        });
    }

    function createArtworkCard(artwork) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card', 'shadow');

        const image = document.createElement('img');
        image.src = artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg` : 'placeholder-image.jpg';
        image.alt = 'Artwork Image';
        image.classList.add('card-img-top');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = artwork.title;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = artwork.artist_display;

        cardBody.appendChild(image);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);

        return card;
    }
});
