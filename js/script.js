const pizzaBd = {
  size: [
    { name: 'small', price: 40 },
    { name: 'mid', price: 55 },
    { name: 'big', price: 70 },
  ],
  topping: [
    { name: 'moc1', price: 35, productName: 'Сир звичайний' },
    { name: 'moc2', price: 35, productName: 'Сир фета' },
    { name: 'moc3', price: 35, productName: 'Моцарелла' },
    { name: 'telya', price: 60, productName: 'Телятина' },
    { name: 'vetch1', price: 45, productName: 'Помiдори' },
    { name: 'vetch2', price: 50, productName: 'Гриби' },
  ],
  sauce: [
    { name: 'sauceClassic', price: 30, productName: 'Кетчуп' },
    { name: 'sauceBBQ', price: 35, productName: 'BBQ' },
    { name: 'sauceRikotta', price: 25, productName: 'Рiкотта' },
  ],
};

const userPizza = {
  size: { name: 'big', price: 70 },
  sauce: '',
  topping: [],
  price: '',
  userPhone: '',
  userEmail: '',
  userName: '',
  data: '',

  showPizza() {
    return this.topping;
  },
  remove(productName) {
    const { topping } = this;

    for (let i = 0; i < topping.length; i++) {
      const toppingEl = topping[i];

      if (productName === toppingEl.name) {
        topping.splice(i, 1);
      }
    }
  },

  addSauce(sauceName) {
    this.sauce = sauceName;
  },
  addTopping(toppingName) {
    for (const toppingEl of this.topping) {
      if (toppingEl.name === toppingName.name) {
        toppingEl.quantity += 1;
        return;
      }
    }

    const newProduct = {
      ...toppingName,
      quantity: 1,
    };
    this.topping.push(newProduct);
  },

  countTotalPriceTopping() {
    const { topping } = this;

    let total = 0;

    for (const { price, quantity } of topping) {
      total += price * quantity;
    }
    return total;
  },

  totalCount() {
    const { size, sauce } = this;

    let total = 0;
    total += size.price;
    return total;
  },
};

const refs = {
  formSizePizza: document.querySelector('#pizza'),
  inputsSizePizza: document.querySelectorAll('#pizza input'),
  ingridientsPizza: document.querySelector('.ingridients'),
  spanPrice: document.querySelector('#price'),
  addedSauces: document.querySelector('#sauce'),
  addedTopping: document.querySelector('#topping'),

  pizzaCrust: document.querySelector('.table'),
  formBooking: document.querySelector('#info'),
  formBookingInputs: document.querySelectorAll('#info input'),

  banner: document.querySelector('#banner'),
};

const {
  formSizePizza,
  inputsSizePizza,
  ingridientsPizza,
  addedSauces,
  addedTopping,
  spanPrice,
  pizzaCrust,
  formBooking,
  formBookingInputs,
  banner,
} = refs;

show(userPizza);

//?================== size-pz ==================

formSizePizza.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'INPUT' && ev.target.checked) {
    userPizza.size = pizzaBd.size.find((el) => el.name === ev.target.id);
  }
  show(userPizza);
});

//?================== click-choose ==================
/*
//ingridientsPizza.addEventListener('click', (ev) => {
//  switch (ev.target.id) {
//    case 'sauceClassic':
//      userPizza.sauce = pizzaBd.sauce.find((el) => el.name == ev.target.id);
//      break;
//    case 'sauceBBQ':
//      userPizza.sauce = pizzaBd.sauce.find((el) => el.name == ev.target.id);
//      break;
//    case 'sauceRikotta':
//      userPizza.sauce = pizzaBd.sauce.find((el) => el.name == ev.target.id);
//      break;
//    case 'moc1':
//      userPizza.topping.push(
//        pizzaBd.topping.find((el) => el.name == ev.target.id)
//      );
//      break;
//    case 'moc2':
//      userPizza.topping.push(
//        pizzaBd.topping.find((el) => el.name == ev.target.id)
//      );
//      break;
//    case 'moc3':
//      userPizza.topping.push(
//        pizzaBd.topping.find((el) => el.name == ev.target.id)
//      );
//      break;
//    case 'telya':
//      userPizza.topping.push(
//        pizzaBd.topping.find((el) => el.name == ev.target.id)
//      );
//      break;
//    case 'vetch1':
//      userPizza.topping.push(
//        pizzaBd.topping.find((el) => el.name == ev.target.id)
//      );
//      break;
//    case 'vetch2':
//      userPizza.topping.push(
//        pizzaBd.topping.find((el) => el.name == ev.target.id)
//      );
//      break;
//  }

//  if (ev.target.tagName === 'IMG') {
//    if (document.querySelector('#ingridients')) {
//      document.querySelector('#ingridients').remove();
//    }
//    pizzaCrust.insertAdjacentHTML(
//      'beforeend',
//      `<img id='ingridients' src='${ev.target.src}' >`
//    );
//  }
//  show(userPizza);
//});
*/

//?================== drag&drop ==================
//?================== start ==================
ingridientsPizza.addEventListener(
  'dragstart',
  function (e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('Text', e.target.src);
    e.dataTransfer.setData('idText', e.target.id);
  },
  false
);
//?================== over ==================
pizzaCrust.addEventListener(
  'dragover',
  function (e) {
    if (e.preventDefault) e.preventDefault();
    return false;
  },
  false
);
//?================== drop ==================
pizzaCrust.addEventListener(
  'drop',
  (evt) => {
    let src = evt.dataTransfer.getData('Text');
    let idIngridients = evt.dataTransfer.getData('idText');
    if (
      idIngridients === 'sauceClassic' ||
      idIngridients === 'sauceRikotta' ||
      idIngridients === 'sauceBBQ'
    ) {
      if (document.querySelector('.sauceNew')) {
        document.querySelector('.sauceNew').remove();
      }
      const img = document.createElement('img');
      img.classList.add('sauceNew');
      img.src = src;
      document.querySelector('.table').appendChild(img);
    } else {
      const img = document.createElement('img');
      img.classList.add(`${idIngridients}`);
      img.src = src;
      document.querySelector('.table').appendChild(img);
    }

    switch (idIngridients) {
      case 'sauceClassic':
        if (true) {
          console.log('yaha222');
        }
        userPizza.sauce = pizzaBd.sauce.find((el) => el.name == idIngridients);
        break;
      case 'sauceBBQ':
        userPizza.sauce = pizzaBd.sauce.find((el) => el.name == idIngridients);
        break;
      case 'sauceRikotta':
        userPizza.sauce = pizzaBd.sauce.find((el) => el.name == idIngridients);
        break;
      case 'moc1':
        userPizza.addTopping(
          pizzaBd.topping.find((el) => el.name == idIngridients)
        );
        break;
      case 'moc2':
        userPizza.addTopping(
          pizzaBd.topping.find((el) => el.name == idIngridients)
        );

        break;
      case 'moc3':
        userPizza.addTopping(
          pizzaBd.topping.find((el) => el.name == idIngridients)
        );

        break;
      case 'telya':
        userPizza.addTopping(
          pizzaBd.topping.find((el) => el.name == idIngridients)
        );

        break;
      case 'vetch1':
        userPizza.addTopping(
          pizzaBd.topping.find((el) => el.name == idIngridients)
        );

        break;
      case 'vetch2':
        userPizza.addTopping(
          pizzaBd.topping.find((el) => el.name == idIngridients)
        );
        break;
    }

    show(userPizza);

    return false;
  },
  false
);

//?================== validate-form ==================
formBookingInputs.forEach((input) => {
  if (
    input.name === 'name' ||
    input.name === 'phone' ||
    input.name === 'email'
  ) {
    input.addEventListener('change', () => {
      if (input.name === 'name' && /^[A-Я-іїєґ]{2,}$/i.test(input.value)) {
        input.className = '';
        input.classList.add('success');
        userPizza.userName = input.value;
      } else if (input.name === 'phone' && /^\+380\d{9}$/.test(input.value)) {
        input.className = '';
        input.classList.add('success');
        userPizza.userPhone = input.value;
      } else if (
        input.name === 'email' &&
        /^[a-z0-9_.]{3,}@[a-z0-9._]{2,}\.[a-z].{2,9}$/i.test(input.value)
      ) {
        input.className = '';
        input.classList.add('success');
        userPizza.userEmail = input.value;
      } else {
        input.classList.add('error');
      }
    });
  } else {
    input.addEventListener('click', () => {
      if (input.type === 'reset') {
        formBookingInputs.forEach((input) => {
          if (
            input.name === 'name' ||
            input.name === 'phone' ||
            input.name === 'email'
          ) {
            input.className = '';
          }
        });

        formBooking.reset();
      }
    });
  }
});

//?================== banner-move ==================
banner.addEventListener('mouseenter', (e) => {
  banner.style.transition = 'all .5s ease-in-out';
  banner.style.right = `${Math.round(Math.random() * 95)}%`;
  banner.style.bottom = `${Math.round(Math.random() * 95)}%	`;
});

function show(pizza) {
  let totalPrice = 0;
  if (pizza.size !== '') {
    totalPrice += +pizza.size.price;
  }
  if (pizza.sauce !== '') {
    totalPrice += +pizza.sauce.price;
    addedSauces.innerHTML = `<span class='topping'>${pizza.sauce.productName}</span>`;
  }

  if (pizza.topping.length) {
    totalPrice += pizza.topping.reduce(
      (acc, el) => acc + el.price * el.quantity,
      0
    );

    addedTopping.innerHTML = pizza.topping
      .map(
        (el) =>
          `<span  class='topping ${el.name}'>${el.productName}<span id='${el.name}' class="countNumber">${el.quantity}</span>
			   <button class="delete-btn" data-id="${el.name}" type="button">❌</button></span>`
      )
      .join(' ');
  }

  spanPrice.innerText = `${totalPrice} грн`;
  pizza.price = totalPrice;

  //?================== delete-btn ==================
  deleteIngridients();
}

function deleteIngridients() {
  const delBtn = document.querySelectorAll('.delete-btn');
  if (delBtn) {
    delBtn.forEach((el) => {
      el.addEventListener('click', (e) => {
        const eTargetId = e.target.dataset.id;
        for (let i = 0; i < userPizza.topping.length; i++) {
          if (eTargetId === userPizza.topping[i].name) {
            userPizza.topping[i].quantity -= 1;

            if (document.querySelector(`.${eTargetId}`)) {
              document.querySelector(`.${eTargetId}`).remove();
            }
            show(userPizza);

            if (userPizza.topping[i].quantity === 0) {
              userPizza.remove(eTargetId);
              document.querySelector(`span.${eTargetId}`).remove();
              document
                .querySelectorAll(`.${eTargetId}`)
                .forEach((el) => el.remove());
            }
          }
        }
      });
    });
  }
}
