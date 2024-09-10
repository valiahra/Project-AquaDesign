function checkManager(req, res, next) {
      if (res.locals.user?.isManager) {
        next();
      } else {
        res.status(400).send(`
            <h1>Нет прав доступа</h1>
            <a href='/'>На главную</a>
          `);
      }
    }
    
    module.exports = { checkManager };