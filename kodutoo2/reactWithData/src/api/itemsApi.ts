import axios from "axios";
// Mis asi on axios?
//lihtsustab HTTP päringuid, pakub paremat süntaksit
//veakäsitlus on olemas

const API = "http://localhost:5000/api/items";

export const fetchItems = () => axios.get(API);
export const createItem = (name: string) => axios.post(API, { name });
export const deleteItem = (id: number) => axios.delete(`${API}/${id}`);
export const modifyItem = (id: number, name: string) => axios.put(`${API}/${id}`, {name});




