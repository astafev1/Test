# Тестирование DSPRX в Visual Studio 2022 (Windows)

Эти шаги позволяют запускать и отлаживать DSPRX прямо из **Visual Studio** (не VS Code) в режиме *Open Folder*.

## Предварительно
1. Установите **Visual Studio 2022** c нагрузкой **Node.js development** через Visual Studio Installer.
2. Поставьте **Node.js ≥ 18** и **pnpm**:
   ```powershell
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

## Открытие проекта
1. В Visual Studio: **File → Open → Folder...** и выберите корень репо `DSPRX`.
2. Visual Studio распознает файл `launch.vs.json` и добавит готовые конфигурации запуска.

## Установка зависимостей
Откройте **Terminal** внутри Visual Studio: **View → Terminal** и выполните:
```powershell
pnpm i
```

## Сценарии запуска (через Debug ▼)
Откройте список конфигураций (вверху тулбара Debug) и выберите нужную:

- **DSPRX: Build renderer** — собрать renderer (Vite) и main/preload (TypeScript).
- **DSPRX: Start Electron (after build)** — запустить окно Electron (ожидает, что сборка уже выполнена).
- **DSPRX: Make installers (electron-builder)** — собрать инсталляторы для Windows (NSIS .exe), а также для macOS/Linux, если выполняется на соответствующих ОС.

> Если у вас пустое меню Debug, проверьте, что файл `launch.vs.json` лежит в корне и проект открыт как *Folder*.

## Импорт/экспорт профилей
В приложении **панель «Профили»**:
- **Импорт**: выберите файл `.dsprx.json` (например, `sample.dsprx.json` из корня).
- **Экспорт**: сохранит выбранный профиль на диск.

## Отладка
- Renderer (React): откройте DevTools в окне Electron (`Ctrl+Shift+I`).
- Main/Preload: логи видны в терминале, откуда запускался Electron.
- Для по-настоящему пошаговой отладки Node-части в Visual Studio используйте **Debug → Attach to Process…** и выберите процесс `electron.exe` (тип кода *JavaScript (Node.js)*).

## Быстрые команды (в терминале Visual Studio)
```powershell
pnpm i
pnpm build
pnpm --filter @dsprx/desktop start
pnpm --filter @dsprx/desktop dist   # сборка установщика (.exe) в apps/desktop/release
```
