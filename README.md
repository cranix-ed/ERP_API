B1:
Config lại `DB_HOST` theo server name của SQL Server đang dùng, `DB_PASS` mật khẩu tài khoản `sa` __trong file `.env`__

``` bash
DB_HOST=DESKTOP-G15R77V
DB_PASS=56tfg7hj8
```

Run api trong directory `/api/src`
``` javascript
node app.js
```