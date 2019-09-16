//global
let currEditId = 0;

function setEditIndex(id) {
  return currEditId = id;
}

const displayStars = function (rating) {
  let div = `<div class="stars">`;

  for (let i = 0; i < rating; i++) {
    div += `<i class="fas fa-star"></i>`
  }
  div += `</div>`

  return div;
}

const loadFavorites = async function () {
  const resp = await fetch('/items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const favs = await resp.json();

  let htmlCard = "";

  for (let i = 0; i < 3; i++) {
    if (favs[i]) {
      let stars = displayStars(favs[i].rating);
      htmlCard += `<div class="card"> 
                       <div class="card-body">
                        <h5 class="card-title">${favs[i].name}</h5>
                        <p class="card-text"><medium class="text-muted">${favs[i].category}</medium></p>
                        <p class="card-text">Price: $${favs[i].usd} | €${favs[i].eur}</p>
                        <a class="btn btn-secondary stretched-link" href="${favs[i].link} target="_blank">Buy</a> 
                    </div>
                    <div class="card-footer bg-transparent">${stars}</div>
                  </div>`;
    }
  }

  document.getElementById("favorites").innerHTML = htmlCard;
};

const loadAllResults = async function () {
  const resp = await fetch('/items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const favs = await resp.json();

  let htmlTable = `<thead class="thead-dark">
                        <tr>
                          <th scope="col">Item</th>
                          <th scope="col">Category</th>
                          <th scope="col">USD</th>
                          <th scope="col">EURO</th>
                          <th colspan="3">Rating</th>
                        </tr>
                      </thead>
                      <tbody>
      `;

  for (let i = 0; i < favs.length; i++) {
    let stars = displayStars(favs[i].rating);
    htmlTable += `<tr>
                        <td><a class="link" href="${favs[i].link} target="_blank">${favs[i].name}</a> </td>
                        <td>${favs[i].category}</td>
                        <td>$${favs[i].usd}</td>
                        <td>€${favs[i].eur}</td>
                        <td>${stars}</td>
                        <td> <button id="editBtn${i}" type="button" class="btn btn-light" data-toggle="modal" data-target="#editItem" onclick="setEditIndex('${favs[i].id}')"> <i class="fas fa-edit"></i></button>
                        <td> <button id="deleteBtn${i}" type="button" class="btn btn-light" onclick="deleteItem('${favs[i].id}')"> <i class="fas fa-trash"></i></button>
                      </tr>
        `;
  }

  htmlTable += `</tbody>`

  document.getElementById("table").innerHTML = htmlTable;
};

const refresh = function () {
  loadFavorites();
  loadAllResults();
}

const newItem = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()
  const inName = document.querySelector('#name'),
    inCategory = document.querySelector('#category'),
    inRating = document.querySelector('#rating'),
    inPrice = document.querySelector('#price'),
    inLink = document.querySelector('#link'),
    json = {
      name: inName.value,
      category: inCategory.value,
      rating: inRating.value,
      usd: inPrice.value,
      link: inLink.value
    },
    body = JSON.stringify(json)
  fetch('/', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      refresh()
      console.log(response)
    })
  return false
}

const deleteItem = function (id) {
  const idJson = {
    id: id
  };
  const body = JSON.stringify(idJson);
  fetch('/', {
      method: 'DELETE',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      refresh()
      console.log(response)
    })
  return false
}

const editItem = function (e) {
  e.preventDefault();

  const inName = document.querySelector('#editName'),
    inCategory = document.querySelector('#editCategory'),
    inRating = document.querySelector('#editRating'),
    inPrice = document.querySelector('#editPrice'),
    inLink = document.querySelector('#editLink'),
    json = {
      id: currEditId,
      name: inName.value,
      category: inCategory.value,
      rating: inRating.value,
      usd: inPrice.value,
      link: inLink.value,
    },
    body = JSON.stringify(json)

  fetch('/', {
      method: 'PUT',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      refresh()
      console.log(response)
    })
  return false
}

window.onload = function () {
  refresh()

  const button = document.getElementById('newBtn')
  button.onclick = newItem

  const editButton = document.getElementById('editBtn')
  editButton.onclick = editItem

  const signIn = document.getElementById('signButton')
  signIn.onclick = fetch('/index', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}