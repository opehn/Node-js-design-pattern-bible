export function levelSubscribe(db) {
  db.subscribe = (pattern, listener) => {
    db.on("put", (key, val) => {
      const match = Object.keys(pattern).every((k) => pattern[k] === val[k]);
      if (match) {
        listener(key, val);
      }
    });
  };
  return db;
}

const levelSubscribeHandler = {
  get(target, property) {
    if (property === "subscribe") {
      return function subscribe(pattern, listener) {
        target.on("put", (key, val) => {
          const match = Object.keys(pattern).every(
            (k) => pattern[k] === val[k]
          );
          if (match) {
            listener(key, val);
          }
        });
      };
    }
    return target[property];
  },
};

export function levelSubscribeProxy(db) {
  return new Proxy(db, levelSubscribeHandler);
}
