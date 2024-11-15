const isTauri = '__TAURI_INTERNALS__' in window;
export default isTauri; // running on a desktop app or a mobile app - but not in the browser
