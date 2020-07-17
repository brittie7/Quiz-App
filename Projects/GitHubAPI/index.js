
'use strict'

const searchURL = 'https://api.github.com/users/'


function getHandle (query){
  console.log('getHandle ran');
  const endPointStr = '/repos';
  console.log(searchURL.concat(query,endPointStr));

  const url = searchURL.concat(query,endPointStr);
  
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson)
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    }));
}

function displayResults(responseJson){
  console.log(responseJson);
  $('#results-list').empty();

  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
}



function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      console.log('WatchForm Ran')
      const searchTerm = $('#js-search-term').val();
      getHandle(searchTerm);
    });
  }
  
  $(watchForm);

  // https://api.github.com/users/brittie7/repos
  // just building something that adds