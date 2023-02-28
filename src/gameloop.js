import UI from "./dom"

export default class Gameloop {
    static init() {
        UI.drawGameboards();
        UI.eventListeners();
    }
}