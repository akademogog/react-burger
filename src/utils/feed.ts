export const getDate = (currentFeed, setTimeString) => {
  const orderDate = new Date(currentFeed.createdAt);
  const currentDate = new Date();
  const timeZone = orderDate.getTimezoneOffset()/60;
  const days = Math.round(currentDate.getTime() / (24 * 60 * 60000)) - Math.round(orderDate.getTime() / (24 * 60 * 60000));
  let dateString = '';
  const getTimeString = `${orderDate.getHours()}:${orderDate.getMinutes()} i-GMT ${timeZone}`;
  if (days === 0) {
    dateString = `Сегодня, ${getTimeString}`
  } else if (days === 1) {
    dateString = `Вчера, ${getTimeString}`
  } else {
    dateString = `${days} дня назад, ${getTimeString}`
  }
  setTimeString(dateString);
}

export const sortIngredients = (currentFeed, ingredients, setSortedIngredients) => {
  const counts = {};
  currentFeed.ingredients.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
  const sorted: any = [];
  for (const key in counts) {
    if (Object.prototype.hasOwnProperty.call(counts, key)) {
      const count: number = counts[key];
      ingredients.map(el => {
        if (el._id === key) {
          const elCount = { ...el, count }
          sorted.push(elCount);
        }
      })
    }
  }
  setSortedIngredients(sorted);    
}

export const getTotalPrice = (sortedIngredients, setTotalPrice) => {
  let price: number = 0;
  sortedIngredients.map((el) => {
    price += el.price * el.count;
  });
  setTotalPrice(price);
}

export const getFeedStatus = (currentFeed, setFeedStatus) => {
  if (currentFeed.status === 'done') {
    setFeedStatus('Выполнен');
  } else if (currentFeed.status === 'created') {
    setFeedStatus('Создан');
  } else if (currentFeed.status === 'pending') {
    setFeedStatus('Готовится');
  }
}