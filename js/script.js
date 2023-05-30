const randomButton = document.getElementById('randomButton');
const animeInfoDiv = document.getElementById('animeInfo');

randomButton.addEventListener('click', getRandomAnime);

function getRandomAnime() {
  fetch('https://api.jikan.moe/v4/anime?genres=22')
    .then(response => response.json())
    .then(data => {
      const totalPages = Math.ceil(data.pagination.last_visible_page);
      const randomPage = Math.floor(Math.random() * totalPages);
	
	  console.log('totalPages: '+ totalPages);
  	  console.log('randomPage: '+ randomPage);
      
	  console.log(`https://api.jikan.moe/v4/anime?genres=22&page=${randomPage}`);
      fetch(`https://api.jikan.moe/v4/anime?genres=22&page=${randomPage}`)
        .then(response2 => response2.json())
        .then(data2 => {
          const animeList = data2.pagination.items.count;
          const randomIndex = Math.floor(Math.random() * animeList);
		  const randomAnime = data2.data[randomIndex];
		  
		  console.log('animeList: '+ animeList);
		  console.log('randomIndex: '+ randomIndex);
		  console.log('randomAnime: '+ randomAnime.url);
  
          displayAnimeInfo(randomAnime);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}




function displayAnimeInfo(anime) {
  const animeInfoDiv = document.getElementById('animeInfo');

  // Função auxiliar para verificar se uma propriedade está vazia
  function isPropertyEmpty(value) {
    return value === undefined || value === null || (Array.isArray(value) && value.length === 0) || value === '';
  }

  const animeInfoData = [
    { label: 'Episodes', value: anime.episodes },
    { label: 'Aired', value: anime.aired.string },
    { label: 'Status', value: anime.status },
    { label: 'Studios', value: anime.studios.length > 0 ? anime.studios[0].name : '' },
    { label: 'Themes', value: anime.themes.map(theme => theme.name).join(', ') },
    { label: 'Genres', value: anime.genres.map(genre => genre.name).join(', ') },
    { label: 'Score', value: anime.score },
    { label: 'Alternative Titles', value: anime.titles.map(title => title.title).join(', ') },
    { label: 'Type', value: anime.type },
    { label: 'Duration', value: anime.duration },
    { label: 'Rating', value: anime.rating },
    { label: 'Licensors', value: anime.licensors.map(licensor => licensor.name).join(', ') },
    { label: 'Producers', value: anime.producers.map(producer => producer.name).join(', ') }
  ];

  const animeInfoHTML = `
    <div class="anime-info">
      <img src="${anime.images.jpg.image_url}" alt="Anime Image">
      <h2><a href="${anime.url}" target="_blank">${anime.titles[0].title}</a></h2>
      <p>${anime.synopsis}</p>
      <ul>
        ${animeInfoData
          .map(info => {
            const value = isPropertyEmpty(info.value) ? '' : info.value;
            return `<li><strong>${info.label}:</strong> ${value}</li>`;
          })
          .join('')}
      </ul>
    </div>
  `;

  animeInfoDiv.innerHTML = animeInfoHTML;
}
