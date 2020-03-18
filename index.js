'use strict';

const apiKey = 'bQ5ZRKSqeoIRnyMfv7guFvY5yLcpkJsfzbPcrAH3';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&').replace(/\s+/g, '').replace(",", "%2C");
  }


  function displayResults(responseJson) {
    // if there are previous results, remove them
    $('#results-list').empty();
    // iterate through the data array
    for (let i = 0; i < responseJson.data.length; i++){
      
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].name}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
        </li>`
      )};
      
    //display the results section  
    $('#results').removeClass('hidden');
  };


function getNatlParks(query, limit=10) {
    const params = {
      key: apiKey,
      stateCode: query,
      limit,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
  
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-state').val();
      const maxResults = $('#js-max-results').val();
      getNatlParks(searchTerm, maxResults);
    });
  }
  
  $(watchForm);