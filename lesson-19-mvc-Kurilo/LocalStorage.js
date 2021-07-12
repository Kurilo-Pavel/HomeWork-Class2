function TLocalStorage(StorageKey) {
  var self = this;
  var pHash = {};

  self.Reset = function() {
    pHash = {};
    var hashStorage = getItem(key);
    if (hashFromStorage) {
      pHash = JSON.parse(hashStorage);
    }
    return pHash;
  };

  self.addValue = function(key, value) {
    pHash[key] = value;
    var hashStorage = localStorage.getItem(StorageKey); // Получаем из LS сохранённые ранее данные
    if (hashStorage !== null) { // Если в LS что-то есть,
      localStorage.removeItem(key); // то удаляем значение с указанным ключом
      localStorage.setItem(key, JSON.stringify(pHash[key])); // и сохраняем новое значение с этим ключом в формате JSONconsole.log(pHash)
    } else {
      localStorage.setItem(key, JSON.stringify(pHash[key])); // Если в LS ничего нет, просто сохраняем новое значение с указанным ключом в формате JSON
    }
  };

  self.getValue = function(key) { // Получаем из хранилища данные с указанным ключом
    return pHash[key];
  };

  self.deleteValue = function(key) {
    var hashStorage = localStorage.getItem(key);
    if (pHash[key] !== undefined) { // Если значение с запрошенным ключом есть в хранилище, удаляем его
      delete pHash[key];
      if (hashStorage !== null) { // Если значение с запрошенным ключом есть в LS, удаляем его
        localStorage.removeItem(key);
      }
      return true;
    } else {
      return false;
    }
  };

  self.getKeys = function() { // Получаем данные из хранилища
    return Object.keys(pHash);
  };
}