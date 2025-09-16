# CI/CD для DSPRX: GitHub Actions

Этот пайплайн собирает DSPRX под **Windows/macOS/Linux** и публикует артефакты в GitHub Release при пуше тега `v*`.

## 1. Подготовка репозитория
1. Загрузите исходники DSPRX в GitHub.
2. Добавьте секреты (Settings → Secrets and variables → Actions):
   - **(Windows-подпись)** `WIN_CSC_LINK` — ссылка/строка на .pfx (можно Base64-строку, предварительно закодировав файл).
   - **(Windows-подпись)** `WIN_CSC_KEY_PASSWORD` — пароль к .pfx.
   - **(macOS-подпись)** `MAC_CSC_LINK` — .p12/.pem для подписи (или Apple Dev ID Certificate).
   - **(macOS-подпись)** `MAC_CSC_KEY_PASSWORD` — пароль к ключу.
   - **(macOS notarization)** `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `ASC_PROVIDER` (если требуется).

> Если секретов нет — сборки всё равно создадутся, но не будут подписаны/нотарифицированы.

## 2. Встроенные бинарники (Windows)
Положите **официальные** бинарники в `apps/desktop/bin/win64/` до сборки:
```
wireguard.exe
openvpn.exe
# при необходимости драйвер: tap-windows.exe / ovpn-dco-win installer
```
`electron-builder` упакует их в ресурсы приложения (extraResources). Запуск DSPRX от Администратора обязателен для туннелей и Kill‑Switch.

## 3. Запуск релиза
Создайте тег и отправьте в GitHub:
```bash
git tag v0.1.0
git push origin v0.1.0
```
Actions соберёт артефакты для Win/macOS/Linux и создаст релиз.

## 4. Подписание (опционально)
### Windows
- Получите код‑подписывающий сертификат (OV/EV) от CA (DigiCert/GlobalSign/SSL.com).
- Экспортируйте .pfx и зашифруйте/закодируйте в Base64.
- Сохраните в `WIN_CSC_LINK` (либо upload и используйте URL), пароль — `WIN_CSC_KEY_PASSWORD`.
- electron-builder автоматически подпишет .exe/NSIS при наличии секретов.

### macOS
- Импортируйте сертификаты Dev ID в .p12/.pem → секреты `MAC_CSC_LINK`, `MAC_CSC_KEY_PASSWORD`.
- Создайте App Specific Password для Apple ID → `APPLE_APP_SPECIFIC_PASSWORD`.
- Укажите `APPLE_ID` (email) и при необходимости `ASC_PROVIDER`.
- Включите закомментированные env в workflow.

## 5. Проверка
- В разделе **Actions** смотрите прогресс.
- Готовые файлы ищите в созданном **Release** (страница релизов репозитория).

## 6. Полезно знать
- Для macOS notarization требуется сборка на macOS‑раннере.
- Для Windows‑подписи лучше использовать защищённое хранение (HSM/USB‑токен/Key Vault) — подключается через self-hosted runner.
- Обновление версий: меняйте `version` в `apps/desktop/package.json` и создавайте новый тег `vX.Y.Z`.
