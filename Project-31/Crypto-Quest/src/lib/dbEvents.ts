export const DB_UPDATED_EVENT = "db-updated";

export function notifyDBUpdate(){
    window.dispatchEvent(new Event(DB_UPDATED_EVENT))
}