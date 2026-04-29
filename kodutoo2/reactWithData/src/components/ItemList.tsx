


export default function ItemList({ items, onDelete}: any) {
    return (
        <ul>
            {items.map((i: any) => (
                <li key={i.id}>
                    {i.name}
                    <button onClick={() => onDelete(i.id)}>X</button>
                </li>
            ))}
        </ul>
    );
}