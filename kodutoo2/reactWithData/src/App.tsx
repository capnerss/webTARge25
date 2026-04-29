import { useState } from 'react'
import './App.css'
import * as api from "./api/itemsApi";
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

export default function App() {
  const [items, setItems] = useState<any[]>([])

  const load = async () => {
    const res = await api.fetchItems();
    setItems(res.data);
  }

  return (
    <div>
      <h1>My Data App</h1>
      <ItemForm onAdd={async (name: string) => { await api.createItem(name); load(); }}/>
      <ItemList items={items} onDelete={async (id: number) => { await api.deleteItem(id); load(); }}/>
    </div>
  );
}


