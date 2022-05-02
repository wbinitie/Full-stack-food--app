const change = () => {
  const select = document.getElementById("restaurants");
  const index = select.selectedIndex;
  const table = document.querySelector(".restaurant-table");
  const input = document.querySelector("#quantity");
  const div = document.querySelector("#restaurants-table-id");
  if (div.style.display === "none") {
    div.style.display = "block";
  }
  console.log(table.rows.length);
  while (table.rows.length > 1) table.rows[1].remove();

  //   let cell2 = row.insertCell(1);

  //   cell2.innerHTML = "NEW CELL2";
  fetch(`/restaurant`).then((response) => {
    response.json().then((data) => {
      let restaurant = data.allRestaurants[index - 1];
      console.log(restaurant.menu);

      // cell.innerHTML = "";
      restaurant.menu.forEach((dish) => {
        for (let i = 1; i < restaurant.menu.length; i++) {
          let row = table.insertRow(i);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          cell2.innerHTML = dish.price;
          cell1.innerHTML = dish.dish;
          cell3.innerHTML = "<input></input>";
        }
      });
    });
  });
  //
};
