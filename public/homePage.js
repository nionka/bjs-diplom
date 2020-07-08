const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout( response => {
    if (response.success) {
        location.reload();
    }
})

ApiConnector.current(response => {
    console.log(response)
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
})

const ratesBoard = new RatesBoard();

function showExchangeRate() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}

showExchangeRate();

setInterval(showExchangeRate, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс пополнен");
        } else {   
            moneyManager.setMessage(response.success, response.data);
        }
    })
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация успешно завершена");
        } else {   
            moneyManager.setMessage(response.success, response.data);
        }
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод успешно завершен");
        } else {   
            moneyManager.setMessage(response.success, response.data);
        }
    })
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь добавлен")
        } else {
            favoritesWidget.setMessage(response.success, response.data);
        }
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удален")
        } else {
            favoritesWidget.setMessage(response.success, response.data);
        }
    })
}