


export default function ItemList({ items, onDelete, onPut}: any) {
    return (
        <ul>
            {items.map((i: any) => (
                <li key={i.id}>
                    {i.name}
                    <button onClick={() => onDelete(i.id)}>X</button>
                    <button onClick={() => {
                    const Newname = prompt("Enter new text:", i.name);
                    if (Newname) onPut(i.id, Newname);
    }}>Modify</button>
                </li>
            ))}
        </ul>
    );
}